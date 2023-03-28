// const disasterLocations = ["apartment", "building", "school", "library", "stadium", "restaurant", "park", "hotel"];

// function interpretDisasterLocation(inputString){
//   const inputStringLower = inputString.toLowerCase();
//   const foundLocations = disasterLocations.filter(word => inputStringLower.includes(word));
//   return foundLocations;
// }

// const locationImpactRadius = {
//   apartment: 500,
//   building: 500,
//   school: 500,
//   library: 500,
//   stadium: 1000,
//   restaurant: 500,
//   park: 500,
//   hotel: 500,
// };

// function interpretDisasterRadius(disasterType, impactLocation, defaultRadius = 500){
//   const impactLocationLower = impactLocation.toLowerCase();
//   const radiusObject = {
//     fire: 500,
//     explosion: 500,
//     flood: 500,
//     chemical: 500,
//     terrorist: 500,
//   };

//   if (disasterType.toLowerCase() in radiusObject) {
//     for (const key in locationImpactRadius) {
//       if (impactLocationLower.includes(key)) {
//         radiusObject[disasterType.toLowerCase()] = locationImpactRadius[key];
//         break;
//       }
//     }
//   } else {
//     return defaultRadius;
//   }

//   return radiusObject[disasterType.toLowerCase()] || defaultRadius;
// }

// module.exports = {
//   interpretDisasterLocation,
//   interpretDisasterRadius
// };


const disasterLocations = ["apartment", "building", "school", "library", "stadium", "restaurant", "park", "hotel"]

//finds out the location from the input string
//make it more generic by interpreting location data in future
function interpretDisasterLocation(inputString){
    // const inputString = inputString.string.toLowerCase();
    const foundLocations  = searchWord(disasterLocations.map(word => word.toLowerCase()),inputString.toLowerCase());
    return foundLocations;
}

function searchWord(listObject, inputString){
    let foundWords = [];
    for (const word of listObject) {
        if(inputString.includes(word)) {
            foundWords.push(word);
            inputString = inputString.replace(new RegExp(`\\b${word}\\b`, 'gi'), '');
        }
    }
    return foundWords;
}


//returns an impact radius for the map in meters
function interpretDisasterRadius(disasterType, impactLocation){
    let impactRadius = 0;
    if(disasterType.includes("fire")){

        if(impactLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        } 
        if(impactLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        } 
        if(impactLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactRadius = 1000;
        }
        if(impactLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }

    }else if(disasterType.toLowerCase().includes("explosion")){

        if(impactLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        } 
        if(impactLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        } 
        if(impactLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactRadius = 1000;
        }
        if(impactLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }

    }else if(disasterType.toLowerCase().includes("flood")){

        if(impactLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        } 
        if(impactLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        } 
        if(impactLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactRadius = 1000;
        }
        if(impactLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }

    }else if(disasterType.toLowerCase().includes("chemical")){

        if(impactLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        } 
        if(impactLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        } 
        if(impactLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactRadius = 1000;
        }
        if(impactLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }

    }else if(disasterType.toLowerCase().includes("terrorist")){

        if(impactLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        } 
        if(impactLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        } 
        if(impactLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactRadius = 1000;
        }
        if(impactLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }
        if(impactLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactRadius = 500;
        }

    }
    return impactRadius;
}

module.exports = {
    interpretDisasterLocation: interpretDisasterLocation,
    interpretDisasterRadius: interpretDisasterRadius
};