const { createOrder, createEvacuation, saveCsvData, setEvacuation, setOrder, checkRequest } = require('../../logic/OrderCreation');

describe('createOrder', () => {
  const startingLocations = [
    {
      id: 'Location A',
      coordinates: [-73.9857, 40.7484],
      resource: 'Fire',
      capacity: 2,
      duration: 20
    },
    {
      id: 'Location B',
      coordinates: [-74.006, 40.7128],
      resource: 'Hospital',
      capacity: 10,
      duration: 10
    },
    {
      id: 'Location C',
      coordinates: [-73.9814, 40.7648],
      resource: 'Garda',
      capacity: 20,
      duration: 12
    }
  ];

  test('should return an array of objects', async () => {
    const resource = 'Fire';
    const requiredQuantity = 2;
    const orders = await createOrder(startingLocations, resource, requiredQuantity);
    expect(Array.isArray(orders.orderLocations)).toBe(true);
    expect(typeof orders).toBe('object');
  });

  test('should return an array with correct keys in objects', async () => {
    const resource = 'Hospital';
    const requiredQuantity = 10;
    const orders = await createOrder(startingLocations, resource, requiredQuantity);
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

describe('createEvacuation', () => {
  const locations = [
    { id: 1, resource: 'bus', capacity: 100, duration: 5 },
    { id: 2, resource: 'rest center', capacity: 50, duration: 3 },
    { id: 3, resource: 'bus', capacity: 200, duration: 10 },
    { id: 4, resource: 'rest center', capacity: 25, duration: 4 },
  ];
  const impact = 75;

  test('should return an array', () => {
    const result = createEvacuation(locations, impact);
    expect(Array.isArray(result)).toBe(true);
  });

  test('should allocate buses and rest centers', () => {
    const result = createEvacuation(locations, impact);
    console.log(result);
    expect(result).toEqual(    [
      {
        restCentre: { id: 2, resource: 'rest center', capacity: 50, duration: 3 },
        quantity: 50,
        busDepot: { id: 1, resource: 'bus', capacity: 96, duration: 5 },
        sentBuses: 2
      },
      {
        restCentre: { id: 4, resource: 'rest center', capacity: 25, duration: 4 },
        quantity: 25,
        busDepot: { id: 1, resource: 'bus', capacity: 96, duration: 5 },
        sentBuses: 1
      }
    ]);
  });

  test('should handle insufficient capacity', () => {
    const insufficientLocations = [
      { id: 1, resource: 'bus', capacity: 0, duration: 5 },
      { id: 2, resource: 'rest center', capacity: 0, duration: 3 },
    ];
    const result = createEvacuation(insufficientLocations, impact);
    expect(result.orders).toEqual([]);
  });

  test('should handle impact zero or negative', () => {
    const zeroImpact = 0;
    const negativeImpact = -500;
    const resultZero = createEvacuation(locations, zeroImpact);
    const resultNegative = createEvacuation(locations, negativeImpact);
    expect(resultZero.orders).toEqual([]);
    expect(resultNegative.orders).toEqual([]);
  });
});

const fs = require('fs');
const path = require('path');

describe('saveCsvData', () => {
  const filePath = path.join(__dirname, 'test.csv');

  test('should save CSV data to file with correct inputs', async () => {
    const site = 1;
    const type = 2;
    const radius = 3;
    const size = 4;
    const ambulance = 5;
    const police = 6;
    const fire = 7;
    const bus = 8;
    const heli = 9;

    await saveCsvData(site, type, radius, size, ambulance, police, fire, bus, heli, 'test.csv');

    const expectedCsv = `\n${site},${type},${radius},${size},${ambulance},${police},${fire},${bus},${heli}`;

    const actualCsv = fs.readFileSync(filePath, 'utf8');

    expect(actualCsv).toContain(expectedCsv);
  });

  test('should not save CSV data to file with incorrect inputs', async () => {
    const site = '1';
    const type = 2;
    const radius = 3;
    const size = 4;
    const ambulance = 5;
    const police = 6;
    const fire = 7;
    const bus = 8;
    const heli = 9;

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await saveCsvData(site, type, radius, size, ambulance, police, fire, bus, heli, 'test.csv');

    expect(consoleSpy).toHaveBeenCalledWith('Incorrect inputs.');
    expect(fs.existsSync(filePath)).toBe(false);

    consoleSpy.mockRestore();
  });
});
