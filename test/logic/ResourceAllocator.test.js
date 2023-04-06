const { trainModel, allocateResources } = require('../../logic/ResourceAllocator');

  test('should return true', () => {
    const result = trainModel();
    expect(result).toBe(true);
  });

  test('should return false for non-spam message', () => {
    const description = ['3','4',2000,750]; 
    const result = allocateResources(description);
    expect(result).toMatchObject({"radius": 2000,"site": "stadium","size": 750,"type": "Fire","ambulance": 22, "bus": 8, "fire": 9, "helicopter": 2, "police": 50});
  });