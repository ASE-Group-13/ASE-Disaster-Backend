//const detector = require(`${route}/machine_learning/spam_detector/spamDetector.js`)
const {predictMessage} = require("C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/spamDetector.js");


describe("Predicting Spam Tests", () => {
  test('returns something',()=>{
    expect(
      function(){
        var message = 10;
        var predictionResult='';
        var resultArray;
        scriptPath = "C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPredictor.py"
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
          console.log(typeof(predictionResult));
          resultArray = Array.from(predictionResult);
          console.log('Single',resultArray[2]);
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
        }}
      ).not.toBeNull();
  })

  // test('returns error if argument is not string',()=>{
  //   expect(detector.predictMessage(10)).toBe("error");
  // })

  test('returns 1 if message is real',()=>{
    expect(
      function(){
        var message = "Fire on South Leinster Street! Be Careful!";
        var predictionResult='';
        var resultArray;
        scriptPath = "C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPredictor.py"
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
          console.log(typeof(predictionResult));
          resultArray = Array.from(predictionResult);
          console.log('Single',resultArray[2]);
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
        }}
    ).toBe('1');
  })

  test('returns 0 if message is spam',()=>{
    expect(
      function(){
        var message = "this party is ablaze!";
        var predictionResult='';
        var resultArray;
        scriptPath = "C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/spam_detector/python_source/spamPredictor.py"
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
          console.log(typeof(predictionResult));
          resultArray = Array.from(predictionResult);
          console.log('Single',resultArray[2]);
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
        }}
    ).toBe('0');
  })
})