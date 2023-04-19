const { processOldReports } = require('../../logic/SpamFeedback');
const axios = require('axios');
const fs = require('fs');
jest.mock('fs');
jest.mock('axios');

describe('processOldReports function', () => {
  it('should update spam reports, get old reports, convert them to CSV and delete them from the database', async () => {
    const mockedPut = axios.put.mockResolvedValue({});
    const mockedGet = axios.get.mockResolvedValue({
      data: [{
        detail: 'Report 1',
        spam: false
      }, {
        detail: 'Report 2',
        spam: true
      }]
    });
    const mockedDelete = axios.delete.mockResolvedValue({});
    const mockedAppendFile = jest.spyOn(fs, 'appendFile').mockImplementation((path, data, callback) => {
      callback(null);
    });

    const result = await processOldReports();

    expect(mockedPut).toHaveBeenCalledWith('http://127.0.0.1:8000/api/v1/update-spam');
    expect(mockedGet).toHaveBeenCalledWith('http://127.0.0.1:8000/api/v1/get-old-reports');
    expect(mockedDelete).toHaveBeenCalledWith('http://127.0.0.1:8000/api/v1/delete-old-reports');
    expect(mockedAppendFile).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
