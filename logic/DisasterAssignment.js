const DisasterData = require("../models/DisasterData");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
    calculateDistance
} = require("./MappingService");

const checkDisasterLocation = async(type, longitude, latitude) => {
    const disasters = await DisasterData.find({
        status: {
            $in: ['pending', 'active']
        }
    }).populate('reports');

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

const assignToDisaster = async(report) => {
    var disasterId = await checkDisasterLocation(report.type, report.longitude, report.latitude);
    if (!disasterId) {
        console.log("Creating new report");
        console.log(JSON.stringify(report));
        const title = `${report.site} ${report.type}`;
        console.log(title);

        const newData = new DisasterData({
            "latitude": report.latitude,
            "longitude": report.longitude,
            "disasterName": title,
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
    return report;
}

const updateDisasterWithReport = async(report) => {
    console.log("starting disaster update");
    console.log(report);
    const disaster = await DisasterData.findByIdAndUpdate(
            report.disaster, {
            $push: {
                reports: report._id,
            },
            $set: {
                type: report.type,
                site: report.site,
            }
        }, {
            new: true
        });
    const description = disaster.disasterDescription;
    console.log("first updated disaster", disaster);
    let maxSize = 0;
    let maxRadius = 0;
    for (const r of disaster.reports) {
        if (!isNaN(r.size)) {
            maxSize = Math.max(maxSize, parseInt(r.size));
        }
        if (!isNaN(r.radius)) {
            maxRadius = Math.max(maxRadius, parseInt(r.radius));
        }
    }
    if (maxSize === 0) {
        maxSize = report.size;
    }
    if (maxRadius === 0) {
        maxRadius = report.radius;
    }
    const updatedDisaster = await DisasterData.findByIdAndUpdate(
            report.disaster, {
            $set: {
                radius: maxRadius,
                size: maxSize,
                disasterDescription: `${description}\n${report.detail}`
            }
        }, {
            new: true
        });

    console.log("second updated disaster", disaster);
    return updatedDisaster;
}

module.exports = {
    updateDisasterWithReport: updateDisasterWithReport,
    assignToDisaster: assignToDisaster
};
