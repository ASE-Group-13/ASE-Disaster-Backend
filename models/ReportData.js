const mongoose = require("mongoose");
const {siteEnum,typeEnum,statusEnum} = require("./enumData");

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
    enum: typeEnum,
    required: true,
  },
  radius: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  site: {
    type: String,
    enum: siteEnum,
    required: false,
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
    enum : statusEnum,
    required: true
  },
  disaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DisasterData",
  },
  ambulance : {
    type: Number,
    required: false,
  },
  police : {
      type: Number,
      required: false,
  },
  fire: {
      type: Number,
      required: false,
  },
  bus: {
      type: Number,
      required: false,
  },
  helicopter: {
      type: Number,
      required: false,
  },
});

module.exports = mongoose.model("ReportData", reportDataSchema);
