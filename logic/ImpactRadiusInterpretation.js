const disasterLocations = ["apartment", "building", "school", "library", "stadium", "restaurant", "park", "hotel"];

function interpretDisasterLocation(inputString){
  const inputStringLower = inputString.toLowerCase();
  const foundLocations = disasterLocations.filter(word => inputStringLower.includes(word));
  return foundLocations;
}

const locationImpactRadius = {
  apartment: 500,
  building: 500,
  school: 500,
  library: 500,
  stadium: 1000,
  restaurant: 500,
  park: 500,
  hotel: 500,
};

function interpretDisasterRadius(disasterType, impactLocation, defaultRadius = 500){
  const impactLocationLower = impactLocation.toLowerCase();
  const radiusObject = {
    fire: 500,
    explosion: 500,
    flood: 500,
    chemical: 500,
    terrorist: 500,
  };

  if (disasterType.toLowerCase() in radiusObject) {
    for (const key in locationImpactRadius) {
      if (impactLocationLower.includes(key)) {
        radiusObject[disasterType.toLowerCase()] = locationImpactRadius[key];
        break;
      }
    }
  } else {
    return defaultRadius;
  }

  return radiusObject[disasterType.toLowerCase()] || defaultRadius;
}

module.exports = {
  interpretDisasterLocation,
  interpretDisasterRadius
};
