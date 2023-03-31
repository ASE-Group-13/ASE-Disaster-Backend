const mongoose = require("mongoose");

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
  evacuation: {
    type: Boolean,
    required: false,
    default: false
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
  radius: {
    type: Number,
    required: false,
  },
  impact: {
    type: Number,
    enum: [
        "Flood",
        "Explosion",
        "Chemical hazard",
        "Terrorist activity",
        "Fire",
        "Tornado",
        "Earthquake",
        "Hurricane",
        "Accident",
        "Traffic accident",
        "Collapse",
        "Wildfire",
        "Exlposion",
    ],
    required: false,
  },
  building: {
    type: String,
    enum: ["Building",
    "Library",
    "Hotel",
    "Stadium",
    "Restaurant",
    "School",
    "Apartment",
    "Park",
    "Mall",
    "Office",
    "Factory",
    "Airport",
    "Hospital",
    "Supermarket",
    "Bank",
    "Highway",
    "Warehouse",
    "Amusement Park",
    "Church",
    "Museum",
    "Shopping Center",
    "Oil rig",
    "Power plant",
    "City street",
    "Bridge",
    "River",
    "Forest",
    "Office Building",
    "High-rise Building"],
    required: false,
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

module.exports = mongoose.model("DisasterData", disasterDataSchema);
