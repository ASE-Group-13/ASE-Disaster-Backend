const router = require("express").Router();
require("dotenv").config();
const OrderData = require("../models/OrderData");
const DisasterData = require("../models/DisasterData");
const ReportData = require("../models/ReportData");
const {
  allocateResources
} = require('../logic/ResourceAllocator');
const {
  getSiteNumber,
  getTypeNumber
} = require("../models/enumData");

// Add disaster data
router.post("/add-disaster-data", async (req, res) => {
  try {
    const newData = new DisasterData({
      disasterName: req.body.title,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      type: req.body.type,
      status: req.body.status
    });
    const saveData = await newData.save();
    res.status(200).json({
      success: true,
      saveData
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  }
});

// Retrieve disaster by id
router.get("/disaster/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const disasterData = await DisasterData.findById(id).populate("reports");
    if (!disasterData) {
      return res.status(404).json({
        success: false,
        error: "Disaster not found"
      });
    }
    res.status(200).json({
      success: true,
      disasterData
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  }
});

// Retrieve all disaster data
router.get("/all-disaster-data", async (req, res) => {
  try {
    const allData = await DisasterData.find().populate("reports");
    return res.json(allData);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//Retrieve pending disasters
router.get("/pending-disaster-data", async (req, res) => {
  try {
    const pendingActiveData = await DisasterData.find({
      status: {
        $in: ["pending"]
      }
    }).populate("reports");
    return res.json(pendingActiveData);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//Retrieve relevant disasters
router.get("/relevant-disaster-data", async (req, res) => {
  try {
    const pendingActiveData = await DisasterData.find({
      status: {
        $in: ["pending", "active"]
      }
    }).populate("reports");
    return res.json(pendingActiveData);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

//Retrieve active disasters
router.get("/active-disaster-data", async (req, res) => {
  try {
    const pendingActiveData = await DisasterData.find({
      status: {
        $in: ["active"]
      }
    }).populate("reports");
    return res.json(pendingActiveData);
  } catch (err) {
    res.json({
      message: err
    });
  }
});

// Update disaster by id
router.put("/update-disaster/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const disaster = await DisasterData.findByIdAndUpdate(
      id, {
      $set: req.body
    }, {
      new: true
    });
    console.log("UPDATED DISASTER");
    if (!disaster) {
      return res.status(404).json({
        message: "Disaster not found"
      });
    }
    return res.json(disaster);
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(500).json({
      message: err
    });
  }
});

// Active disaster by id
router.put("/activate-disaster/:id", async (req, res) => {
  try {
    const resources = allocateResources([getSiteNumber((req.body.site).toLowerCase()), getTypeNumber((req.body.type).toLowerCase()), parseInt(req.body.radius), parseInt(req.body.size)]);
    const updatedDisaster = await DisasterData.findByIdAndUpdate(
      req.params.id, {
      status: 'active',
      disasterName: req.body.disasterName,
      disasterDescription: req.body.disasterDescription,
      type: (req.body.type).toLowerCase(),
      radius: parseInt(req.body.radius),
      size: parseInt(req.body.size),
      site: (req.body.site).toLowerCase(),
      evacuation: req.body.evacuation,
      ambulance: resources.Ambulance,
      police: resources.Police,
      fire: resources.FireTruck,
      bus: resources.Bus,
      helicopter: resources.Helicopter,
    }, {
      new: true
    });
    // Find all related report documents and update their status fields
    const updatedReports = await ReportData.updateMany({
      _id: {
        $in: updatedDisaster.reports
      }
    }, {
      status: 'active'
    });
    // Return the updated disaster and reports data
    return res.json({
      updatedDisaster,
      updatedReports
    });
  } catch (err) {
    res.json({
      success: false,
      error: err
    });
  }
});

// Resolve disaster by id
router.put("/resolve-disaster/:id", async (req, res) => {
  try {
    // Find the disaster document and update its status field
    const updatedDisaster = await DisasterData.findByIdAndUpdate(
      req.params.id, {
      status: 'resolved'
    }, {
      new: true
    });
    console.log(`Disaster: ${updatedDisaster}`);
    // Find all related report documents and update their status fields
    const updatedReports = await ReportData.updateMany({
      _id: {
        $in: updatedDisaster.reports
      }
    }, {
      status: 'resolved'
    });
    console.log(`Reports: ${updatedReports}`);
    const orders = await OrderData.updateMany({
      disaster: {
        $in: [req.params.id]
      },
      status: 'active'
    }, {
      status: 'resolved'
    });
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
    res.json({
      success: false,
      error: err
    });
  }
});

// Add report to disaster by id
router.post("/add-report-to-disaster/:id", async (req, res) => {
  try {
    const disasterId = req.params.id;
    const reportId = req.body.reportId;
    const updatedDisaster = await DisasterData.findByIdAndUpdate(
      disasterId, {
      $push: {
        reports: reportId
      }
    }, {
      new: true
    });
    if (!updatedDisaster) {
      return res.status(404).json({
        success: false,
        error: "Disaster not found"
      });
    }
    const updatedReport = await ReportData.findByIdAndUpdate(
      reportId, {
      $set: {
        disaster: disasterId
      }
    }, {
      new: true
    });
    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        error: "Report not found"
      });
    }
    res.status(200).json({
      success: true
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err
    });
  }
});

module.exports = router;