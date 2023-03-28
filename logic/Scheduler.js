// Import required modules and models
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Define a function to process old reports
async function processOldReports() {
  try {
    // Define the time limit for old reports
    const hoursThreshold = 24;
    const cutoffDate = new Date(Date.now() - hoursThreshold * 60 * 60 * 1000);

    // Get all old pending reports and mark them as spam
    console.log('updating spam reports...');
    const updateSpam = await axios.put("http://127.0.0.1:8000/api/v1/update-spam");//`${process.env.HOSTNAME}${process.env.API_URI}/update-spam`);
    console.log("fetching old reports...")
    const response = await axios.get("http://127.0.0.1:8000/api/v1/get-old-reports");//`${process.env.HOSTNAME}${process.env.API_URI}/get-old-reports`);
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
        return;
      }
      console.log(`Data appended to ${filePath}`);
    });
    
    // Delete old reports from the database
    await axios.delete(`http://127.0.0.1:8000/api/v1/delete-old-reports`);
  } catch (err) {
    console.error(`Error processing old reports: ${err.message}`);
  }
}

module.exports = {
  processOldReports : processOldReports
};