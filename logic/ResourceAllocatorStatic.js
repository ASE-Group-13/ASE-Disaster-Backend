function getResourcesStatic(disasterType, impactRadius, impactSize) {
  const resources = allocateResourcesStatic(disasterType, impactRadius, impactSize);
  return resources;
}

function allocateResourcesStatic(disasterType, impactRadius, impactSize) {
  const resources = {
    Ambulance: 0,
    Police: 0,
    'FireTruck': 0,
    Bus: 0,
    Helicopter: 0
  };

    const disasterIndex = disasterType;

    const resourceMapping = [
      // Ambulance and Police are required for all disasters
      { type: 'Ambulance', count: 2 },
      { type: 'Police', count: 2 },
      { type: 'Bus', count: 1 },
      // Resources required for each disaster type
      { type: 'Helicopter', count: 1, requiredFor: [0, 9, 13] }, // Flood, Hurricane, Wildfire
      { type: 'FireTruck', count: 1, requiredFor: [4, 5, 13] } // Fire, Chemical Hazard, Wildfire
      // Add more resources as needed
    ];
  
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
  
      resources[resource.type] = count;
    }
    
    return resources; 
  }
  // Keep the allocateResourcesStatic function unchanged

module.exports = {
  getResourcesStatic: getResourcesStatic
};
