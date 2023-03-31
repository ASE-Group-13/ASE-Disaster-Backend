const mapboxApiKey = 
	"pk.eyJ1IjoiZ29yYWFhZG1pIiwiYSI6ImNsY3l1eDF4NjAwbGozcm83OXBiZjh4Y2oifQ.oJTDxjpSUZT5CHQOtsjjSQ";

// Define a function to calculate the duration of the journey between two locations
function calculateDuration(startCoordinates, endCoordinates) {
  return fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates.lng},${startCoordinates.lat};${endCoordinates.lng},${endCoordinates.lat}?access_token=${mapboxApiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.routes && data.routes[0]) {
        return data.routes[0].duration;
      } else {
        return 0;
      }
    });
}


// Define a function to calculate the duration of the journey to the destination for each starting location
async function calculateDurations(startingLocations, destinationLocation) {
  console.log('startingLocations:', startingLocations);
  console.log('destinationLocation:', destinationLocation);
  const durations = [];
  for (const startingLocation of startingLocations) {
    const durationInSeconds = await calculateDuration(startingLocation.coordinates, destinationLocation.coordinates);
    durations.push({
      id: startingLocation.id,
      coordinates: startingLocation.coordinates,
      duration: durationInSeconds,
      resource: startingLocation.resource,
      capacity: startingLocation.capacity
    });
  }
  console.log('durations:', durations);
  return durations;
}

module.exports = {
  calculateDurations : calculateDurations,
  calculateDuration : calculateDuration
};
