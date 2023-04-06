const mongoose = require("mongoose");

const locationDataSchema = new mongoose.Schema({
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  resource: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("LocationData", locationDataSchema);
