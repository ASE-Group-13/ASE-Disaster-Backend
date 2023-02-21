const {predictMessage} = require("C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/spamDetector.js");

console.log(predictMessage("Fire on South Leinster Street! Be Careful!"));

// console.log("Training New Model");
// trainModel();
// console.log("Check Models folder and check the time of the last modification");
console.log("Running Predictions");
//var test = predictMessage("Fire! Help!");

// function predictMessage(message){
// var predictionResult;
// var resultArray;
// scriptPath = "C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPredictor.py"
// const { spawnSync } = require('child_process');
// // Run the Python script using spawnSync
// const result = spawnSync('python', [scriptPath, "Fire in the building!"]);
// // Check the output of the Python script
// if (result.status === 0) {
//   console.log('Python script ran successfully');
//   console.log('Output:', result.stdout.toString());
//   predictionResult = result.stdout.toString();
//   console.log(typeof(predictionResult));
//   resultArray = Array.from(predictionResult);
//   console.log('Array:',resultArray);
//   console.log('Type',typeof(resultArray));
//   console.log('Single',resultArray[2]);
// } else {
//   console.error('Error running Python script');
//   console.error('Error:', result.stderr.toString());
// }

// console.log(predictionResult);