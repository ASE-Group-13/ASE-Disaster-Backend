const axios = require('axios');
const {assignToDisaster, addReportToDisaster} = require('../../logic/DisasterAssignment');

jest.mock('axios');

// describe('addReportToDisaster', () => {
//   it('sends a post request to add a report to a disaster', async () => {
//     const disasterId = '641a169827bf7f62579d2548';
//     const report = { _id: '641a3204b7523d9253796a54' };
//     axios.post.mockResolvedValue({ data: 'Success' });
//     await addReportToDisaster(disasterId, report);
//     expect(axios.post).toHaveBeenCalledWith(
//       `http://127.0.0.1:8000/api/v1/add-report-to-disaster/${disasterId}`,
//       { reportId: report._id },
//       { headers: { 'Content-Type': 'application/json' } }
//     );
//   });
// });

describe('assignToDisaster', () => {
  it('calls createDisaster if no existing disasters within 500m', async () => {
    const report = { latitude: 1.2345, longitude: 6.7890, type: 'fire', _id: '641a3204b7523d9253796a54' };
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({ data: { saveData: { _id: '641a169827bf7f62579d2548' } } });
    await assignToDisaster(report);
    expect(axios.post).toHaveBeenCalledWith(
      'http://127.0.0.1:8000/api/v1/add-Disaster-Data',
      { latitude: report.latitude, longitude: report.longitude, title: report.type, type: report.type, status: 'pending' },
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('calls addReportToDisaster with existing disaster id', async () => {
    const report = { latitude: 1.2345, longitude: 6.7890, type: 'fire', _id: '641a3204b7523d9253796a54' };
    const disaster = { _id: '641a169827bf7f62579d2548' };
    axios.get.mockResolvedValue({ data: [disaster] });
    axios.post.mockResolvedValue({ data: { saveData: { _id: '641a169827bf7f62579d2548' } } });
    await assignToDisaster(report);
    expect(axios.post).toHaveBeenCalledWith(
      `http://127.0.0.1:8000/api/v1/add-report-to-disaster/${disaster._id}`,
      { reportId: report._id },
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('returns the report with disaster id', async () => {
    const report = { latitude: 1.2345, longitude: 6.7890, type: 'fire', _id: '641a3204b7523d9253796a54' };
    const disaster = { _id: '641a169827bf7f62579d2548' };
    axios.get.mockResolvedValue({ data: [disaster] });
    axios.post.mockResolvedValue({ data: { saveData: { _id: '641a169827bf7f62579d2548' } } });
    const result = await assignToDisaster(report);
    expect(result).toEqual({ ...report, disaster: disaster._id });
  });
});
