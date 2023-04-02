const { spawnSync } = require("child_process");
const {typeEnum,siteEnum} = require("../models/enumData");

  function trainModel() {
    console.log("Training model...")
    // spawn new child process to call the python script
    const python = spawnSync('python', ['./python/scripts/resourceTrainer.py']);
    // collect data from script
    if (python.stderr.length != 0) {
      console.log(Error(python.stderr))
      return false
    }
    console.log("Done")
    return true
  }
  function allocateResources(disaster){
    console.log(disaster);
    var resultArray;
    const { spawnSync } = require('child_process');
    // Run the Python script using spawnSync
    const result = spawnSync('python', ['./python/scripts/resourceAllocation.py', disaster]);
    // Check the output of the Python script
    if (result.status === 0) {
      console.log('Python script ran successfully');
      console.log('Output:', result.stdout.toString());
      const string = result.stdout.toString();
      let strippedString = string.replace(/\s+/g, ' ').trim(); // remove extra spaces
      let stringArray 
      if (string[2]===" "){
        stringArray  = strippedString.slice(3, -2).split(' ');
      } else{
        stringArray  = strippedString.slice(2, -2).split(' ');
      }
       // remove brackets and split into individual string values
      let floatArray = stringArray.map(function(element) {
        return parseFloat(element);
      });
      let intArray = floatArray.map(function(element) {
        return Math.round(element);
      });
      console.log(intArray);
      return formatResources(intArray,disaster);
    } else {
      console.error('Error running Python script');
      console.error('Error:', result.stderr.toString());
    }
  }
  function formatResources(resources,disaster){
    const data = {
      site: siteEnum[disaster[0]],
      type: typeEnum[disaster[1]],
      radius: disaster[2],
      size: disaster[3],
      ambulance : resources[0],
      police : resources[1],
      fire: resources[2],
      bus: resources[3],
      helicopter: resources[4]
    };
    // console.log(`resource:${JSON.stringify(data)}`);
    return data;
  }


  module.exports = {
    trainModel: trainModel,
    allocateResources: allocateResources,
};
