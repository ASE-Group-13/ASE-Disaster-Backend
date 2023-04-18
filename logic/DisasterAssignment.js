const DisasterData = require("../models/DisasterData");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const {calculateDistance} = require("./MappingService");

const checkDisasterLocation = async (type, longitude, latitude) => {
  const disasters = await DisasterData.find({ status: { $in: ['pending', 'active'] } }).populate('reports');
  
  for (let i = 0; i < disasters.length; i++) {
    const disaster = disasters[i];
    const distance = calculateDistance(latitude, longitude, disaster.latitude, disaster.longitude);
    if (distance < 500 && disaster.type === type) {
      console.log(`The location is within 500m of a ${type} disaster (${disaster.title}).`);
      return disaster._id;
    }
  }

  console.log(`The location is not within 500m of any ${type} disasters.`);
  return null;
}

const assignToDisaster = async (report) => {
  var disasterId = await checkDisasterLocation(report.type, report.longitude, report.latitude);
  if (!disasterId){
    console.log("Creating new report");
    console.log(JSON.stringify(report));
    const newData = new DisasterData({
      "latitude": report.latitude,
      "longitude": report.longitude,
      "disasterName": report.detail,
      "type": report.type,
      "status": "pending",
      "site": report.site,
      "radius": report.radius,
      "size": report.size,
      "ambulance": report.Ambulance,
      "fire": report.FireTruck,
      "police": report.Police,
      "helicopter": report.Helicopter,
      "bus": report.Bus
    });
    await newData.save();
    disasterId = newData._id.toString();
  }
  report.disaster = disasterId;
  // console.log(`Report with disaster: ${JSONs.stringify(report)}`);
  return report;
}

module.exports = {
  assignToDisaster : assignToDisaster
};