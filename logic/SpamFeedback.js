// Import required modules and models
const fs = require('fs');
const path = require('path');

// Define a function to process old reports
async function processOldReports() {
  try {
    // Define the time limit for old reports
    const hoursThreshold = 24;
    const cutoffDate = new Date(Date.now() - hoursThreshold * 60 * 60 * 1000);

    // Get all old pending reports and mark them as spam
    console.log('updating spam reports...');
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await ReportData.updateMany(
      { status: "pending", createdAt: { $lte: twentyFourHoursAgo } },
      { $set: { spam: true } }
    );
    console.log("fetching old reports...")
    const response = await ReportData.find({createdAt: { $lte: twentyFourHoursAgo },
      status: { $ne: "closed" } });
    const oldReports = response.data;
    const data = oldReports.map(obj => {
      delete obj._id;
      delete obj.latitude;
      delete obj.longitude;
      delete obj.type;
      delete obj.status;
      delete obj.disaster;
      delete obj.Ambulance;
      delete obj.Police;
      delete obj.FireTruck;
      delete obj.Buses;
      delete obj.Helicopter;
      delete obj.created_at;
      delete obj.__v;
      return obj;
    });
    console.log(data);
    const updatedData = data.map(item => ({
      ...item,
      spam: item.spam ? 0 : 1
    }));
    console.log(updatedData);
    // Convert old reports to a CSV string
    // Convert array to CSV format with headers
    const csv = `${updatedData.map(item => `${item.detail},${item.spam}\n`).join('')}`;

    const filePath = path.join(__dirname, '../python/datasets/pastReports.csv');
    // Append CSV data to file
    fs.appendFile(filePath, csv, err => {
      if (err) {
        console.error(err);
      }
      console.log(`Data appended to ${filePath}`);
    });

    // Delete the old reports
    await ReportData.deleteMany({ _id: { $in: oldReports.map(report => report._id) } });
    await ReportData.updateMany(
      { _id: { $in: oldReports._id } },
      { status: 'closed' }
    );
    return true;
  } catch (err) {
    console.error(`Error processing old reports: ${err.message}`);
    return false;
  }
}

module.exports = {
  processOldReports : processOldReports
};