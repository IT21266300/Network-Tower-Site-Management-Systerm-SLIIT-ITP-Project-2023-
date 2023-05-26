// const router =require("express").Router();
// let Vehicle = require("../models/Vehicle");

import express from 'express';
import Vehicle from '../../models/transportModels/Vehicle.js';

const router = express.Router();


router.route("/add").post(async(req,res) =>{

    const  model =req.body.model;
    const registration_number =req.body.registration_number;
    const fuel_type=req.body.fuel_type; 
    const status =req.body.status;

    const existingData = await Vehicle.findOne({
        $and: [{registration_number}],
      });
    
      if (existingData) {
        return res.status(409).send('Data cannot be duplicated');
      }
   

    const newVehicle =new Vehicle({
        model,
        registration_number,
        fuel_type,
        status
    })

    newVehicle.save().then(()=>{
        res.json("Vehicle Added")
    }).catch((err)=>{
        console.log(err);


    })
})

router.route("/").get((req,res)=>{
    Vehicle.find().then((vehicles)=>{
        res.json(vehicles)


    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:vid").put(async(req,res)=>{
    let userId = req.params.vid;
    const {model,registration_number,fuel_type,status} =req.body;

    const updateVehicle ={
        model,
        registration_number,
        fuel_type,
        status

    }
    const update =await Vehicle.findByIdAndUpdate(userId,updateVehicle)
    .then(()=>{ 
    res.status(200).send({status: "User updated"})

}).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with updating data"});
})

})

router.route("/delete/:vid").delete(async(req,res)=>{
     let userId = req.params.vid;
     await Vehicle.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"User deleted"});
     }).catch((error)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",error:err.message});
     })
})



// module.exports =router;
export default router;