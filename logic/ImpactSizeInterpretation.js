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
            impactSize = 15;
        } 
        if(disasterLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactSize = 15;
        } 
        if(disasterLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactSize = 15;
        }
        if(disasterLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactSize = 100;
        }
        if(disasterLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactSize = 10;
        }
        if(disasterLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactSize = 15;
        }
        if(disasterLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactSize = 15;
        }
        return impactSize;
    }else if(findSize(fewSynonyms.map(word => word.toLowerCase()),inputString)){
        //case 1
        if(disasterLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactSize = 10;
        } 
        if(disasterLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactSize = 25;
        } 
        if(disasterLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactSize = 25;
        } 
        if(disasterLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactSize = 25;
        }
        if(disasterLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactSize = 150;
        }
        if(disasterLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactSize = 20;
        }
        if(disasterLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactSize = 25;
        }
        if(disasterLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactSize = 25;
        }
        return impactSize;
    }else if(findSize(someSynonyms.map(word => word.toLowerCase()),inputString)){
        //case 2
        if(disasterLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactSize = 15;
        } 
        if(disasterLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactSize = 30;
        } 
        if(disasterLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactSize = 30;
        } 
        if(disasterLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactSize = 30;
        }
        if(disasterLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactSize = 250;
        }
        if(disasterLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactSize = 25;
        }
        if(disasterLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactSize = 30;
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
            impactSize = 25;
        } 
        if(disasterLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactSize = 75;
        } 
        if(disasterLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactSize = 75;
        } 
        if(disasterLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactSize = 75;
        }
        if(disasterLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactSize = 500;
        }
        if(disasterLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactSize = 50;
        }
        if(disasterLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactSize = 75;
        }
        if(disasterLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactSize = 75;
        }
        return impactSize;
    }else if(findSize(manySynonyms.map(word => word.toLowerCase()),inputString)){
        //case 3
        if(disasterLocation.includes("apartment")){ 
            //make this more generic , add synonyms
            impactSize = 30;
        } 
        if(disasterLocation.includes("building")){ 
            //make this more generic , add synonyms
            impactSize = 100;
        } 
        if(disasterLocation.includes("school")){ 
            //make this more generic , add synonyms
            impactSize = 100;
        } 
        if(disasterLocation.includes("library")){ 
            //make this more generic , add synonyms
            impactSize = 100;
        }
        if(disasterLocation.includes("stadium")){ 
            //make this more generic , add synonyms
            impactSize = 1500;
        }
        if(disasterLocation.includes("restaurant")){ 
            //make this more generic , add synonyms
            impactSize = 75;
        }
        if(disasterLocation.includes("park")){ 
            //make this more generic , add synonyms
            impactSize = 100;
        }
        if(disasterLocation.includes("hotel")){ 
            //make this more generic , add synonyms
            impactSize = 100;
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
