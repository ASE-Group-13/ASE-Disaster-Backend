require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const disasterRoute = require("./routes/disasters");
const orderRoute = require("./routes/orders");
const reportRoute = require("./routes/reports");
const authRoute = require("./routes/auth");
const schedule = require('node-schedule');
const { processOldReports } = require("./logic/SpamFeedback")
const spam = require("./logic/SpamFilter")
const resource = require("./logic/ResourceAllocator")

const rule = new schedule.RecurrenceRule();
rule.hour = 0; // Run the job at midnight every day
rule.minute = 1;

// Define the scheduler
const job = schedule.scheduleJob(rule, () => {
  console.log('Running processOldReports job...');
  processOldReports().catch(err => {
    console.error(`Error running processOldReports: ${err.message}`);
  });
  spam.trainModel();
  resource.trainModel();
  console.log(`processOldReports job scheduled to run at ${rule.hour}:${rule.minute} every day.`);
});

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

app.use(`${api}/auth`, authRoute);
app.use(`${api}`, disasterRoute);
app.use(`${api}`, orderRoute);
app.use(`${api}`, reportRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Backend Server in running!");
  console.log(`Server started on PORT: ${process.env.PORT}`);
});

module.exports = {
  job: job
}
