const { spawnSync } = require("child_process");

  function trainModel() {
    console.log("Training model...")
    // spawn new child process to call the python script
<<<<<<< Updated upstream
    const python = spawnSync('python', ['./python/scripts/spamDetectionClassifier.py']);
=======
    const python = spawnSync('python', ['../python/scripts/spamDetectionClassifier.py']);
>>>>>>> Stashed changes
    // collect data from script
    if (python.stderr.length != 0) {
      console.log(Error(python.stderr))
      return false
    }
    console.log("Done")
    return true
  }

  function predictMessage(message) {
    console.log("Checking for spam...")
    // spawn new child process to call the python script
<<<<<<< Updated upstream
    const python = spawnSync('python', ['./python/scripts/spamPrediction.py', message]);
=======
    const python = spawnSync('python', ['../python/scripts/spamPredictor.py', message]);
>>>>>>> Stashed changes
    // collect data from script
    if (python.stderr.length != 0) {
      console.log(Error(python.stderr));
    }
    // If 0, message is spam, if 1, message is real disaster
    if (String(python.stdout).trim() == '1') {
      return false
    } else{
      return true
    }
  }

  module.exports = {
    trainModel: trainModel,
    predictMessage: predictMessage,
};