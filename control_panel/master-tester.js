const express = require("express");
const reportRoutes = require("../routes/reports"); // Assuming the provided code is saved in a file named `routes/reports.js`
const app = express();
app.use(express.json());
app.use("/api/v1", reportRoutes);

// Start the app on a different port to avoid conflicts with your main server
const port = 9000;
app.listen(port, () => {
    console.log(`Control room app listening at http://localhost:${port}`);
});

const axios = require("axios");

const apiUrl = "http://localhost:8000/api/v1"; // Make sure to replace 8000 with the port your Express server is running on

// Helper function to make a POST request to the provided path
async function postToPath(path, body) {
    const response = await axios.post(`${apiUrl}${path}`, body);
    return response.data;
}

// Step 1: Add a disaster and provide a message in the detail field describing the disaster
async function addDisaster(detail, latitude, longitude, type) {
    const reportData = await postToPath("/add-report-data", {
        detail,
        latitude,
        longitude,
        type,
    });

    return reportData.saveReportData;
}

// Step 2: Extract the disaster id from the disaster field in the response
function extractDisasterId(disasterData) {
    return disasterData.disaster._id;
}

// Step 3: Call the activate-disaster API and pass the id in the request URL
async function activateDisaster(
    id,
    type,
    radius,
    size,
    site,
    evacuation = true) {
    const response = await postToPath(`/activate-disaster/${id}`, {
        type,
        radius,
        size,
        site,
        evacuation,
    });

    return response;
}

// Step 4: Call request-resources API and set the request body with the resources and disasterId
async function requestResources(
    disasterId,
    ambulance,
    police,
    fireTruck,
    buses,
    helicopter,
    evacuation) {
    const response = await postToPath("/request-resources", {
        disasterId,
        ambulance,
        police,
        fireTruck,
        buses,
        helicopter,
        evacuation,
    });

    return response;
}

// Main function to perform all the steps sequentially
async function main() {
    try {
        // Add a new disaster
        const disasterData = await addDisaster(
                "Fire in the building",
                "53.3543",
                "-6.2341",
                "fire");

        // Extract the disaster id
        const disasterId = extractDisasterId(disasterData);

        // Activate the disaster
        await activateDisaster(
            disasterId,
            "traffic accident",
            100,
            20,
            "city street");

        // Request resources for the disaster
        await requestResources(
            disasterId,
            2, // ambulance
            3, // police
            1, // fireTruck
            0, // buses
            0, // helicopter
            true // evacuation
        );
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
