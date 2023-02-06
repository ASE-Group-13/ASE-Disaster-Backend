require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dataRoute = require("./routes/data");
const authRoute = require("./routes/auth");
//const pythonRoute = require("./routes/python");

const api = process.env.API_URI;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));

mongoose.connection.on("disconnected", () =>
  console.log("mongoDB disconnected!")
);
mongoose.connection.on("connected", () => console.log("mongoDB connected!"));

app.use(cors());
app.use(express.json());

app.get(`${api}/hello`, (req, res) => {
  res
    .status(200)
    .send({ message: "Hello User!\nHow are you? Welcome to Disastro!" });
});
const { spawn } = require('child_process');
app.get(`${api}/python`, (req, res) => {
  var data2;
  const table = [{"_id":"63cee1e3e96118f8f8714374","latitude":"53.34425","longitude":"-6.26241","detail":"Disaster 1","__v":0},
  {"_id":"63cee21be96118f8f8714376","latitude":"53.330456207499424","longitude":"-6.278736499782899","detail":"Disaster 2","__v":0},
  {"_id":"63dd36eb6e572d5a9370c292","latitude":"53.3292399","longitude":"-6.2520304","detail":"Disaster 3","__v":0}];
  // spawn new child process to call the python script
  const python = spawn('python', ['python/script1.py', JSON.stringify(table)]);
  // collect data from script
  python.stdout.on('data', function (data) {
     console.log('Pipe data from python script ...');
     data2 = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     res.send(data2)
  });
})
app.use(`${api}/auth`, authRoute);
app.use(`${api}`, dataRoute);
// app.use(`${api}/python`, pythonRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Backend Server in running!");
  console.log(`Server started on PORT: ${process.env.PORT}`);
});