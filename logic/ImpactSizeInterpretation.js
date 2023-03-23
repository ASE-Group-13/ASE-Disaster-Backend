const veryFewSynonyms = ["very few"]; //case 0
const fewSynonyms = ["few" , "not many"]; //case 1
const someSynonyms = ["some", "handful"]; // case 2
const manySynonyms = ["quite", "many", "a lot", "alot"]; //case 3
const tooManySynonyms = ["too many", "everyone"]; //case 4


//check size in a waterfall style
//returns avg number of people impacted
function interpretImpactSize(inputString, disasterLocation){
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
    }else if(findSize(tooManySynonyms.map(word => word.toLowerCase()),inputString)){
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
    }
    return impactSize;
}

function findSize(listObject, inputString){
    let foundWords = [];
    for (const word of listObject) {
        if(inputString.includes(word)) {
            return true;
        }
    }
}

module.exports = {
    interpretImpactSize: interpretImpactSize
};

// const sizeMap = [
//     { synonyms: ["very few"], impactSize: 5 },
//     { synonyms: ["few", "not many"], impactSize: 10 },
//     { synonyms: ["some", "handful"], impactSize: 20 },
//     { synonyms: ["quite", "many", "a lot", "alot"], impactSize: 50 },
//     { synonyms: ["too many", "everyone"], impactSize: 100 }
//   ];
  
//   const defaultImpactSize = 20;
  
//   function interpretImpactSize(inputString, disasterLocation) {
//     const size = findSize(inputString);
//     const location = findLocation(disasterLocation);
  
//     if (size === undefined || location === undefined) {
//       return defaultImpactSize;
//     }
  
//     return location.impactSizes[size.impactSizeIndex];
//   }
  
//   function findSize(inputString) {
//     const inputStringLower = inputString.toLowerCase();
  
//     for (let i = 0; i < sizeMap.length; i++) {
//       const synonyms = sizeMap[i].synonyms;
//       const synonymsLower = synonyms.map(word => word.toLowerCase());
  
//       if (synonymsLower.some(word => inputStringLower.includes(word))) {
//         return { impactSizeIndex: i };
//       }
//     }
  
//     return undefined;
//   }
  
//   function findLocation(disasterLocation) {
//     const locationMap = [
//       {
//         keywords: ["apartment"],
//         impactSizes: [5, 5, 10, 20, 30]
//       },
//       {
//         keywords: ["building"],
//         impactSizes: [10, 10, 20, 50, 60]
//       },
//       {
//         keywords: ["school"],
//         impactSizes: [5, 10, 30, 50, 100]
//       },
//       {
//         keywords: ["library"],
//         impactSizes: [10, 15, 25, 50, 80]
//       },
//       {
//         keywords: ["stadium"],
//         impactSizes: [20, 50, 100, 500, 1500]
//       },
//       {
//         keywords: ["restaurant"],
//         impactSizes: [10, 20, 20, 30, 80]
//       },
//       {
//         keywords: ["park"],
//         impactSizes: [20, 20, 50, 50, 200]
//       },
//       {
//         keywords: ["hotel"],
//         impactSizes: [10, 20, 30, 50, 150]
//       }
//     ];
  
//     for (let i = 0; i < locationMap.length; i++) {
//       const keywords = locationMap[i].keywords;
//       const impactSizes = locationMap[i].impactSizes;
  
//       if (keywords.some(keyword => disasterLocation.includes(keyword))) {
//         return { impactSizes: impactSizes };
//       }
//     }
  
//     return undefined;
//   }
  
//   module.exports = {
//     interpretImpactSize: interpretImpactSize
//   };
  