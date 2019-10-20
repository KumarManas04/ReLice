const mongoose = require("mongoose");

var reportSchema = new mongoose.Schema({
    face_id : String,
    image : String,
    age: Number,
    location: String,
    gender: String,
    hair_color: String,
    user_id: String
});

const report = mongoose.model("Reports", reportSchema);

module.exports = report;