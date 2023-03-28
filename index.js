require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dataRoute = require("./routes/data");
const authRoute = require("./routes/auth");
const schedule = require('node-schedule');
const {processOldReports} = require("./logic/Scheduler")

const rule = new schedule.RecurrenceRule();
rule.hour = 0; // Run the job at midnight every day

// Define the scheduler
const job = schedule.scheduleJob(rule, () => {
  console.log('Running processOldReports job...');
  processOldReports().catch(err => {
    console.error(`Error running processOldReports: ${err.message}`);
  });
  console.log(`processOldReports job scheduled to run at ${rule.hour}:00} every day.`);
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
app.use(`${api}`, dataRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Backend Server in running!");
  console.log(`Server started on PORT: ${process.env.PORT}`);
});

