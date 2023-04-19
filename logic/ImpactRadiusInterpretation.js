const {siteEnum} = require("../models/enumData");

//finds out the location from the input string
//make it more generic by interpreting location data in future
function interpretDisasterLocation(inputString){
    // const inputString = inputString.string.toLowerCase();
    console.log(inputString);
    const foundLocations  = searchWord(siteEnum.map(word => word.toLowerCase()),inputString.toLowerCase());
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
    if(foundWords.length > 0){
        foundWords = foundWords[0]
    }
    else{
        foundWords = "building"
    }
    return foundWords;
}

const defaultRadius = 500;

//returns an impact radius for the map in meters
function interpretDisasterRadius(disasterType, impactLocation){
    let impactRadius = 0;
    // console.log(typeof disasterType);
    // console.log(disasterType);
    if(disasterType.toLowerCase().includes("fire")){

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
        }else {
            impactRadius = defaultRadius;
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
        }else {
            impactRadius = defaultRadius;
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
        }else {
            impactRadius = defaultRadius;
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
        }else {
            impactRadius = defaultRadius;
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
        }else {
            impactRadius = defaultRadius;
        }
    }else {
        impactRadius = defaultRadius;
    }
    return impactRadius;
}

module.exports = {
    interpretDisasterLocation: interpretDisasterLocation,
    interpretDisasterRadius: interpretDisasterRadius
};