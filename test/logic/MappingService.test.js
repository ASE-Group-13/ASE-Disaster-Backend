const { calculateDistance, calculateDurations, calculateDuration } = require('../../logic/MappingService');

describe('calculateDistance()', () => {
  test('calculates the straight-line distance between two coordinates', async () => {
    const distance = await calculateDistance(53.288152, -6.139752, 53.292385, -6.142756);
    expect(distance).toBeCloseTo(515, 400); // expect distance to be within 0 meters of 8053 meters
  });
});

describe('calculateDuration', () => {
  test('should return a number', async () => {
    const startCoordinates = { lat: 40.7484, lng: -73.9857 };
    const endCoordinates = { lat: 40.7159, lng: -74.0051 };
    const duration = await calculateDuration(startCoordinates, endCoordinates);
    expect(typeof duration).toBe('number');
  });
});

describe('calculateDurations', () => {
  const startingLocations = [
    {
      name: 'Location A',
      coordinates: { lat: 40.7484, lng: -73.9857 },
      resource: 'Fire',
      capacity: 2
    },
    {
      name: 'Location B',
      coordinates: { lat: 40.7128, lng: -74.006 },
      resource: 'Hospital',
      capacity: 10
    },
    {
      name: 'Location C',
      coordinates: { lat: 40.7648, lng: -73.9814 },
      resource: 'Garda',
      capacity: 20
    }
  ];

  const destinationLocation = {
    name: 'Destination',
    coordinates: { lat: 40.7159, lng: -74.0051 }
  };

  test('should return an array of objects', async () => {
    const durations = await calculateDurations(startingLocations, destinationLocation);
    expect(Array.isArray(durations)).toBe(true);
    expect(typeof durations[0]).toBe('object');
  });

  test('should have correct keys in returned objects', async () => {
    const durations = await calculateDurations(startingLocations, destinationLocation);
    expect(durations[0]).toHaveProperty('_id');
    expect(durations[0]).toHaveProperty('latitude');
    expect(durations[0]).toHaveProperty('longitude');
    expect(durations[0]).toHaveProperty('duration');
    expect(durations[0]).toHaveProperty('name');
    expect(durations[0]).toHaveProperty('resource');
    expect(durations[0]).toHaveProperty('capacity');
  });
});