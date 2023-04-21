// MappingServiceImpl.js
const MappingService = require("./interfaces/MappingService");

class MappingServiceImpl extends MappingService {
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2-lat1) * Math.PI / 180;
    const Δλ = (lon2-lon1) * Math.PI / 180;
  
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    const d = R * c; // distance in metres
    return d;
  }
  // Define a function to calculate the duration of the journey between two locations
  calculateDuration(startLat, startLong, endLat, endLong) {
  return fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${startLong},${startLat};${endLong},${endLat}?access_token=${mapboxApiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.routes && data.routes[0]) {
        // console.log(data.routes[0].duration);
        return data.routes[0].duration;
      } else {
        return 0;
      }
    });
}

// Define a function to calculate the duration of the journey to the destination for each starting location
calculateDurations(startLocations, disaster) {
  console.log("Calculating Durations");
  const durations = [];
  for (const start of startLocations) {
    const durationInSeconds = calculateDuration(start.latitude, start.longitude, disaster.latitude, disaster.longitude);
    durations.push({
      _id: start._id,
      name: start.name,
      latitude: start.latitude,
      longitude: start.longitude,
      duration: durationInSeconds,
      resource: start.resource,
      capacity: start.capacity
    });
  }
  // console.log('durations:', durations);
  return durations;
}

}
module.exports = MappingServiceImpl;

