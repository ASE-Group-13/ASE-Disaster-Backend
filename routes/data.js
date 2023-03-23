const router = require("express").Router();
require("dotenv").config();
const mongoose = require("mongoose");
const DisasterData = require("../models/DisasterData");
const ReportData = require("../models/ReportData");
const {predictMessage} = require('../logic/SpamFilter');
const {assignToDisaster, addReportToDisaster} = require('../logic/DisasterAssignment');
const {allocateResources} = require('../logic/ResourceAllocator');

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
      { status: 'active' },
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
  const status = predictMessage(req.body.detail);
  var reportJson = {
    detail: req.body.detail,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    type : req.body.type,
    spam : status,
  };
  if (status === false) {
    const resources = allocateResources(req.body.detail); // This can change to optimiseResources() function
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

module.exports = router;
