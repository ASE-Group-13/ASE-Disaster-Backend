const mongoose = require("mongoose");
const {severityData,resourcesData} = require("./AssessmentData");

const reportDataSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  isSpam: {
    type: Boolean,
    required: true,
  },
  isResponder: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    default: "pending",
    enum : ['pending', 'active', 'resolved'],
    required: true
  },
  disaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DisasterData",
  },
  Ambulance : {
    type: Number,
    required: false,
  },
  Police : {
      type: Number,
      required: false,
  },
  FireTruck: {
      type: Number,
      required: false,
  },
  Buses: {
      type: Number,
      required: false,
  },
  Helicopter: {
      type: Number,
      required: false,
  },
});

module.exports = mongoose.model("ReportData", reportDataSchema);
