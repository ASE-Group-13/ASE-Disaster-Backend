const {trainModel, allocateResources} = require("C:/myProjects/ASE/ASE-Disaster-Backend/machine_learning/resource_allocator/resourceAllocator.js");

// trainModel()
console.log("Running Predictions");
predictions = allocateResources(['3','4',2000,750]) // Disaster place, disaster type, size (m), people affected
console.log(predictions)
console.log("Ambulance:", predictions[0])
console.log("Police:", predictions[1])
console.log("FireTruck:", predictions[2])
console.log("Buses:", predictions[3])
console.log("Helicopter:", predictions[4])