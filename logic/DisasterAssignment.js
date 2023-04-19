const DisasterData = require("../models/DisasterData");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const { calculateDistance, getAddressFromLatLng } = require("./MappingService");

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
  if (!disasterId) {
    console.log("Creating new report");
    console.log(JSON.stringify(report));
    const address = await getAddressFromLatLng(report.latitude, report.longitude)
    console.log(`${report.site} ${report.type} at ${address}`);

    const newData = new DisasterData({
      "latitude": report.latitude,
      "longitude": report.longitude,
      "disasterName": `${report.site} ${report.type} at ${address})}`,
      "disasterDescription": report.detail,
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

const updateDisasterWithReport = async (report) => {
  const disaster = await DisasterData.findById(report.disaster);

  // Push the new report to the disaster's reports array and update the description
  disaster.reports.push(newReportObject);
  disaster.disasterDescription += `\n\n${report.detail}`;

  // Calculate the new maximum size and radius
  let maxSize = disaster.size;
  let maxRadius = disaster.radius;
  for (const r of disaster.reports) {
    maxSize = Math.max(maxSize, r.size);
    maxRadius = Math.max(maxRadius, r.radius);
  }
  disaster.size = maxSize;
  disaster.radius = maxRadius;

  // Update type and site based on the median values
  const types = disaster.reports.map(r => r.type).sort();
  const sites = disaster.reports.map(r => r.site).sort();
  const medianIndex = Math.floor(types.length / 2);
  disaster.type = types.length % 2 === 0 ? types[medianIndex - 1] : types[medianIndex];
  disaster.site = sites.length % 2 === 0 ? sites[medianIndex - 1] : sites[medianIndex];

  // Save the updated disaster
  await disaster.save();
}

module.exports = {
  updateDisasterWithReport: updateDisasterWithReport,
  assignToDisaster: assignToDisaster
};