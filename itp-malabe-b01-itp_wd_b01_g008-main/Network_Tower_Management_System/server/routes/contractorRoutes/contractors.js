//const { response } = require("express");
//let Contractor = require("../../models/contractorModels/contractor");
import express from 'express';
const router = express.Router();
import Contractor from '../../models/contractorModels/contractor.js'


//Add contractor
router.route("/addContractor").post((req, res) => {
    const name = req.body.name;
    const nic = req.body.nic;
    const phone = req.body.phone;
    const siteID = req.body.siteID;
    const siteName = req.body.siteName;

    const newCon = new Contractor({
        name,
        nic,
        phone,
        siteID,
        siteName
    })

    newCon.save().then(()=>{
        res.json("User added successfully");   
    }).catch((err) =>{
        console.log(err);
    })
})

//Fetch all data
router.route("/read").get((req, res) =>{
    Contractor.find().then((Contractor) =>{
        res.json(Contractor)
    }).catch((err) =>{
        console.log(err)
    })
})

//Update data
router.route("/update/:id").put(async(req, res) =>{
    let userId = req.params.id;
    const {name, nic,phone,siteID,siteName} = req.body;

    const updateUser = {
        name,
        nic,
        phone,
        siteID,
        siteName
    }
    
    const update = await Contractor.findByIdAndUpdate(userId,updateUser).then(() =>{
        res.status(200).send({status:"User updated"})
    }).catch((err) =>{
        res.status(500).send({status:"Error updating user data",err:err.message});
    })
    
})

//Delete data
router.route("/delete/:id").delete(async(req, res) =>{
    let userId  = req.params.id;

    await Contractor.findByIdAndDelete(userId).then((Contractor) =>{
        res.status(200).send({status:"User deleted",Contractor});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting user"});
    })
})

//Fetch specific contractor
router.route("/read/:id").get(async(req, res) => {
    let userId = req.params.id;
    const user = await Contractor.findById(userId).then((user) => {
        res.status(200).send({status:"User fetched",user});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message}); 
    })
})

//module.exports = router;
export default router;
