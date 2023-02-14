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
  console.log("hello");
  res
    .status(200)
    .send({ message: "Hello User!\nHow are you? Welcome to Disastro!" });
});

function trainModel(req, res) {
  var data2;
  // spawn new child process to call the python script
  var spawn = require("child_process").spawn;
  const python = spawn('python', ['python/spamDetectionClassifier.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
    console.log(`stdout: ${data}`);
    data2 = data.toString();
  });
  python.stderr.on('data', (error) => {
    console.error(`stderr: ${error}`);
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     res.send(data2)
  });
  console.log(data2)
}

function predictMessage(req, res) {
  var data2;
  var message = "Fire is building downtown!"
  // spawn new child process to call the python script
  var spawn = require("child_process").spawn;
  const python = spawn('python', ['python/spamPrediction.py',message]);
  // collect data from script
  python.stdout.on('data', function (data) {
    console.log(`stdout: ${data}`);
    data2 = data.toString();
  });
  python.stderr.on('data', (error) => {
    console.error(`stderr: ${error}`);
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     res.send(data2)
  });
  console.log(data2)
}

app.get(`${api}/python`, trainModel);
app.get(`${api}/predict`,predictMessage)
app.use(`${api}/auth`, authRoute);
app.use(`${api}`, dataRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Backend Server in running!");
  console.log(`Server started on PORT: ${process.env.PORT}`);
});