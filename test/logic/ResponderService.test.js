const axios = require('axios');
const { resetCapacity, getLocations, sendOrder } = require('../../logic/ResponderService');

jest.mock('axios');

describe('resetCapacity', () => {
  it('should resolve with success message', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Success!' } });
    const result = await resetCapacity({});
    expect(result).toEqual('Success!');
  });

  it('should reject with error message if error response is received', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Error!' } } });
    await expect(resetCapacity({})).rejects.toEqual({ error: 'Error!' });
  });

  it('should reject with error message if no response is received from server', async () => {
    axios.post.mockRejectedValue({ request: {} });
    await expect(resetCapacity({})).rejects.toEqual({ error: 'No response received from the server' });
  });

  it('should reject with error message if there is an unknown error', async () => {
    axios.post.mockRejectedValue(new Error('Unknown error'));
    await expect(resetCapacity({})).rejects.toEqual({ error: 'Unknown error' });
  });
});

describe('getLocations', () => {
  it('should return location data', async () => {
    axios.get.mockResolvedValue({ data: 'Location data' });
    const result = await getLocations();
    expect(result).toEqual('Location data');
  });
});

describe('sendOrder', () => {
  it('should return success message if order is sent successfully', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Success!' } });
    const result = await sendOrder({});
    expect(result).toEqual('Success!');
  });

  it('should return error message if there is an error sending order', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Error!' } } });
    const result = await sendOrder({});
    expect(result).toEqual({ error: 'Error!' });
  });

  it('should return error message if no response is received from server', async () => {
    axios.post.mockRejectedValue({ request: {} });
    const result = await sendOrder({});
    expect(result).toEqual({ error: 'No response received from the server' });
  });

  it('should return error message if there is an unknown error', async () => {
    axios.post.mockRejectedValue(new Error('Unknown error'));
    const result = await sendOrder({});
    expect(result).toEqual({ error: 'Unknown error' });
  });
});
