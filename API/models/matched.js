const mongoose = require("mongoose");

var matchSchema = new mongoose.Schema({
    complaint_id : String,
    report_id : String,
    victim_name : String
});

const match = mongoose.model("Matched", matchSchema);

module.exports = match;