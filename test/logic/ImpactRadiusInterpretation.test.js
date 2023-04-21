const { interpretDisasterLocation, interpretDisasterRadius, interpretDisasterType,
  getLocationCategory,
  getDisasterCategory,
  calculateImpactRadius } = require('../../logic/ImpactRadiusInterpretation');

describe('interpretDisasterLocation', () => {
  test('returns an array of matching locations from input string', () => {
    const inputString = 'There was a fire at the library';
    const expectedOutput = 'library';
    expect(interpretDisasterLocation(inputString)).toEqual(expectedOutput);
  });

  test('returns an empty array if no locations are found', () => {
    const inputString = 'There was a fire';
    const expectedOutput = "building";
    expect(interpretDisasterLocation(inputString)).toEqual(expectedOutput);
  });

  test('returns the first found location if multiple locations are in the input string', () => {
    const inputString = 'There was a fire at the library and the school';
    const expectedOutput = 'library';
    expect(interpretDisasterLocation(inputString)).toEqual(expectedOutput);
  });
});

describe('interpretDisasterRadius', () => {
  test('returns the impact radius for a given disaster type and location', () => {
    const disasterType = 'fire';
    const impactLocation = 'school';
    const expectedOutput = 50;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });

  test('returns default radius value if disaster type is not recognized', () => {
    const disasterType = 'earthquake';
    const impactLocation = 'apartment';
    const expectedOutput = 100;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });

  test('returns default radius value if location is not recognized', () => {
    const disasterType = 'flood';
    const impactLocation = 'museum';
    const expectedOutput = 50;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });

  test('returns the correct impact radius for a category 1 location and disaster type', () => {
    const disasterType = 'fire';
    const impactLocation = 'restaurant';
    const expectedOutput = 50;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });

  test('returns the correct impact radius for a category 2 location and disaster type', () => {
    const disasterType = 'tornado';
    const impactLocation = 'stadium';
    const expectedOutput = 200;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });

  test('returns the correct impact radius for a category 3 location and disaster type', () => {
    const disasterType = 'chemical hazard';
    const impactLocation = 'power plant';
    const expectedOutput = 500;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });

  test('returns the default radius value if disaster type is not recognized and location is not recognized', () => {
    const disasterType = 'unknown';
    const impactLocation = 'unknown';
    const expectedOutput = 0;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });

  test('returns the correct impact radius for a recognized disaster type and unrecognized location', () => {
    const disasterType = 'wildfire';
    const impactLocation = 'unknown';
    const expectedOutput = 0;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });

  test('returns the correct impact radius for an unrecognized disaster type and recognized location', () => {
    const disasterType = 'unknown';
    const impactLocation = 'bridge';
    const expectedOutput = 0;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });
});

// describe('interpretDisasterType', () => {
//   test('returns a matching disaster type from input string', () => {
//     const inputString = 'There was a fire at the library';
//     const expectedOutput = 'fire';
//     expect(interpretDisasterType(inputString)).toEqual(expectedOutput);
//   });

//   test('returns an empty string if no disaster types are found', () => {
//     const inputString = 'There was an incident at the library';
//     const expectedOutput = '';
//     expect(interpretDisasterType(inputString)).toEqual(expectedOutput);
//   });
// });

// // Add the getLocationCategory and getDisasterCategory tests from the previous answer here

// describe('calculateImpactRadius', () => {
//   test('returns the correct impact radius for a category 1 disaster and category 1 location', () => {
//     const disasterCategory = 1;
//     const locationCategory = 1;
//     const expectedOutput = 50;
//     expect(calculateImpactRadius(disasterCategory, locationCategory)).toEqual(expectedOutput);
//   });

//   test('returns the correct impact radius for a category 2 disaster and category 2 location', () => {
//     const disasterCategory = 2;
//     const locationCategory = 2;
//     const expectedOutput = 200;
//     expect(calculateImpactRadius(disasterCategory, locationCategory)).toEqual(expectedOutput);
//   });

//   test('returns the correct impact radius for a category 3 disaster and category 3 location', () => {
//     const disasterCategory = 3;
//     const locationCategory = 3;
//     const expectedOutput = 500;
//     expect(calculateImpactRadius(disasterCategory, locationCategory)).toEqual(expectedOutput);
//   });

//   test('returns 0 for an unrecognized disaster category and unrecognized location category', () => {
//     const disasterCategory = 0;
//     const locationCategory = 0;
//     const expectedOutput = 0;
//     expect(calculateImpactRadius(disasterCategory, locationCategory)).toEqual(expectedOutput);
//   });

//   test('returns 0 for a recognized disaster category and unrecognized location category', () => {
//     const disasterCategory = 1;
//     const locationCategory = 0;
//     const expectedOutput = 0;
//     expect(calculateImpactRadius(disasterCategory, locationCategory)).toEqual(expectedOutput);
//   });

//   test('returns 0 for an unrecognized disaster category and a recognized location category', () => {
//     const disasterCategory = 0;
//     const locationCategory = 1;
//     const expectedOutput = 0;
//     expect(calculateImpactRadius(disasterCategory, locationCategory)).toEqual(expectedOutput);
//   });
// });
