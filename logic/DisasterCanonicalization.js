const placeMapper = {'Building': 0, 'Library': 1, 'Hotel': 2, 'Stadium': 3, 'Restaurant': 4, 'School': 5, 'Apartment': 6, 'Park': 7, 'Mall': 8, 'Office': 9, 'Factory': 10, 'Airport': 11, 'Hospital': 12, 'Supermarket': 13, 'Bank': 14, 'Highway': 15, 'Warehouse': 16, 'Amusement Park': 17, 'Church': 18, 'Museum': 19, 'Shopping Center': 20, 'Oil rig': 21, 'Power plant': 22, 'City street': 23, 'Bridge': 24, 'River': 25, 'Forest': 26, 'Office Building': 27, 'High-rise Building': 28}

const typeMapper = {'Flood': 0, 'Explosion': 1, 'Exlposion':1, 'Chemical hazard': 2, 'Terrorist activity': 3, 'Fire': 4, 'Chemical Hazard': 5, 'Terrorist Activity': 6, 'Tornado': 7, 'Earthquake': 8, 'Hurricane': 9, 'Accident': 10, 'Traffic accident': 11, 'Collapse': 12, 'Wildfire': 13}

function getCanonicalForm(type, location) {
    const canonicalType = typeMapper[type];
    const canonicalLocation = placeMapper[location];
    return { canonicalType, canonicalLocation };
  }

  module.exports = {
    getCanonicalForm: getCanonicalForm
};