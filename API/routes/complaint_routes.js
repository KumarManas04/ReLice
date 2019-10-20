const express = require("express");
const router = express.Router();
const axios = require("axios");

const Complaints = require("../models/complaint");
const Matched = require("../models/matched");

router.get("/get/complaints", (req,res) => {
    const data = req.body;
    Complaints.find({}, (err, complaints) => {
        if(err){
            console.log(err);
            res.send({error : err});
            return;
        }
        res.send(complaints);
    });
});

router.post("/post/complaints", async (req, res) => {
    let data = req.query;

    Complaints.create({
        image : data.image,
        face_id : "", //from natani
        victim_name: data.victim_name,
        age: data.age,
        location: data.location,
        gender: data.gender,
        height: data.height,
        complainant_name: data.complainant_name,
        contact: data.contact,
        skin_color: data.skin_color,
        hair_color: data.hair_color,
    }, async(err, complaint) => {
        if (err) {
            console.log(err);
            //make sourabh wait for reply from api
            res.send({ error: err });
            return;
        }

            const response = await axios.get("https://reliceai.azurewebsites.net/getId",{
            params : {
                dbItemId: data.image
            }
        });

        // console.log("response : ", response);
        complaint.face_id = response.data.face_id;
        console.log("response : ", response.data);
        // console.log("complaint : ", complaint);
        var matched_id = response.data.matched_id;
        var is_matched = true;
        if(matched_id == "" || matched_id ==undefined)
            is_matched = false;

        await complaint.save();
        // console.log(complaint);
        res.send({
            complaint_id : complaint.face_id,
            matched_id : matched_id,
            is_matched : is_matched
            
        });
    });
});

router.get("/get/matched", async(req, res) => {
    const data = req.body;
    Matched.find({}, (err, matches) => {
        if (err) {
            console.log(err);
            res.send({ error: err });
            return;
        }
        res.send(matches);
    }); 
});

module.exports = router;