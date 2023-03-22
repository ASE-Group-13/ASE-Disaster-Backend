const { spawnSync } = require("child_process");

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
    var resultArray;
    const { spawnSync } = require('child_process');
    // Run the Python script using spawnSync
    const result = spawnSync('python', ['./python/scripts/resourceAllocation.py', disaster]);
    // Check the output of the Python script
    if (result.status === 0) {
      console.log('Python script ran successfully');
      console.log('Output:', result.stdout.toString());
      const str = result.stdout.toString()
      const basicStr = str.replace("[","").replace("]","")
      finalArray = basicStr.split(" ").map(Number);
      console.log(finalArray);
      return finalArray;
    } else {
      console.error('Error running Python script');
      console.error('Error:', result.stderr.toString());
    }
  }
  module.exports = {
    trainModel: trainModel,
    allocateResources: allocateResources,
};
