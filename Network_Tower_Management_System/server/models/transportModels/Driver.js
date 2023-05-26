// const mongoose =require('mongoose');
import mongoose, { Model } from "mongoose";


// const Schema = mongoose.Schema;

const driverSchema =new mongoose.Schema({

    name : {
        type : String,
        required: true
    },
    license_number :{
        type :String,
        required: true,
        unique : true
    },
    nic : {
        type :String,
        required: true,
        unique : true
    },
    
    address :{
        type :String,
        required: true

    },
    phone :{
        type :Number,
        required: true,
        unique : true
    },
    email : {
        type :String,
        required: true,
        unique : true
    }

})

const Driver =mongoose.model("Driver",driverSchema);

// module.exports = Driver;
export default Driver;
