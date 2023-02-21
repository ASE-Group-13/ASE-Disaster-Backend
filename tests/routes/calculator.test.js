const mathOperations = require('../../routes/calculator.js');

describe("Calculator tests", () => {
  test('adding 1 + 2 should return 3', () => {
    expect(mathOperations.sum(1, 2)).toBe(3);
  });
 })