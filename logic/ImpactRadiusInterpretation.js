const {
    siteEnum
} = require("../models/enumData");

//finds out the location from the input string
//make it more generic by interpreting location data in future
function interpretDisasterLocation(inputString) {
    const foundLocations = searchWord(siteEnum.map(word => word.toLowerCase()), inputString.toLowerCase());
    return foundLocations;
}

function searchWord(listObject, inputString) {
    let foundWords = [];
    for (const word of listObject) {
        if (inputString.includes(word)) {
            foundWords.push(word);
            inputString = inputString.replace(new RegExp(`\\b${word}\\b`, 'gi'), '');
        }
    }
    if (foundWords.length > 0) {
        foundWords = foundWords[0]
    } else {
        foundWords = "building"
    }
    return foundWords;
}

const defaultRadius = 500;

//returns an impact radius for the map in meters
function interpretDisasterRadius(disasterType, impactLocation) {
    const defaultRadius = 0;

    const category1 = [
        'building',
        'library',
        'hotel',
        'restaurant',
        'school',
        'apartment',
        'supermarket',
        'bank',
        'church',
        'museum',
        'office',
        'city street',
        'park'
    ];

    const category2 = [
        'stadium',
        'mall',
        'factory',
        'hospital',
        'highway',
        'warehouse',
        'amusement park',
        'shopping center'
    ];

    const category3 = [
        'airport',
        'oil rig',
        'power plant',
        'bridge',
        'forest',
        'high-rise building',
        'river',
        'office building'
    ];

    let impactRadius = 0;
    let category = 0;

    if (category1.includes(impactLocation)) {
        category = 1;
    } else if (category2.includes(impactLocation)) {
        category = 2;
    } else if (category3.includes(impactLocation)) {
        category = 3;
    }

    switch (category) {
    case 1:
        switch (disasterType) {
        case 'flood':
            impactRadius = 50;
            break;
        case 'explosion':
            impactRadius = 150;
            break;
        case 'chemical hazard':
            impactRadius = 150;
            break;
        case 'terrorist activity':
            impactRadius = 150;
            break;
        case 'fire':
            impactRadius = 50;
            break;
        case 'tornado':
            impactRadius = 100;
            break;
        case 'earthquake':
            impactRadius = 100;
            break;
        case 'hurricane':
            impactRadius = 50;
            break;
        case 'accident':
            impactRadius = 50;
            break;
        case 'traffic accident':
            impactRadius = 50;
            break;
        case 'collapse':
            impactRadius = 50;
            break;
        case 'wildfire':
            impactRadius = 50;
            break;
        default:
            impactRadius = defaultRadius;
            break;
        }
        break;
    case 2:
        switch (disasterType) {
        case 'flood':
            impactRadius = 100;
            break;
        case 'explosion':
            impactRadius = 250;
            break;
        case 'chemical hazard':
            impactRadius = 250;
            break;
        case 'terrorist activity':
            impactRadius = 250;
            break;
        case 'fire':
            impactRadius = 100;
            break;
        case 'tornado':
            impactRadius = 200;
            break;
        case 'earthquake':
            impactRadius = 200;
            break;
        case 'hurricane':
            impactRadius = 100;
            break;
        case 'accident':
            impactRadius = 100;
            break;
        case 'traffic accident':
            impactRadius = 100;
            break;
        case 'collapse':
            impactRadius = 100;
            break;
        case 'wildfire':
            impactRadius = 100;
            break;
        default:
            impactRadius = defaultRadius;
            break;
        }
        break;
    case 3:
        switch (disasterType) {
        case 'flood':
            impactRadius = 200;
            break;
        case 'explosion':
            impactRadius = 500;
            break;
        case 'chemical hazard':
            impactRadius = 500;
            break;
        case 'terrorist activity':
            impactRadius = 500;
            break;
        case 'fire':
            impactRadius = 200;
            break;
        case 'tornado':
            impactRadius = 400;
            break;
        case 'earthquake':
            impactRadius = 400;
            break;
        case 'hurricane':
            impactRadius = 200;
            break;
        case 'accident':
            impactRadius = 200;
            break;
        case 'traffic accident':
            impactRadius = 200;
            break;
        case 'collapse':
            impactRadius = 200;
            break;
        case 'wildfire':
            impactRadius = 200;
            break;
        default:
            impactRadius = defaultRadius;
            break;
        }
        break;
    default:
        impactRadius = defaultRadius;
        break;
    }
    return impactRadius;
}

module.exports = {
    interpretDisasterLocation: interpretDisasterLocation,
    interpretDisasterRadius: interpretDisasterRadius
};
