const disasterTypes = ['flood',
    'explosion',
    'chemical hazard',
    'terrorist activity',
    'fire',
    'tornado',
    'earthquake',
    'hurricane',
    'accident',
    'traffic accident',
    'collapse',
    'wildfire']

//check disaster interatively from a unique set of disaster types
//returns a list
function interpretDisaster(inputString) {
    const foundDisasters = searchWord(disasterTypes.map(word => word.toLowerCase()), inputString.toLowerCase());
    return foundDisasters;
}

function searchWord(listObject, inputString) {
    let foundWords = [];
    for (const word of listObject) {
        if (inputString.includes(word)) {
            foundWords.push(word);
            inputString = inputString.replace(new RegExp(`\\b${word}\\b`, 'gi'), '');
        }
    }
    return foundWords;
}

module.exports = {
    interpretDisaster: interpretDisaster
};
