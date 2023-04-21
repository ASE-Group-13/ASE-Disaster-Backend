const mongoose = require("mongoose");
const {
    siteEnum,
    typeEnum,
    statusEnum
} = require("./enumData");

// Disaster schema structure definition
const disasterDataSchema = new mongoose.Schema({
    created_at: {
        type: Date,
    default:
        Date.now,
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
    disasterName: {
        type: String,
        required: true,
    },
    disasterDescription: {
        type: String,
        required: false,
    },
    evacuation: {
        type: Boolean,
        required: false,
    default:
        false
    },
    status: {
        type: String,
        enum: statusEnum,
        required: true,
    },
    reports: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportData",
        }
    ],
    type: {
        type: String,
        enum: typeEnum,
        required: false,
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
    ambulance: {
        type: Number,
        required: false,
    },
    police: {
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

module.exports = mongoose.model("DisasterData", disasterDataSchema);