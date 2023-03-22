const { interpretImpactSize } = require('./interpretImpactSize');

describe('interpretImpactSize', () => {
  it('should return the correct impact size for "very few" in an apartment', () => {
    const inputString = 'There were very few people in the apartment at the time of the disaster.';
    const disasterLocation = 'apartment';
    const expectedImpactSize = 5;
    const actualImpactSize = interpretImpactSize(inputString, disasterLocation);
    expect(actualImpactSize).toEqual(expectedImpactSize);
  });

  it('should return the correct impact size for "few" in a restaurant', () => {
    const inputString = 'There were few customers in the restaurant when the disaster struck.';
    const disasterLocation = 'restaurant';
    const expectedImpactSize = 20;
    const actualImpactSize = interpretImpactSize(inputString, disasterLocation);
    expect(actualImpactSize).toEqual(expectedImpactSize);
  });

  it('should return the correct impact size for "some" in a school', () => {
    const inputString = 'There were some students and teachers in the school at the time of the disaster.';
    const disasterLocation = 'school';
    const expectedImpactSize = 30;
    const actualImpactSize = interpretImpactSize(inputString, disasterLocation);
    expect(actualImpactSize).toEqual(expectedImpactSize);
  });

  it('should return the correct impact size for "many" in a building', () => {
    const inputString = 'There were many people in the building when the disaster occurred.';
    const disasterLocation = 'building';
    const expectedImpactSize = 50;
    const actualImpactSize = interpretImpactSize(inputString, disasterLocation);
    expect(actualImpactSize).toEqual(expectedImpactSize);
  });

  it('should return the correct impact size for "too many" in a stadium', () => {
    const inputString = 'There were too many spectators in the stadium when the disaster happened.';
    const disasterLocation = 'stadium';
    const expectedImpactSize = 1500;
    const actualImpactSize = interpretImpactSize(inputString, disasterLocation);
    expect(actualImpactSize).toEqual(expectedImpactSize);
  });
});
