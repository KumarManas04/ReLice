const express = require("express");
const router = express.Router();

const Reports = require("../models/report");
const Complaints = require("../models/complaint");
const Matched = require("../models/matched");

//get all temporary images
router.get("/get/reports", (req, res) => {
    Reports.find({}, (err, foundReports) => {
        if(err){
            console.error(err);
            res.send([{error : err}]);
            return;
        }
        res.send(foundReports);
    });
});

//get all the complaint images
router.get("/get/complaints", (req, res) => {
    Complaints.find({}, (err, foundComplaints) => {
        if (err) {
            console.error(err);
            res.send([{ error: err }]);
            return;
        }
        res.send(foundComplaints);
    });
});


//to put all the matched results
router.post("/post/matched",(req,res) => {
    const {complaint_id, report_id, victim_name} = req.body;

    Matched.create({
        complaint_id : complaint_id,
        report_id : report_id,
        victim_name : victim_name 
    }, (err, createdMatch) => {
        if(err){
            console.error(err);
            res.send([{ error: err }]);
            return;
        }
        res.send(createdMatch);
    });

});

module.exports = router;