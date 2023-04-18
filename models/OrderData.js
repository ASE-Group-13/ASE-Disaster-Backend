const mongoose = require("mongoose");
const {resourceEnum} = require("./enumData");

const orderDataSchema = new mongoose.Schema({
	created_at: {
		type: Date,
		default: Date.now,
		required: true
	},
	location: {
		type: JSON,
		required: true
	},
	locationLatitude: {
		type: String,
		required: true,
	},
	locationLongitude: {
		type: String,
		required: true,
	},
	resource: {
		type: String,
		enum: resourceEnum, 
    	required: true,
	},
	URL: {
		type: String,
    	required: true,
	},
	quantity: {
		type: String,
		required: true,
	},
	instructions: {
		type: String,
		required: false,
	},
	disaster: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "DisasterData",
		required: true,
	},
	status : {
		type: String,
		enum: ["active","resolved"],
    	required: true,
	},
	evacuationPoint : {
		type: JSON,
		required: false
	},
	restCentre : {
		type: mongoose.Schema.Types.ObjectId,
		ref: "LocationData",
		required: false
	}
});

module.exports = mongoose.model("OrderData", orderDataSchema);
