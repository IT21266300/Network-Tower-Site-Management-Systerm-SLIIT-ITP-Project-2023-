// const mongoose = require('mongoose');
import mongoose, { Model } from "mongoose";

//const schema = mongoose.schema;

const staffschema = new mongoose.Schema({

    staffId: {
        type: Number,
        required: true,
        unique: true
    },
    siteId: {
        type: String,
        required: true, 
    },
    name : {
        type : String,
        required : true 
    },
    nic : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    email :{
        type : String
    }
})

const staff = mongoose.model("ContactStaff",staffschema);

// module.export = staff;
export default staff;

