const {allocateResources} = require("../logic/ResourceAllocator")
const disasterTypeObj = require('../logic/DisasterInterpretation.js');
const disasterLocationObj = require('../logic/ImpactRadiusInterpretation.js')
const disasterSizeObj = require('../logic/ImpactSizeInterpretation.js')

const test = "fire in the building";
disasterType = disasterTypeObj.interpretDisaster(test);
disasterLocation = disasterLocationObj.interpretDisasterLocation(test);
disasterRadius = disasterLocationObj.interpretDisasterRadius(disasterType, disasterLocation);
disasterImpactedPeopleCount = disasterSizeObj.interpretImpactSize(test, disasterLocation);
console.log(`Disaster Type:${disasterType}`);
console.log(`Disaster Location:${disasterLocation}`);
console.log(`Disaster Radius:${disasterRadius}`);
console.log(`Disaster Impact:${disasterImpactedPeopleCount}`);
let interpretation = [disasterType,disasterLocation,disasterRadius,disasterImpactedPeopleCount];
console.log(interpretation);
const resources = allocateResources(interpretation); 
console.log(resources);