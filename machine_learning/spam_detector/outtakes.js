const spamDetector = {  
  trainModel: function() {
    // spawn new child process to call the python script
    var spawn = require("child_process").spawn;
    const python = spawn('python', ["C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamDetectionClassifier.py"]);
    // collect data from script
    python.stdout.on('data', function (data) {
    // console.log(`stdout: ${data}`);
    });
    python.stderr.on('data', (error) => {
    // console.error(`stderr: ${error}`);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    // console.log(`child process close all stdio with code ${code}`);
      // send data to browser
    });
  },
  predictMessage: function(message) {
    var prediction;
    // spawn new child process to call the python script
    var spawn = require("child_process").spawn;
    //const env = spawn('conda', ['activate base']);
    const script = spawn('python', ["C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPrediction.py", message]);
    // collect data from script
    script.stdout.on('data', function (data) { 
        console.log(`stdout: ${data}`);
        prediction = data.toString();
        console.log(`prediction: ${prediction}`);
    });
    script.stderr.on('data', (error) => {
        prediction = error.toString();
        console.error(`stderr: ${error}`);
    });
    // in close event we are sure that stream from child process is closed
    script.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        return prediction;
    });
    console.log(`prediction: ${prediction}`);
    // env.on('close', (code) => {
      // console.log(`child process close all stdio with code ${code}`);
    // });
    // return prediction;
  }
}


const spamDetector = {
    runPythonScript : function(scriptPath, args) {
      return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [scriptPath], [...args]);
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
      });
    },
    trainModel : function(){
      runPythonScript("C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamDetectionClassifier.py")
      .then((result) => {
        console.log(`Python script returned: ${result}`);
      })
      .catch((error) => {
        console.error(`Error running Python script: ${error.message}`);
      });
    },
    predictMessage: function(message){
      var predictionResult;
      runPythonScript("C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPredictor.py",[message])
      .then((result) => {
        console.log(`Python script returned: ${result}`);
        predictionResult=result;
      })
      .catch((error) => {
        console.error(`Error running Python script: ${error.message}`);
        predictionResult=error;
      });
      return predictionResult;
    }
  }

  function runPythonScript(scriptPath, args) {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', [scriptPath, args]);
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
    });
  }
  function predictMessage(message){
    var predictionResult;
    runPythonScript("C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPredictor.py",[message])
    .then((result) => {
      console.log(`Python script returned: ${result}`);
      predictionResult=result;
    })
    .catch((error) => {
      console.error(`Error running Python script: ${error.message}`);
      predictionResult=error;
    });
    return predictionResult;
  }


  
var scriptResult;
message = "Help! Fire!"
runPythonScript('C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPredictor.py', message)
  .then(result => {
    console.log(`Python script returned: ${result}`);
    scriptResult = result;
    setTimeout(function() {
      console.log('Waited for 5 seconds');
      scriptResult = result;
      console.log(scriptResult);
    }, 5000);
  })
  .catch(error => {
    console.error(`Error running Python script: ${error}`);
    scriptResult = error;
  });

console.log(scriptResult);

console.log('Starting');
setTimeout(function() {
  console.log('Waited for 5 seconds');
  console.log(scriptResult);
}, 5000);
console.log('Continuing');
  
console.log(scriptResult);

console.log(spamDetector.predictMessage("HELP"));


  trainModel: function() {
    // spawn new child process to call the python script
    var spawn = require("child_process").spawn;
    const python = spawn('python', ["C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamDetectionClassifier.py"]);
    // collect data from script
    python.stdout.on('data', function (data) {
    // console.log(`stdout: ${data}`);
    });
    python.stderr.on('data', (error) => {
    // console.error(`stderr: ${error}`);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    // console.log(`child process close all stdio with code ${code}`);
      // send data to browser
    });
  },
  predictMessage: function(message) {
    var prediction;
    // spawn new child process to call the python script
    var spawn = require("child_process").spawn;
    //const env = spawn('conda', ['activate base']);
    const script = spawn('python', ["C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPrediction.py", message]);
    // collect data from script
    script.stdout.on('data', function (data) { 
        console.log(`stdout: ${data}`);
        prediction = data.toString();
        console.log(`prediction: ${prediction}`);
    });
    script.stderr.on('data', (error) => {
        prediction = error.toString();
        console.error(`stderr: ${error}`);
    });
    // in close event we are sure that stream from child process is closed
    script.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        return prediction;
    });
    console.log(`prediction: ${prediction}`);
    // env.on('close', (code) => {
      // console.log(`child process close all stdio with code ${code}`);
    // });
    // return prediction;
  }

  runPythonScript : function(scriptPath, args) {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', [scriptPath], [...args]);
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
    });
  },




  const {trainModel, predictMessage} = require("C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/spamDetector.js");
  const { spawnSync } = require('child_process');
  
  
  // console.log("Training New Model");
  // trainModel();
  // console.log("Check Models folder and check the time of the last modification");
  console.log("Running Predictions");
  //var test = predictMessage("Fire! Help!");
  
  // function predictMessage(message){
  var predictionResult;
  scriptPath = "C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPredictor.py"
  const script = new Promise((resolve, reject) => {
      const pythonProcess = spawnSync('python', [scriptPath, "Fire! Send Help!"]);
      var result = '';
      var error = '';
      // Handle standard output from the Python process
      pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
      console.log(`stout: ${result}`);
      });
      // Handle error output from the Python process
      pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
      });
      // Handle close event from the Python process
      pythonProcess.on('close', (code) => {
      if (code === 0) {
          resolve(result.trim());
      } else {
          reject(new Error(`Python script exited with code ${code}. Error: ${error}`));
      }
      });
  }).then((result) => {
      console.log(`Python script returned: ${result}`);
      predictionResult = result;
  }).catch((error) => {
      console.error(`Error running Python script: ${error.message}`);
      
      predictionResult=error;
  });
  console.log(predictionResult);
  //  }



  const { spawn } = require('child_process');
  var predictionResult;
  scriptPath = "C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPredictor.py"
  const script = new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [scriptPath], message);
    var result = '';
    var error = '';
    // Handle standard output from the Python process
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
      console.log(`stout: ${result}`);
    });
    // Handle error output from the Python process
    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });
    // Handle close event from the Python process
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(result.trim());
      } else {
        reject(new Error(`Python script exited with code ${code}. Error: ${error}`));
      }
    });
  }).then((result) => {
    console.log(`Python script returned: ${result}`);
    predictionResult = result;
  })
  .catch((error) => {
  //  console.error(`Error running Python script: ${error.message}`);
    predictionResult=error;
  });