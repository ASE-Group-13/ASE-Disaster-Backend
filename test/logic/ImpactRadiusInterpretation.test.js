const { interpretDisasterLocation, interpretDisasterRadius } = require('./yourFileName');

describe('interpretDisasterLocation function', () => {
  test('should return an empty array when input string has no disaster locations', () => {
    expect(interpretDisasterLocation('This is a random text')).toEqual([]);
  });

  test('should return a list of all matching disaster locations', () => {
    expect(interpretDisasterLocation('The explosion happened in a building')).toEqual(['building']);
    expect(interpretDisasterLocation('A fire broke out in a hotel and a restaurant')).toEqual(['hotel', 'restaurant']);
  });

  test('should be case-insensitive', () => {
    expect(interpretDisasterLocation('Flood reported in SCHOOL')).toEqual(['school']);
    expect(interpretDisasterLocation('The chemical hazard occurred in a LIBRARY')).toEqual(['library']);
  });

  test('should handle multiple occurrences of the same disaster location', () => {
    expect(interpretDisasterLocation('The park was flooded and then the stadium was flooded too')).toEqual(['park', 'stadium']);
  });
});

describe('interpretDisasterRadius function', () => {
  test('should return 0 when disaster type is not recognized', () => {
    expect(interpretDisasterRadius('Unknown', 'apartment')).toEqual(0);
  });

  test('should return correct impact radius for a given disaster type and location', () => {
    expect(interpretDisasterRadius('Fire', 'apartment')).toEqual(500);
    expect(interpretDisasterRadius('Fire', 'stadium')).toEqual(1000);
    expect(interpretDisasterRadius('Explosion', 'library')).toEqual(500);
    expect(interpretDisasterRadius('Flood', 'building')).toEqual(500);
    expect(interpretDisasterRadius('Chemical Hazard', 'restaurant')).toEqual(500);
    expect(interpretDisasterRadius('Terrorist Activity', 'park')).toEqual(500);
  });

  test('should be case-insensitive', () => {
    expect(interpretDisasterRadius('FLOOD', 'school')).toEqual(500);
    expect(interpretDisasterRadius('TERRORIST ACTIVITY', 'hotel')).toEqual(500);
  });

  test('should handle synonyms for disaster locations', () => {
    expect(interpretDisasterRadius('Explosion', 'college')).toEqual(0);
    expect(interpretDisasterRadius('Explosion', 'office building')).toEqual(1000);
    expect(interpretDisasterRadius('Flood', 'mall')).toEqual(0);
    expect(interpretDisasterRadius('Flood', 'supermarket')).toEqual(500);
  });
});
