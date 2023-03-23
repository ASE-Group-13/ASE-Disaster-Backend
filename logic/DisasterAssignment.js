const axios = require('axios');

// function to calculate distance between two points in meters
const calcDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2-lat1) * Math.PI / 180;
  const Δλ = (lon2-lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // distance in metres
  return d;
}

// main function to check if location is within 500m of an existing disaster
const checkDisasterLocation = async (type, longitude, latitude) => {
  const response = await axios.get("http://127.0.0.1:8000/api/v1/relevant-disaster-data");
  const disasters = response.data;

  for (let i = 0; i < disasters.length; i++) {
    const disaster = disasters[i];
    const distance = calcDistance(latitude, longitude, disaster.latitude, disaster.longitude);
    if (distance < 500) {
      console.log(`The location is within 500m of ${disaster.detail}`);
      return disaster._id;
    }
  }

  console.log('The location is not within 500m of any existing disasters.');
  return null;
}

const createDisaster = async (report) => {
  console.log("createDisaster");
  const data = {
    "latitude": report.latitude,
    "longitude": report.longitude,
    "title": report.type,
    "type": report.type,
    "status": "pending"
  };
  console.log("post request");
  const response = await axios.post(
    "http://127.0.0.1:8000/api/v1/add-Disaster-Data", data,
    {
        headers:{
            'Content-Type': 'application/json'
        }
    }
  ); 
  console.log("new disaster id");
  console.log(response);
  return response.data.saveData._id;
}

const addReportToDisaster = async (disaster, report) => {
  console.log("post request");
  console.log(`Disaster Id:${disaster} Report Id:${report._id}`)
  const response = await axios.post(
    `http://127.0.0.1:8000/api/v1/add-report-to-disaster/${disaster}`,
    {"reportId":report._id,},
    {
        headers:{
            'Content-Type': 'application/json'
        }
    }
  ); 
}

const assignToDisaster = async (report) => {
  latitude = report.latitude;
  var disaster = await checkDisasterLocation(report.longitude, report.latitude, report._id);
  console.log(`Disaster Id:${disaster}`);
  if (disaster===null){
    disaster = await createDisaster(report)
  }
  console.log("addReportToDisaster");
  await addReportToDisaster(disaster, report);
  result = Object.assign({}, report, {"disaster":disaster})
  console.log("result");
  console.log(result);
  return result;
}

module.exports = {
  addReportToDisaster : addReportToDisaster,
  assignToDisaster : assignToDisaster,
};