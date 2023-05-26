
// const router = require("express").Router();
// let Safe = require("../models/safe");


import express from 'express';
import Safe from "../../models/safetyModels/safe.js"
const router = express.Router();

//***** CREATE => router
//backend URL...

router.route("/add").post((req,res)=>{

    //const safeid = req.body.safeid;
    //values assign using normal way
    const siteId        = req.body.siteId;
    const siteName      = req.body.siteName;
    const safetyhelmets = req.body.safetyhelmets;
    const safetyjacket  = req.body.safetyjacket;
    const safetyshoes   = req.body.safetyshoes;
    const safetygloves  = req.body.safetygloves;
    const safetyharness = req.body.safetyharness;
    const cautionbord   = req.body.cautionbord ;
    const isAccepted  = req.body.isAccepted ;

    const newSafe = new Safe({

        //safeid,
        siteId,
        siteName,
        safetyhelmets,
        safetyjacket,
        safetyshoes,
        safetygloves,
        safetyharness,
        cautionbord,
        isAccepted
    })

    //sending Student JS object to database

    newSafe.save().then(() =>{
        res.json("Safe item inserted !!")
    }).catch(() =>{
        console.log(err);
    })

})

//***** RETRIEVE => router
//backend URL...

router.route("/").get((req,res) =>{

    Safe.find().then((safes) =>{

        res.json(safes)
    }).catch((err) =>{
        console.log(err);
    })
})

//***** UPDATE => router
//backend URL...
router.route("/update/:id").put(async(req,res) =>{
    let userId = req.params.id;

    //Check if the id is valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     return res.status(400).send({status: "Invalid ID"});
    // }
    //values assign using Dstructure
    const {siteId,siteName,safetyhelmets,safetyjacket,safetyshoes,safetygloves,safetyharness,cautionbord} = req.body;

    const updateSafe = {
        siteId,
        siteName,
        safetyhelmets, 
        safetyjacket,
        safetyshoes,
        safetygloves,
        safetyharness,
        cautionbord,
    }

    const update = await Safe.findByIdAndUpdate(userId, updateSafe).then(() => {

        res.status(200).send({status: "Safe item Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating safeitem"});
    })

    
})

//***** DELETE => router
//backend URL...

router.route("/delete/:id").delete(async(req,res) => {

    let userId = req.params.id;
    await Safe.findByIdAndDelete(userId).then(()=> {

        res.status(200).send({status: "user deleted"});
    }).catch((err) => {
       console.log(err.message);
       res.status(500).send({status: "Error with delete safeitem",error:err.message}); 
    })
})

//get data of one main Safe Item

router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    await Safe.findById(userId).then((safeitem) => {
        res.status(200).send({status: "User fetched",safeitem})
    }).catch(() =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get safeitem",error:err.message})
    })
    
})


router.route("/updateStatus/:id").put(async(req,res) =>{
    let userId = req.params.id;

    const {isAccepted} = req.body;

    const updateSafe = {
        isAccepted
    }

    const update = await Safe.findByIdAndUpdate(userId, updateSafe).then(() => {

        res.status(200).send({status: "Safe item Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating safeitem"});
    })
    
})




//export module
// module.exports = router;
export default router;
