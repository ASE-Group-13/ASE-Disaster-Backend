const {siteEnum, getSiteNumber, typeEnum, getTypeNumber} = require("../../models/enumData");

describe('getSiteNumber', () => {
  test('returns the correct index for a valid site', () => {
    const site = 'office';
    const expectedIndex = siteEnum.indexOf(site);
    const actualIndex = getSiteNumber(site);
    expect(actualIndex).toBe(expectedIndex);
  });

  test('returns null for an invalid site', () => {
    const site = 'invalid';
    const expectedIndex = 0;
    const actualIndex = getSiteNumber(site);
    expect(actualIndex).toBe(expectedIndex);
  });

  test('returns null for a null input', () => {
    const site = null;
    const expectedIndex = 0;
    const actualIndex = getSiteNumber(site);
    expect(actualIndex).toBe(expectedIndex);
  });

  test('returns null for an undefined input', () => {
    const site = undefined;
    const expectedIndex = 0;
    const actualIndex = getSiteNumber(site);
    expect(actualIndex).toBe(expectedIndex);
  });

  test('returns the correct index for a site with leading/trailing whitespace', () => {
    const site = ' office ';
    const expectedIndex = siteEnum.indexOf('office');
    const actualIndex = getSiteNumber(site);
    expect(actualIndex).toBe(expectedIndex);
  });
});

describe('getTypeNumber', () => {
  test('returns the correct index for a valid type', () => {
    const type = 'Fire';
    const expectedIndex = typeEnum.indexOf(type);
    const actualIndex = getTypeNumber(type);
    expect(actualIndex).toBe(expectedIndex);
  });

  test('returns null for an invalid type', () => {
    const type = 'invalid';
    const expectedIndex = null;
    const actualIndex = getTypeNumber(type);
    expect(actualIndex).toBe(expectedIndex);
  });

  test('returns null for a null input', () => {
    const type = null;
    const expectedIndex = null;
    const actualIndex = getTypeNumber(type);
    expect(actualIndex).toBe(expectedIndex);
  });

  test('returns null for an undefined input', () => {
    const type = undefined;
    const expectedIndex = null;
    const actualIndex = getTypeNumber(type);
    expect(actualIndex).toBe(expectedIndex);
  });

  test('returns the correct index for a type with leading/trailing whitespace', () => {
    const type = ' Fire ';
    const expectedIndex = typeEnum.indexOf('Fire');
    const actualIndex = getTypeNumber(type);
    expect(actualIndex).toBe(expectedIndex);
  });
});
