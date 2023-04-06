function getResourcesStatic(disasterType, impactRadius, impactSize) {
  const resources = allocateResourcesStatic(disasterType, impactRadius, impactSize);
  return resources;
}

function allocateResourcesStatic(){
    const resourceMapping = [
        // Ambulance and Police are required for all disasters
        { type: 'Ambulance', count: 2 },
        { type: 'Police', count: 2 },
      
        // Resources required for each disaster type
        { type: 'Helicopter', count: 1, requiredFor: [0, 9, 13] }, // Flood, Hurricane, Wildfire
        { type: 'Bus', count: 1, requiredFor: [0] }, // Flood
        { type: 'Fire Truck', count: 1, requiredFor: [4, 5, 13] }, // Fire, Chemical Hazard, Wildfire
        
      ];
}

function allocateResourcesStatic(disasterType, impactRadius, impactSize) {
    const resources = [];

    const disasterIndex = disasterType;
  
    // Loop through the resource mapping and add resources as needed
    for (let resource of resourceMapping) {
      // Check if this resource is required for this disaster type
      if (resource.requiredFor && resource.requiredFor.indexOf(disasterIndex) === -1) {
        continue;
      }

      // Calculate the number of resources based on the impact radius and size
      let count = resource.count;
      count += Math.ceil(impactRadius / 500);
      count += Math.ceil(impactSize / 10);
  
      resources.push({ type: resource.type, count });
    }
    
    return resources; 
  }
  // Keep the allocateResourcesStatic function unchanged

module.exports = {
  getResourcesStatic: getResourcesStatic
};
