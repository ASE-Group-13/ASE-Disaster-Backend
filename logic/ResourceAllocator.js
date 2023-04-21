const {
  spawnSync
} = require("child_process");

// Train resource allocation model
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

// Predict resources
function allocateResources(disaster) {
  console.log(disaster);
  const {
      spawnSync
  } = require('child_process');
  // Run the Python script using spawnSync
  const result = spawnSync('python', ['./python/scripts/resourceAllocation.py', disaster]);
  // Check the output of the Python script
  if (result.status === 0) {
      console.log('Python script ran successfully');
      console.log('Output:', result.stdout.toString());
      const string = result.stdout.toString();
      let strippedString = string.replace(/\s+/g, ' ').trim(); // remove extra spaces
      let stringArray
      if (string[2] === " ") {
          stringArray = strippedString.slice(3, -2).split(' ');
      } else {
          stringArray = strippedString.slice(2, -2).split(' ');
      }
      // remove brackets and split into individual string values
      let floatArray = stringArray.map(function (element) {
          return parseFloat(element);
      });
      let intArray = floatArray.map(function (element) {
          return Math.round(element);
      });
      console.log(intArray);
      return formatResources(intArray, disaster);
  } else {
      console.error('Error running Python script');
      console.error('Error:', result.stderr.toString());
  }
}

// Format resource into Json structure
function formatResources(resources) {
  const data = {
      "Ambulance": resources[0],
      "Police": resources[1],
      "FireTruck": resources[2],
      "Bus": resources[3],
      "Helicopter": resources[4]
  };
  return data;
}

module.exports = {
  trainModel: trainModel,
  allocateResources: allocateResources,
};