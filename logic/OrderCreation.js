const {calculateDurations} = require("./Mapbox")

function getOptimalRoutes(locations, resource, requiredQuantity) {
    // Filter the locations to only include the desired type
    const filteredLocations = locations.filter((location) => location.resource === resource);
  
    // Sort the filtered locations by distance
    filteredLocations.sort((a, b) => a.duration - b.duration);
  
    let remainingQuantity = requiredQuantity;
    const orderLocations = [];
  
    // Loop through the sorted locations and find the closest location with enough quantity
    for (let i = 0; i < filteredLocations.length; i++) {
      const location = filteredLocations[i];
  
      if (remainingQuantity <= 0) {
        // We've found all the required quantity, so break out of the loop
        break;
      }
  
      if (location.capacity >= remainingQuantity) {
        // This location has enough quantity, so add it to the order and update remainingQuantity
        orderLocations.push({
          location: location,
          quantity: remainingQuantity
        });
        remainingQuantity = 0;
      } else {
        // This location doesn't have enough quantity, so add what they have to the order and update remainingQuantity
        orderLocations.push({
          location: location.id,
          quantity: location.capacity
        });
        remainingQuantity -= location.capacity;
      }
    }
    if (remainingQuantity > 0) {
        // There isn't enough capacity at any of the locations, so return an error message
        return { orderLocations: orderLocations, message: `There is not enough capacity for ${resource} at any of the locations.` };
    } else {
    // Return the order locations
    return { orderLocations: orderLocations };
    }
  }
  
  
async function createOrder(startingLocations, destinationLocation, resource, requiredQuantity) {
    console.log('startingLocations:', startingLocations);
    console.log('destinationLocation:', destinationLocation);
    console.log('resource:', resource);
    console.log('requiredQuantity:', requiredQuantity);
    console.log('Getting Fastest Routes');
    const fastestRoutes = await calculateDurations(startingLocations,destinationLocation);
    console.log('fastestRoutes:', fastestRoutes);
    const orders = getOptimalRoutes(fastestRoutes, resource, requiredQuantity);
    console.log('orders:', orders);
    return orders;
}

module.exports = {
    createOrder : createOrder,
    getOptimalRoutes : getOptimalRoutes
  };