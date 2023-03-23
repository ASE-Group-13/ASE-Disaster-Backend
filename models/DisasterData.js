const mongoose = require("mongoose");
const {severityData,resourcesData} = require("./AssessmentData");

const disasterDataSchema = new mongoose.Schema({
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'resolved'], 
    required: true,
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReportData",
  }],
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

module.exports = mongoose.model("DisasterData", disasterDataSchema);
