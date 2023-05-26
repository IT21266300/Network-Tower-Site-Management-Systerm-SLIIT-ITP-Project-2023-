// const mongoose =require('mongoose');

import mongoose, { Model } from "mongoose";


// const Schema = mongoose.Schema;

const vehicleSchema =new mongoose.Schema({

    model : {
        type : String,
        required: true
    },

    registration_number : {
        type :String,
        required: true
    },

    fuel_type :{
        type :String,
        required: true
    },
    status :{
        type :String,
        required: true

    }

   
})

const Vehicle =mongoose.model("Vehicle",vehicleSchema);

// module.exports = Vehicle;
export default Vehicle;
