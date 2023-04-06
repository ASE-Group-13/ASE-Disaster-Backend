const router = require("express").Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();
const DisasterData = require("../models/DisasterData");
const ReportData = require("../models/ReportData");
const {predictMessage} = require('../logic/SpamFilter');
const {assignToDisaster} = require('../logic/DisasterAssignment');
const {allocateResources} = require('../logic/ResourceAllocator');
const disasterLocationObj = require('../logic/ImpactRadiusInterpretation.js')
const disasterSizeObj = require('../logic/ImpactSizeInterpretation.js')
const {getSiteNumber,getTypeNumber} = require("../models/enumData");
const allocationStaticObj = require('../logic/ResourceAllocatorStatic.js')

/* REPORTS ROUTES */

// Add report data
router.post("/add-report-data", async (req, res) => {
    // Get the JWT token from the request header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    let responderMessage;
    let spamStatus;
    if (token) {
      try {
        // Verify the JWT token to ensure that the user is logged in
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        
        // Flag the report as submitted by a responder
        responderMessage = true;
        spamStatus = false;
      } catch (error) {
        // If the token is invalid, log the error and proceed with processing the report data
        console.error(error);
        console.warn('Token invalid');
        spamStatus = predictMessage(req.body.detail); // identify spam messages
        responderMessage = false;
      }
    } else {
      // If no token is present, log a warning message and proceed with processing the report data
      console.warn('No token present in request header');
      spamStatus = predictMessage(req.body.detail); // identify spam 
      responderMessage = false;
    }
    var reportJson = {
      detail: req.body.detail,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      type : req.body.type,
      isSpam : spamStatus,
      isResponder : responderMessage
    };
    if (spamStatus === false) { 
      const disasterLocation = disasterLocationObj.interpretDisasterLocation(reportJson.detail);
      const disasterRadius = disasterLocationObj.interpretDisasterRadius(reportJson.type, disasterLocation);
      const disasterImpactedPeopleCount = disasterSizeObj.interpretImpactSize(reportJson.detail, disasterLocation); 
      const resourcesFromModel = allocateResources([getSiteNumber(disasterLocation), getTypeNumber(reportJson.type), disasterRadius,disasterImpactedPeopleCount]); 
      const resourcesFromStatic = allocationStaticObj.getResourcesStatic(getTypeNumber(reportJson.type), disasterRadius, disasterImpactedPeopleCount)
      console.log("resourcesFromModel:", resourcesFromModel);
      console.log("resourcesFromStatic:", resourcesFromStatic);
      const finalResources = {};
      for (const key in resourcesFromModel) {
        finalResources[key] = Math.min(resourcesFromModel[key], resourcesFromStatic[key]);
      }
      const disasterResources = Object.assign({}, finalResources,{
        site: disasterLocation,
        type: reportJson.type,
        radius: disasterRadius,
        size: disasterImpactedPeopleCount,
      })
      console.log("disasterResources:", finalResources);
      const combinedJson = Object.assign({}, reportJson, disasterResources);
      reportJson = await assignToDisaster(combinedJson);
    }
    console.log(reportJson);
    const newReportObject = new ReportData(reportJson);
    // Adding report to its related disaster.
    const updateDisaster = await DisasterData.findByIdAndUpdate(
      newReportObject.disaster,
      { $push: { reports: newReportObject} },
      { new: true }
    );
    console.log(`Distaster Details:${updateDisaster}`);
    console.log(`Report Details:${newReportObject}`);
    try {    
      const saveReportData = await newReportObject.save();
      res.status(200).json({ success: true, saveReportData });
    } catch (err) {
      res.status(500).json({ success: false, error: err});
    }
  });
  
  router.get("/report/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const report = await Report.findById(id);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      return res.json(report);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });
  
  // get all report data
  router.get("/all-report-data", async (req, res) => {
    try {
      const allReportData = await ReportData.find().populate("disaster");
      return res.json(allReportData);
    } catch (err) {
      res.json({ message: err });
    }
  });
  
  router.put("/update-report/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const report = await ReportData.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      return res.json(report);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  });
  
  module.exports = router;
  