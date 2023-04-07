const router = require("express").Router();
require("dotenv").config();
const OrderData = require("../models/OrderData");
const DisasterData = require("../models/DisasterData");
const ReportData = require("../models/ReportData");
const {allocateResources} = require('../logic/ResourceAllocator');
const {getSiteNumber,getTypeNumber} = require("../models/enumData");

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

router.put("/activate-disaster/:id", async (req, res) => {
  console.log(req.body)
  try {
    // Find the disaster document and update its status field
    console.log(getSiteNumber(req.body.site))
    console.log(getTypeNumber(req.body.type))
    const resources = allocateResources([getSiteNumber(req.body.site),getTypeNumber(req.body.type),req.body.radius,req.body.size]); 
    const updatedDisaster = await DisasterData.findByIdAndUpdate(
      req.params.id,
      { status: 'active',
        type: req.body.type,
        radius: req.body.radius,
        size: req.body.size,
        site: req.body.site,
        evacuation: req.body.evacuation,
        ambulance: resources.ambulance,
        police : resources.police,
        fire: resources.fire,
        bus: resources.bus,
        helicopter: resources.helicopter,
      }, { new: true }
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
    res.json({ success: false, error: err });
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
    console.log(`Disaster: ${updatedDisaster}`);
    // Find all related report documents and update their status fields
    const updatedReports = await ReportData.updateMany(
      { _id: { $in: updatedDisaster.reports } },
      { status: 'resolved' }
    );
    console.log(`Reports: ${updatedReports}`);
    const orders = await OrderData.updateMany({
        disaster: { $in: [req.params.id]},
        status: 'active'
      },
      {status: 'resolved' }
    );
    console.log(`Order: ${orders}`);
    console.log(`Order: ${orders[0]}`);
    console.log(`Order: ${orders[1]}`);
    resetCapacity(orders)
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.errors(error);
      });
    return res.json({
      message: "Resolved Disaster."
    });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

router.post("/add-report-to-disaster/:id", async (req, res) => {
  const disasterId = req.params.id;
  const reportId = req.body.reportId;
  try {
    const updatedDisaster = await DisasterData.findByIdAndUpdate(
      disasterId,
      { $push: { reports: reportId} },
      { new: true }
    );
    if (!updatedDisaster) {
      return res.status(404).json({ success: false, error: "Disaster not found" });
    }
    const updatedReport = await ReportData.findByIdAndUpdate(
      reportId,
      { $push: { reports: disasterId} },
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ success: false, error: "Report not found" });
    }
    res.status(200).json({ success: true, data : { updatedDisaster : updatedDisaster, updatedReport : updatedReport } });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

module.exports = router;