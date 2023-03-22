const { trainModel, allocateResources } = require('../../logic/ResourceAllocator');

  test('should return true', () => {
    const result = trainModel();
    expect(result).toBe(true);
  });

  test('should return false for non-spam message', () => {
    const description = ['3','4',2000,750]; 
    const result = allocateResources(description);
    expect(result).toMatchObject([ 2, 5, 2, 1, 0 ]);
  });