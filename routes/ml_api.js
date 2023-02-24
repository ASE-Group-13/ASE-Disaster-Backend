const router = require("express").Router();
require("dotenv").config();
const mongoose = require("mongoose");
const spamFilterObj = require('../logic/SpamFilter.js');

//example of DB model
const Data = require("../models/DisasterData");
//example of external module for functions
const disasterTypeObj = require('../logic/DisasterInterpretation.js');


//TODO
// - add base path to these APIs

// retrieve spam prediction for a report
// input: report / report-text
// output: boolean (spam/not-spam)
router.post("/spam-predict", async (req, res) =>{
    //function call 
})

// add report to pool
// input: report / report-text + target value
// output: boolean (success/failure)
router.post("/add-to-pool", async (req, res) =>{
    //Function call 
})

// validate report pool
// input: disasterID, boolean (validate/unvalidate)
// output: boolean (success or failure)
router.post("/validate-pool", async (req, res) =>{
    //Function call 
})

// retrain model
// input:
// output: boolean (success/failure)
router.get("/retrain-model", async (req, res) =>{
    //Function call 
})

module.exports = router;