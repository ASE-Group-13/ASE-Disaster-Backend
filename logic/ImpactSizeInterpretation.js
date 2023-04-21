const veryFewSynonyms = ["very few"]; //case 0
const fewSynonyms = ["few", "not many"]; //case 1
const someSynonyms = ["some", "handful"]; // case 2
const manySynonyms = ["quite", "many", "a lot", "alot"]; //case 3
const tooManySynonyms = ["too many", "everyone"]; //case 4


//check size in a waterfall style
//returns avg number of people impacted
function interpretImpactSize(inputString, disasterLocation) {
    let impactSize = 0;
    if (findSize(veryFewSynonyms.map(word => word.toLowerCase()), inputString.toLowerCase())) {
        //case 0
        if (disasterLocation.includes("apartment")) {
            impactSize = 5;
        }
        if (disasterLocation.includes("building")) {
            impactSize = 15;
        }
        if (disasterLocation.includes("school")) {
            impactSize = 15;
        }
        if (disasterLocation.includes("library")) {
            impactSize = 15;
        }
        if (disasterLocation.includes("stadium")) {
            impactSize = 100;
        }
        if (disasterLocation.includes("restaurant")) {
            impactSize = 10;
        }
        if (disasterLocation.includes("park")) {
            impactSize = 15;
        }
        if (disasterLocation.includes("hotel")) {
            impactSize = 15;
        }
        return impactSize;
    } else if (findSize(fewSynonyms.map(word => word.toLowerCase()), inputString)) {
        //case 1
        if (disasterLocation.includes("apartment")) {
            impactSize = 10;
        }
        if (disasterLocation.includes("building")) {
            impactSize = 25;
        }
        if (disasterLocation.includes("school")) {
            impactSize = 25;
        }
        if (disasterLocation.includes("library")) {
            impactSize = 25;
        }
        if (disasterLocation.includes("stadium")) {
            impactSize = 150;
        }
        if (disasterLocation.includes("restaurant")) {
            impactSize = 20;
        }
        if (disasterLocation.includes("park")) {
            impactSize = 25;
        }
        if (disasterLocation.includes("hotel")) {
            impactSize = 25;
        }
        return impactSize;
    } else if (findSize(someSynonyms.map(word => word.toLowerCase()), inputString)) {
        //case 2
        if (disasterLocation.includes("apartment")) {
            impactSize = 15;
        }
        if (disasterLocation.includes("building")) {
            impactSize = 30;
        }
        if (disasterLocation.includes("school")) {
            impactSize = 30;
        }
        if (disasterLocation.includes("library")) {
            impactSize = 30;
        }
        if (disasterLocation.includes("stadium")) {
            impactSize = 250;
        }
        if (disasterLocation.includes("restaurant")) {
            impactSize = 25;
        }
        if (disasterLocation.includes("park")) {
            impactSize = 30;
        }
        if (disasterLocation.includes("hotel")) {
            impactSize = 30;
        }
        return impactSize;
    } else if (findSize(tooManySynonyms.map(word => word.toLowerCase()), inputString)) {
        //case 4
        if (disasterLocation.includes("apartment")) {
            impactSize = 25;
        }
        if (disasterLocation.includes("building")) {
            impactSize = 75;
        }
        if (disasterLocation.includes("school")) {
            impactSize = 75;
        }
        if (disasterLocation.includes("library")) {
            impactSize = 75;
        }
        if (disasterLocation.includes("stadium")) {
            impactSize = 500;
        }
        if (disasterLocation.includes("restaurant")) {
            impactSize = 50;
        }
        if (disasterLocation.includes("park")) {
            impactSize = 75;
        }
        if (disasterLocation.includes("hotel")) {
            impactSize = 75;
        }
        return impactSize;
    } else if (findSize(manySynonyms.map(word => word.toLowerCase()), inputString)) {
        //case 3
        if (disasterLocation.includes("apartment")) {
            impactSize = 30;
        }
        if (disasterLocation.includes("building")) {
            impactSize = 100;
        }
        if (disasterLocation.includes("school")) {
            impactSize = 100;
        }
        if (disasterLocation.includes("library")) {
            impactSize = 100;
        }
        if (disasterLocation.includes("stadium")) {
            impactSize = 1500;
        }
        if (disasterLocation.includes("restaurant")) {
            impactSize = 75;
        }
        if (disasterLocation.includes("park")) {
            impactSize = 100;
        }
        if (disasterLocation.includes("hotel")) {
            impactSize = 100;
        }
        return impactSize;
    } else {
        //default -> case 0
        if (disasterLocation.includes("apartment")) {
            impactSize = 5;
        }
        if (disasterLocation.includes("building")) {
            impactSize = 15;
        }
        if (disasterLocation.includes("school")) {
            impactSize = 15;
        }
        if (disasterLocation.includes("library")) {
            impactSize = 15;
        }
        if (disasterLocation.includes("stadium")) {
            impactSize = 100;
        }
        if (disasterLocation.includes("restaurant")) {
            impactSize = 10;
        }
        if (disasterLocation.includes("park")) {
            impactSize = 15;
        }
        if (disasterLocation.includes("hotel")) {
            impactSize = 15;
        }
        return impactSize;
    }
}

function findSize(listObject, inputString) {
    for (const word of listObject) {
        if (inputString.includes(word)) {
            return true;
        }
    }
}

module.exports = {
    interpretImpactSize: interpretImpactSize
};
