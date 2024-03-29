const axios = require('axios');

// Retrieve locations from API
async function getLocations() {
    const locations = await axios.get(`https://disaster-responder.onrender.com/api/v1/all-location-data`);
    return locations.data;
}

// Send order to API
async function sendOrder(order) {
    console.log(`Sending Order to Responder API:${order}`);
    return axios.post(`https://disaster-responder.onrender.com/api/v1/send-order`, order)
    .then((response) => {
        console.log(`Dummy Responder API Response: ${response.data.message}`);
        const success = response.data.message;
        return success;
    })
    .catch((error) => {
        if (error.response) {
            console.log(error.response.data.message);
            return {
                error: error.response.data.message
            };
        } else if (error.request) {
            console.log('No response received from the server');
            return {
                error: 'No response received from the server'
            };
        } else {
            console.log('Error', error);
            return {
                error: error.message
            };
        }
    });
}

// Reset capacity through API
function resetCapacity(orders) {
    return new Promise((resolve, reject) => {
        console.log(`Resetting Orders`);
        axios.post(`https://disaster-responder.onrender.com/api/v1/reset`, orders)
        .then((response) => {
            console.log(response.data.message);
            const success = response.data.message;
            resolve(success);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data.message);
                reject({
                    error: error.response.data.message
                });
            } else if (error.request) {
                console.log('No response received from the server');
                reject({
                    error: 'No response received from the server'
                });
            } else {
                console.log('Error', error);
                reject({
                    error: error.message
                });
            }
        });
    });
}

module.exports = {
    resetCapacity: resetCapacity,
    getLocations: getLocations,
    sendOrder: sendOrder
};