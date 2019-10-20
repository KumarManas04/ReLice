//setting up required packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
// console.log(process.env.DATABASEURL);
// const url = "mongodb://relice:CGJL5AbQbU7L48fXOiR0tD5KxJDVl5V3WqBDSpMp8V5jvP9Hma45jGtpO8qPmd9ACMEZx13zBbZUSGCssZhCjQ==@relice.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@relice@";
const url1 = "mongodb://relice:CGJL5AbQbU7L48fXOiR0tD5KxJDVl5V3WqBDSpMp8V5jvP9Hma45jGtpO8qPmd9ACMEZx13zBbZUSGCssZhCjQ==@relice.mongo.cosmos.azure.com:10255/relice-2019?ssl=true"
mongoose.connect(url1, {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

//importing routes 
const complaintRoutes = require("./routes/complaint_routes.js");
const processingRoutes = require("./routes/processing_routes.js");
const reportRoutes = require("./routes/report_routes.js");

app.get("/", (req, res) => {
    res.send("Working fine sir");
});

app.use("/api", complaintRoutes);
app.use("/api",processingRoutes);
app.use("/api",reportRoutes);

app.listen(process.env.PORT || 3001, process.env.IP, () => {
    console.log("I am at your service sir...");
});


