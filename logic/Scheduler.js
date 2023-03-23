const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const stringify = require('csv-stringify');
const ReportData = require('../models/ReportData');

// // Schedule the task to run every 24 hours
// cron.schedule('0 0 */24 * * *', async () => {
//   try {
//     // Get all reports older than 24 hours
//     const cutoffDate = new Date();
//     cutoffDate.setHours(cutoffDate.getHours() - 24);

//     const oldReports = await ReportData.find({
//       created_at: { $lt: cutoffDate }
//     });

//     // Set spam field to true for pending reports and save the documents
//     const pendingReports = oldReports.filter(report => report.status === "pending");
//     pendingReports.forEach(async (report) => {
//       report.spam = true;
//       await report.save();
//     });

//     // Convert old reports to CSV string
//     const csvString = await stringify(oldReports, {
//         header: false,
//         columns: [
//         { key: 'detail', header: 'text' },
//         { key: 'spam', header: 'target' }
//         ]
//     });

//     // Append CSV string to existing file or create a new file
//     const fileName = 'pastReports.csv';
//     const filePath = path.join("./python/datasets/", fileName);
//     if (fs.existsSync(filePath)) {
//       fs.appendFileSync(filePath, csvString);
//       console.log(`${oldReports.length} old reports appended to ${fileName}`);
//     } else {
//       fs.writeFileSync(filePath, csvString);
//       console.log(`${oldReports.length} old reports saved to new file ${fileName}`);
//     }

//     // Delete old reports from the database
//     await ReportData.deleteMany({ created_at: { $lt: cutoffDate } });
//     console.log(`${oldReports.length} old reports deleted from the database`);
//   } catch (err) {
//     console.error(`Error saving old reports: ${err.message}`);
//   }
// });

async function processOldReports() {
    try {
        // Get all reports older than 24 hours
        const cutoffDate = new Date();
        cutoffDate.setHours(cutoffDate.getHours() - 24);

        const oldReports = await ReportData.find({
            created_at: { $lt: cutoffDate }
        });

        // Set spam field to true for pending reports and save the documents
        const pendingReports = oldReports.filter(report => report.status === "pending");
        pendingReports.forEach(async (report) => {
            report.spam = true;
            await report.save();
        });

        // Convert old reports to CSV string
        const csvString = await stringify(oldReports, {
            header: false,
            columns: [
            { key: 'detail', header: 'text' },
            { key: 'spam', header: 'target' }
            ]
        });

        // Append CSV string to existing file or create a new file
        const fileName = 'pastReports.csv';
        const filePath = path.join("../python/datasets/", fileName);
        if (fs.existsSync(filePath)) {
            fs.appendFileSync(filePath, csvString);
            console.log(`${oldReports.length} old reports appended to ${fileName}`);
        } else {
            fs.writeFileSync(filePath, csvString);
            console.log(`${oldReports.length} old reports saved to new file ${fileName}`);
        }

        // Delete old reports from the database
        await ReportData.deleteMany({ created_at: { $lt: cutoffDate } });
        console.log(`${oldReports.length} old reports deleted from the database`);
        } catch (err) {
        console.error(`Error saving old reports: ${err.message}`);
        }
}

module.exports = {
    processOldReports: processOldReports
};