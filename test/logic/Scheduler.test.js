const axios = require('axios');
const fs = require('fs');
const path = require('path');

const { processOldReports } = require('../../logic/Scheduler');

jest.mock('axios');
jest.mock('fs');

describe('processOldReports', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update old reports as spam', async () => {
    const oldReports = [      { _id: '1', detail: 'Report 1', spam: false },      { _id: '2', detail: 'Report 2', spam: true },    ];
    axios.put.mockResolvedValue({});
    axios.get.mockResolvedValue({ data: oldReports });
    axios.delete.mockResolvedValue({});

    await processOldReports();

    expect(axios.put).toHaveBeenCalledWith('http://127.0.0.1:8000/api/v1/update-spam');
    expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/v1/get-old-reports');
    expect(axios.delete).toHaveBeenCalledWith('http://127.0.0.1:8000/api/v1/delete-old-reports');

    expect(fs.appendFile).toHaveBeenCalled();
    const csv = 'Report 1,1\nReport 2,0\n';
    const filePath = path.join('C:\\myProjects\\MSc Programming\\CS7CS3_AdvancedSoftwareEngineering\\ASE-Disaster-Backend\\python\\datasets\\pastReports.csv');
    expect(fs.appendFile.mock.calls[0][0]).toEqual(filePath);
    expect(fs.appendFile.mock.calls[0][1]).toEqual(csv);
  });

  it('should handle errors', async () => {
    axios.put.mockRejectedValue(new Error('update error'));
    axios.get.mockRejectedValue(new Error('get error'));
    axios.delete.mockRejectedValue(new Error('delete error'));
    console.error = jest.fn();

    await processOldReports();

    expect(axios.put).toHaveBeenCalledWith('http://127.0.0.1:8000/api/v1/update-spam');
    expect(axios.get).toHaveBeenCalledWith("http://127.0.0.1:8000/api/v1/get-old-reports");
    expect(axios.delete).toHaveBeenCalledWith('http://127.0.0.1:8000/api/v1/delete-old-reports');

    expect(fs.appendFile).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('Error processing old reports: update error');
  });
});
