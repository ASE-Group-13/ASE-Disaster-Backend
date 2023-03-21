const axios = require('axios');
const app = require('../../index'); // assuming the router is mounted on an instance of express app

  test('should return true', async() => {
    const newDisasterData = {
      "latitude": "53.3607",
      "longitude": "-6.4077",
      "detail": "Earthquake"
    };
    const response = await axios.post('http://localhost:8000/api/v1/add-disaster-data', 
      newDisasterData,
      {
        headers:{
            'Content-Type': 'application/json'
        }
      }
    );
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(true);
    expect(response.data.saveData.detail).toEqual(newDisasterData.detail);
    expect(response.data.saveData.latitude).toEqual(newDisasterData.latitude);
    expect(response.data.saveData.longitude).toEqual(newDisasterData.longitude);
  });