const fs = require('fs');
const path = require('path');
const ReportData = require("../models/ReportData");

// Define a function to process old reports
async function processOldReports() {
    try {
        // Get all old pending reports and mark them as spam
        console.log('Updating spam reports...');
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // Limit is 24 hours
        await ReportData.updateMany({
            status: "pending",
            createdAt: {
                $lte: twentyFourHoursAgo
            }
        }, {
            $set: {
                spam: true
            }
        });

        console.log("Fetching old reports...");
        const oldReports = await ReportData.find({
            createdAt: {
                $lte: twentyFourHoursAgo
            },
            status: {
                $ne: "closed"
            }
        });

        console.log(`Found ${oldReports.length} old reports`);
        if (oldReports.length > 0) {
            const data = oldReports.map(obj => {
                const {
                    _id,
                    createdAt,
                    detail,
                    spam
                } = obj;

                return {
                    _id,
                    createdAt,
                    detail,
                    spam
                };
            });

            const updatedData = data.map(item => ({
                        ...item,
                        spam: item.spam ? 0 : 1
                    }));

            // Convert old reports to a CSV string
            const csv = updatedData.map(item => `"${item.detail.replace(/"/g, '""')}",${item.spam}\n`).join('');

            const filePath = path.join(__dirname, '../python/datasets/pastReports.csv');
            // Append CSV data to file
            fs.appendFile(filePath, csv, err => {
                if (err) {
                    console.error(`Error appending data to ${filePath}: ${err.message}`);
                    return;
                }
                console.log(`Data appended to ${filePath}`);
            });

            // Delete the old reports
            const reportIds = oldReports.map(report => report._id);
            await ReportData.deleteMany({
                _id: {
                    $in: reportIds
                }
            });
            await ReportData.updateMany({
                _id: {
                    $in: reportIds
                }
            }, {
                status: 'closed'
            });
            console.log(`Closed ${oldReports.length} old reports`);
        } else {
            console.log(`No old reports found`);
        }
        return true;
    } catch (err) {
        console.error(`Error processing old reports: ${err.message}`);
        return false;
    }
}

module.exports = {
    processOldReports: processOldReports
};