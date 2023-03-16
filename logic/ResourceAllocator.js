<<<<<<< Updated upstream
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
    const result = spawnSync('python', ['./python/scripts/resourceAllocator.py', disaster]);
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
=======
const path = require('path');

module.exports = {
    trainModel : function(){
        const { spawn } = require('child_process');
        const scriptPath = path.join(__dirname,"..","python/scripts/resourceAllocator.py")
        const scriptPromise = new Promise((resolve, reject) => {
          const pythonProcess = spawn('python', [scriptPath]);
          var result = '';
          var error = '';
          // Handle standard output from the Python process
          pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
          });
          // Handle error output from the Python process
          pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
          });
          // Handle exit event from the Python process
          pythonProcess.on('exit', (code) => {
            if (code === 0) {
              resolve(result.trim());
            } else {
              reject(new Error(`Python script exited with code ${code}. Error: ${error}`));
            }
          });
        })
        .then((result) => {
          console.log(`Training complete. ${result}`);
        })
        .catch((error) => {
          console.error(`Error running Python script: ${error.message}`);
        });
    },
    allocateResources : function(message){//message){
      var resultArray;
      const scriptPath = path.join(__dirname,"..","python/scripts/resourceAllocator.py")
      const { spawnSync } = require('child_process');
      // Run the Python script using spawnSync
      const result = spawnSync('python', [scriptPath, message]);//'3','4',2000,750]);
      // Check the output of the Python script
      if (result.status === 0) {
        console.log('Python script ran successfully');
        console.log('Output:', result.stdout.toString());
        predictionResult = result.stdout.toString();
        resultArray = predictionResult.replace("[", "")
        resultArray = resultArray.replace("]", "")
        resultArray = resultArray.replace("\r\n", "")
        resultArray = resultArray.split(" ");
        return resultArray;
      } else {
        console.error('Error running Python script');
        console.error('Error:', result.stderr.toString());
      }
    }
  };
>>>>>>> Stashed changes
