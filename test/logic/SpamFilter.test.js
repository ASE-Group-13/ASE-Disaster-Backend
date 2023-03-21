const { trainModel, predictMessage } = require('../../logic/SpamFilter');

  test('should return true', () => {
    const result = trainModel();
    expect(result).toBe(true);
  });

  test('should return false for non-spam message', () => {
    const message = 'There is a disaster in the city center';
    const result = predictMessage(message);
    expect(result).toBe(false);
  });

  test('should return true for spam message', () => {
    const message = 'How are you?';
    const result = predictMessage(message);
    expect(result).toBe(true);
  });