const { interpretDisaster } = require('../../logic/DisasterInterpretation');

describe('interpretDisaster function', () => {
  test('should return an empty array when input string has no disaster types', () => {
    expect(interpretDisaster('This is a random text')).toEqual([]);
  });

  test('should return a list of all matching disaster types', () => {
    expect(interpretDisaster('There was a flood and then an explosion')).toEqual(['flood', 'explosion']);
    expect(interpretDisaster('There was a fire and a chemical hazard')).toEqual(['chemical hazard', 'fire']);
  });

  test('should be case-insensitive', () => {
    expect(interpretDisaster('TERRORIST ACTIVITY reported')).toEqual(['terrorist activity']);
    expect(interpretDisaster('Explosion in progress')).toEqual(['explosion']);
  });
});
