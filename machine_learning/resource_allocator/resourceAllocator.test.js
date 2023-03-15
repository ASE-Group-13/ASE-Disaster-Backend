const {allocateResources} = require("C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/resource_allocator/resourceAllocator.js");

console.log("Running Predictions");
prediction = allocateResources() //['3','4',2000,750]
console.log(prediction)
console.log("Ambulance:", predictions[0][0])
console.log("Police:", predictions[0][1])
console.log("FireTruck:", predictions[0][2])
console.log("Buses:", predictions[0][3])
console.log("Helicopter:", predictions[0][4])