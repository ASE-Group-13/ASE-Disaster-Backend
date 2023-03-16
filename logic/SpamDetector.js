const path = require('path');

const configPath = path.join(__dirname, '..', 'Routes', 'config.json');

module.exports = {
  trainModel : function(){
    const { spawn } = require('child_process');
    const scriptPath = path.join(__dirname,"..","python/scripts/spamDetectionClassifier.py")
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
      console.log(`Python script returned: ${result}`);
    })
    .catch((error) => {
      console.error(`Error running Python script: ${error.message}`);
    });
  },
  predictMessage : function(message){
    var predictionResult='';
    var resultArray;
    const scriptPath = path.join(__dirname,"..","python/scripts/spamPredictor.py")
    const { spawnSync } = require('child_process');
    // Run the Python script using spawnSync
    const result = spawnSync('python', [scriptPath, message]);
    // Check the output of the Python script
    if (result.status === 0) {
      console.log('Python script ran successfully');
      // console.log('Output:', result.stdout?.toString() || "['0']");
      // predictionResult = result.stdout?.toString() || "['0']";
      console.log('Output:', result.stdout.toString());
      predictionResult = result.stdout.toString();
      resultArray = Array.from(predictionResult);
      predictionResult=resultArray[2];
      return predictionResult;
    } else {
      console.error('Error running Python script');
      console.error('Error:', result.stderr.toString());
    }
    if (predictionResult==="1"){
      return true;
    } else {
      return false;
    }
  }
};