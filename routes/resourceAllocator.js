const router = require("express").Router();
  
function predictResources(req, res) {
    var data2;
    var message = "Fire is building downtown!"
    // spawn new child process to call the python script
    var spawn = require("child_process").spawn;
    const python = spawn('python', ['spam_detector/python_source/spamPrediction.py',message]);
    // collect data from script
    python.stdout.on('data', function (data) {
      console.log(`stdout: ${data}`);
      data2 = data.toString();
    });
    python.stderr.on('data', (error) => {
      console.error(`stderr: ${error}`);
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
       console.log(`child process close all stdio with code ${code}`);
       // send data to browser
       res.send(data2)
    });
    console.log(data2)
  }

router.get(`/prediction`,predictResources)

module.exports = router;