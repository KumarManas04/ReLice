const mongoose = require("mongoose");

var complaintSchema = new mongoose.Schema({
    face_id : String,
    image : String,
    victim_name : String,
    age: Number,
    location: String,
    gender: String,
    height: String,
    complainant_name: String,
    contact: String,
    skin_color: String,
    hair_color: String,
});

const complaint = mongoose.model("Complaints", complaintSchema);

module.exports = complaint;