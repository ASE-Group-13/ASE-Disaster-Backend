// ImpactSizeServiceImpl.js
const ImpactSizeService = require("./interfaces/ImpactSizeService");
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

class ImpactSizeServiceImpl extends ImpactSizeService {
  interpretImpactSize(inputString, disasterLocation) {
    // const inputString = inputString.string.toLowerCase();
    let impactSize = 5;
    if(findSize(veryFewSynonyms.map(word => word.toLowerCase()),inputString.toLowerCase())){
        //case 0
        if(disasterLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactSize = 5;
        } 
        if(disasterLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactSize = 10;
        } 
        if(disasterLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactSize = 5;
        } 
        if(disasterLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactSize = 10;
        }
        if(disasterLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactSize = 20;
        }
        if(disasterLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactSize = 10;
        }
        if(disasterLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactSize = 20;
        }
        if(disasterLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactSize = 10;
        }
        return impactSize;
    }else if(findSize(fewSynonyms.map(word => word.toLowerCase()),inputString)){
        //case 1
        if(disasterLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactSize = 5;
        } 
        if(disasterLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactSize = 10;
        } 
        if(disasterLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactSize = 10;
        } 
        if(disasterLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactSize = 15;
        }
        if(disasterLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactSize = 50;
        }
        if(disasterLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactSize = 20;
        }
        if(disasterLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactSize = 20;
        }
        if(disasterLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactSize = 20;
        }
        return impactSize;
    }else if(findSize(someSynonyms.map(word => word.toLowerCase()),inputString)){
        //case 2
        if(disasterLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactSize = 10;
        } 
        if(disasterLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactSize = 20;
        } 
        if(disasterLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactSize = 30;
        } 
        if(disasterLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactSize = 25;
        }
        if(disasterLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactSize = 100;
        }
        if(disasterLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactSize = 20;
        }
        if(disasterLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactSize = 50;
        }
        if(disasterLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactSize = 30;
        }
        return impactSize;
    } else if(findSize(tooManySynonyms.map(word => word.toLowerCase()),inputString)){
        //case 4
        if(disasterLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactSize = 30;
        } 
        if(disasterLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactSize = 60;
        } 
        if(disasterLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactSize = 100;
        } 
        if(disasterLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactSize = 80;
        }
        if(disasterLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactSize = 1500;
        }
        if(disasterLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactSize = 80;
        }
        if(disasterLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactSize = 200;
        }
        if(disasterLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactSize = 150;
        }
        return impactSize;
    }else if(findSize(manySynonyms.map(word => word.toLowerCase()),inputString)){
        //case 3
        if(disasterLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactSize = 20;
        } 
        if(disasterLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactSize = 50;
        } 
        if(disasterLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactSize = 50;
        } 
        if(disasterLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactSize = 50;
        }
        if(disasterLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactSize = 500;
        }
        if(disasterLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactSize = 30;
        }
        if(disasterLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactSize = 50;
        }
        if(disasterLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactSize = 50;
        }
        return impactSize;
    }
    return impactSize;
  }
}

module.exports = ImpactSizeServiceImpl;

