const disasterTypes = ["Fire", "Flood", "Explosion", "Chemical Hazard", "Terrorist Activity"]

//check disaster interatively from a unique set of disaster types
//returns a list
function interpretDisaster(inputString){
    // const inputString = inputString.string.toLowerCase();
    const foundDisasters  = searchWord(disasterTypes.map(word => word.toLowerCase()),inputString.toLowerCase());
    return foundDisasters;
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

module.exports = {
    interpretDisaster: interpretDisaster
};