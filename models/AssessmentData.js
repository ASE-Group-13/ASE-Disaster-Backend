const severityData = {
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
    }
}

const resourcesData = {
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
}

module.exports = {
    severityData,
    resourcesData
};