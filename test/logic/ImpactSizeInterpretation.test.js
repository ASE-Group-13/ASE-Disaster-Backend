const { interpretImpactSize } = require('../../logic/ImpactSizeInterpretation');

describe("interpretImpactSize function", () => {
  test("returns the correct impact size for very few synonyms and a building location", () => {
    const inputString = "There were very few casualties.";
    const disasterLocation = "building";
    const expectedOutput = 15;
    expect(interpretImpactSize(inputString, disasterLocation)).toEqual(expectedOutput);
  });

  test("returns the correct impact size for few synonyms and a school location", () => {
    const inputString = "There were not many injuries.";
    const disasterLocation = "school";
    const expectedOutput = 25;
    expect(interpretImpactSize(inputString, disasterLocation)).toEqual(expectedOutput);
  });

  test("returns the correct impact size for some synonyms and a stadium location", () => {
    const inputString = "There were some people hurt at the stadium.";
    const disasterLocation = "stadium";
    const expectedOutput = 250;
    expect(interpretImpactSize(inputString, disasterLocation)).toEqual(expectedOutput);
  });

  test("returns the correct impact size for many synonyms and a park location", () => {
    const inputString = "There were quite a lot of injuries in the park.";
    const disasterLocation = "park";
    const expectedOutput = 100;
    expect(interpretImpactSize(inputString, disasterLocation)).toEqual(expectedOutput);
  });

  test("returns the correct impact size for too many synonyms and a hotel location", () => {
    const inputString = "too many was affected by the disaster.";
    const disasterLocation = "hotel";
    const expectedOutput = 75;
    expect(interpretImpactSize(inputString, disasterLocation)).toEqual(expectedOutput);
  });
});
