const router = require("express").Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();
const mongoose = require("mongoose");
const DisasterData = require("../models/DisasterData");
const ReportData = require("../models/ReportData");
const {predictMessage} = require('../logic/SpamFilter');
const {assignToDisaster, addReportToDisaster} = require('../logic/DisasterAssignment');
const {allocateResources} = require('../logic/ResourceAllocator');
const disasterTypeObj = require('../logic/DisasterInterpretation.js');
const disasterLocationObj = require('../logic/ImpactRadiusInterpretation.js')
const disasterSizeObj = require('../logic/ImpactSizeInterpretation.js')

/* DISASTER ROUTES */

// Add disaster data
router.post("/add-disaster-data", async (req, res) => {
  const newData = new DisasterData({
    title: req.body.title,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    type: req.body.type,
    status: req.body.status
  });
  try {
    const saveData = await newData.save();
    res.status(200).json({ success: true, saveData });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.get("/disaster/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const disasterData = await DisasterData.findById(id);
    if (!disasterData) {
      return res.status(404).json({ success: false, error: "Disaster not found" });
    }
    res.status(200).json({ success: true, disasterData });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

// get all disaster data
router.get("/all-disaster-data", async (req, res) => {
  try {
    const allData = await DisasterData.find().populate("reports");
    return res.json(allData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/relevant-disaster-data", async (req, res) => {
  try {
    const pendingActiveData = await DisasterData.find({status: { $in: ["pending", "active"]}}).populate("reports");
    return res.json(pendingActiveData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/active-disaster-data", async (req, res) => {
  try {
    const pendingActiveData = await DisasterData.find({status: { $in: ["active"]}}).populate("reports");
    return res.json(pendingActiveData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/update-disaster/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const disaster = await DisasterData.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!disaster) {
      return res.status(404).json({ message: "Disaster not found" });
    }
    return res.json(disaster);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.post("/add-report-to-disaster/:id", async (req, res) => {
  const { id } = req.params;
  const reportId = req.body.reportId;
  try {
    const updateDisaster = await DisasterData.findByIdAndUpdate(
      id,
      { $push: { reports: reportId} },
      { new: true }
    ).populate('reports');
    if (!updateDisaster) {
      return res.status(404).json({ success: false, error: "Disaster not found" });
    }
    res.status(200).json({ success: true, updateDisaster });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.put("/activate-disaster/:id", async (req, res) => {
  try {
    // Find the disaster document and update its status field
    const updatedDisaster = await DisasterData.findByIdAndUpdate(
      req.params.id,
      { status: 'active',
        evacuation: req.body.evacuation },
      { new: true }
    );

    // Find all related report documents and update their status fields
    const updatedReports = await ReportData.updateMany(
      { _id: { $in: updatedDisaster.reports } },
      { status: 'active' }
    );

    // Return the updated disaster and reports data
    return res.json({
      updatedDisaster,
      updatedReports
    });
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/resolve-disaster/:id", async (req, res) => {
  try {
    // Find the disaster document and update its status field
    const updatedDisaster = await DisasterData.findByIdAndUpdate(
      req.params.id,
      { status: 'resolved' },
      { new: true }
    );

    // Find all related report documents and update their status fields
    const updatedReports = await ReportData.updateMany(
      { _id: { $in: updatedDisaster.reports } },
      { status: 'resolved' }
    );

    // Return the updated disaster and reports data
    return res.json({
      updatedDisaster,
      updatedReports
    });
  } catch (err) {
    res.json({ message: err });
  }
});

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
    // interpretation 
    disasterLocation = disasterLocationObj.interpretDisasterLocation(reportJson.detail);
    disasterRadius = disasterLocationObj.interpretDisasterRadius(reportJson.type, disasterLocation);
    disasterImpactedPeopleCount = disasterSizeObj.interpretImpactSize(reportJson.detail, disasterLocation);
    // DISASTER TYPE AND DISASTER LOCATION NEED TO BE CONVERTED INTO NUMBERS!
    
    const resources = allocateResources([1,5,disasterRadius,disasterImpactedPeopleCount]); // This can change to optimiseResources() function
    reportJson = Object.assign({}, reportJson, resources);
  }
  const completeJson = await assignToDisaster(reportJson);
  const newReportObject = new ReportData(completeJson);
  await addReportToDisaster(newReportObject.disaster,newReportObject._id)
  try {    
    const saveReportData = await newReportObject.save();
    res.status(200).json({ success: true, saveReportData });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
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

router.get("/get-old-reports", async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const oldReports = await ReportData.find({createdAt: { $lte: twentyFourHoursAgo } });
    return res.json(oldReports);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/update-spam", async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const oldPendingReports = await ReportData.updateMany(
      { status: "pending", createdAt: { $lte: twentyFourHoursAgo } },
      { $set: { spam: true } }
    );
    return res.json({ message: `${oldPendingReports.nModified} report(s) updated` });
  } catch (err) {
    res.status(500).json({ message: "Error updating reports" });
  }
});

router.delete("/delete-old-reports", async (req, res) => {
  // Calculate date 24 hours ago
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  try {
    // Find all reports older than 24 hours
    const oldReports = await ReportData.find({ createdAt: { $lt: twentyFourHoursAgo } });

    // Delete the old reports
    await ReportData.deleteMany({ _id: { $in: oldReports.map(report => report._id) } });

    // Send response with success message
    res.json({ message: 'Old reports deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting old reports' });
  }
});


// SEND RESOURCES API post("/send-resources")...
// we need report messages and then submitted response if we want to do the smart feedback loop for allocation

router.post("/send-resources", async (req, res) => {
  try {
    res.json({ message: 'Received Resource Request' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while receiving resource request' });
  }
});

module.exports = router;
