const schedule = require('node-schedule');
const { processOldReports } = require('../logic/Scheduler');
const { trainModel } = require('../logic/SpamFilter');

jest.mock('node-schedule');
jest.mock('../logic/Scheduler');
jest.mock('../logic/SpamFilter');

describe('scheduler', () => {
  it('should schedule a daily job', () => {
    const job = {
      schedule: jest.fn(),
    };
    schedule.scheduleJob.mockReturnValueOnce(job);

    require('../index');

    expect(schedule.scheduleJob).toHaveBeenCalledWith(
      { hour: 0 },
      expect.any(Function)
    );
    // expect(job.schedule).toHaveBeenCalled();
  });

  it('should run processOldReports and trainModel', async () => {
    await jobCallback();

    expect(processOldReports).toHaveBeenCalled();
    expect(trainModel).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const error = new Error('something went wrong');
    processOldReports.mockRejectedValueOnce(error);
    trainModel.mockRejectedValueOnce(error);
    console.error = jest.fn();

    await jobCallback();

    expect(console.error).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith(`Error running processOldReports: ${error.message}`);
    expect(console.error).toHaveBeenCalledWith(`Error running spam predictor trainModel: ${error.message}`);
  });
});

async function jobCallback() {
  const [, callback] = schedule.scheduleJob.mock.calls[0];
  await callback();
}