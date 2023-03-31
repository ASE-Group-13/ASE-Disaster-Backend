const { createOrder, getOptimalRoutes } = require('../../logic/OrderCreation');
const {calculateDurations} = require("../../logic/Mapbox");

describe('getOptimalRoutes', () => {
  const locations = [
    {
      id: 'Location A',
      coordinates: [-73.9857, 40.7484],
      duration: 965.275,
      resource: 'Fire',
      capacity: 2
    },
    {
      id: 'Location B',
      coordinates: [-74.006, 40.7128],
      duration: 972.99,
      resource: 'Hospital',
      capacity: 10
    },
    {
      id: 'Location C',
      coordinates: [-73.9814, 40.7648],
      duration: 1249.381,
      resource: 'Garda',
      capacity: 20
    }
  ];

  test('should return an object with orderLocations key', () => {
    const resource = 'Fire';
    const requiredQuantity = 2;
    const result = getOptimalRoutes(locations, resource, requiredQuantity);
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('orderLocations');
  });

  test('should return an object with message key when there is not enough capacity', () => {
    const resource = 'Fire';
    const requiredQuantity = 3;
    const result = getOptimalRoutes(locations, resource, requiredQuantity);
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('message');
  });

  test('should return an object with orderLocations key and no message key when there is enough capacity', () => {
    const resource = 'Hospital';
    const requiredQuantity = 10;
    const result = getOptimalRoutes(locations, resource, requiredQuantity);
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('orderLocations');
    expect(result).not.toHaveProperty('message');
  });
});

describe('createOrder', () => {
  const startingLocations = [
    {
      id: 'Location A',
      coordinates: [-73.9857, 40.7484],
      resource: 'Fire',
      capacity: 2
    },
    {
      id: 'Location B',
      coordinates: [-74.006, 40.7128],
      resource: 'Hospital',
      capacity: 10
    },
    {
      id: 'Location C',
      coordinates: [-73.9814, 40.7648],
      resource: 'Garda',
      capacity: 20
    }
  ];

  const destinationLocation = {
    id: 'Destination',
    coordinates: [-74.0051, 40.7159]
  };

  test('should return an array of objects', async () => {
    const resource = 'Fire';
    const requiredQuantity = 2;
    const orders = await createOrder(startingLocations, destinationLocation, resource, requiredQuantity);
    expect(Array.isArray(orders.orderLocations)).toBe(true);
    expect(typeof orders).toBe('object');
  });

  test('should return an array with correct keys in objects', async () => {
    const resource = 'Hospital';
    const requiredQuantity = 10;
    const orders = await createOrder(startingLocations, destinationLocation, resource, requiredQuantity);
    expect(orders).toEqual(expect.objectContaining({
        orderLocations: expect.arrayContaining([
          expect.objectContaining({
            location: expect.any(Object),
            quantity: expect.any(Number)
          })
        ])
    }));
  });
});
