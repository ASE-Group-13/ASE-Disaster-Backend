const { trainModel, allocateResources } = require('../../logic/ResourceAllocator');

  test('should return true', () => {
    const result = trainModel();
    expect(result).toBe(true);
  });

  test('should return false for non-spam message', () => {
    const description = ['3','4',2000,750]; 
    const result = allocateResources(description);
    expect(result).toMatchObject({"Ambulance": 27, "Bus": 11, "FireTruck": 10 , "Helicopter": 2});
  });