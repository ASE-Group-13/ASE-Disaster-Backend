const { interpretDisasterLocation, interpretDisasterRadius } = require('../../logic/ImpactRadiusInterpretation');

describe('interpretDisasterLocation', () => {
  test('returns an array of matching locations from input string', () => {
    const inputString = 'There was a fire at the library';
    const expectedOutput = 'library';
    expect(interpretDisasterLocation(inputString)).toEqual(expectedOutput);
  });

  test('returns an empty array if no locations are found', () => {
    const inputString = 'There was a fire';
    const expectedOutput = [];
    expect(interpretDisasterLocation(inputString)).toEqual(expectedOutput);
  });
});

describe('interpretDisasterRadius', () => {
  test('returns the impact radius for a given disaster type and location', () => {
    const disasterType = 'fire';
    const impactLocation = 'school';
    const expectedOutput = 500;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });

  test('returns default radius value if disaster type is not recognized', () => {
    const disasterType = 'earthquake';
    const impactLocation = 'apartment';
    const expectedOutput = 500;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });

  test('returns default radius value if location is not recognized', () => {
    const disasterType = 'flood';
    const impactLocation = 'museum';
    const expectedOutput = 500;
    expect(interpretDisasterRadius(disasterType, impactLocation)).toEqual(expectedOutput);
  });
});
