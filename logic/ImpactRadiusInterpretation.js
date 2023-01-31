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

//   function searchEnum(enumObject, impactLocation) {
//     for (const key in enumObject) {
//         if (enumObject.hasOwnProperty(key)) {
//             if(enumObject[key].toLowerCase() === impactLocation.string.toLowerCase())
//                 return enumObject[key];
//         }
//     }
//     return null;
// }

// const FireRadius = {
//     Apartment: 200,
//     Building: 500,
//     School: 1000,
//     Library: 200,
//     Stadium: 2000,
//     Restaurant: 800,
//     Park: 400,
//     Hotel: 500
//   };

// const ExplosionRadius = {
//     Apartment: 500,
//     Building: 1000,
//     School: 2000,
//     Library: 1000,
//     Stadium: 3000,
//     Park: 1000,
//     Restaurant: 1000,
//     Hotel: 1500
//   };

// const FloodRadius = {
//     Apartment: 1000,
//     Building: 1000,
//     School: 2000,
//     Library: 2000,
//     Stadium: 3000,
//     Park: 2000,
//     Restaurant: 1000,
//     Hotel: 500
//   };

// const ChemicalHazardRadius = {
//     Apartment: 500,
//     Building: 1000,
//     School: 2000,
//     Library: 1000,
//     Park: 2000,
//     Stadium: 3000,
//     Restaurant: 1000,
//     Hotel: 1500
//   };

// const TerroristActivityRadius = {
//     Apartment: 2000,
//     Building: 2000,
//     School: 2000,
//     Library: 2000,
//     Park: 3000,
//     Stadium: 3000,
//     Restaurant: 2000,
//     Hotel: 2000
//   };