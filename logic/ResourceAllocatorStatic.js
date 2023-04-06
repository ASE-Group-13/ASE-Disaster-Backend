const { type } = req.params;
const impactRadius = parseInt(req.query.radius) || 0;
const impactSize = parseInt(req.query.size) || 0;
const resources = allocateResourcesStatic(type, impactRadius, impactSize);
res.json({ resources });

function allocateResourcesStatic(){
    const resourceMapping = [
        // Ambulance and Police are required for all disasters
        { type: 'Ambulance', count: 2 },
        { type: 'Police', count: 2 },
      
        // Resources required for each disaster type
        { type: 'Helicopter', count: 1, requiredFor: [0, 9, 13] }, // Flood, Hurricane, Wildfire
        { type: 'Bus', count: 1, requiredFor: [0] }, // Flood
        { type: 'Fire Truck', count: 1, requiredFor: [4, 5, 13] }, // Fire, Chemical Hazard, Wildfire
        // Add more resources as needed
      ];
}

function allocateResourcesStatic(disasterType, impactRadius, impactSize) {
    const resources = [];
    
    // Find the disaster type based on the typeMapper object
    const typeMapper = {
      'Flood': 0, 'Explosion': 1, 'Exlposion': 1, 'Chemical hazard': 2, 'Terrorist activity': 3, 'Fire': 4, 
      'Chemical Hazard': 5, 'Terrorist Activity': 6, 'Tornado': 7, 'Earthquake': 8, 'Hurricane': 9, 'Accident': 10, 
      'Traffic accident': 11, 'Collapse': 12, 'Wildfire': 13
    };
    const disasterIndex = typeMapper[disasterType];
  
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
