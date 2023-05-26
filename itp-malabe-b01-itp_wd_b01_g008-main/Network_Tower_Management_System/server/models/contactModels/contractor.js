// const mongoose = require('mongoose');

//const schema = mongoose.schema;

import mongoose, { Model } from "mongoose";

const contractorschema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    nic : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    email :{
        type : String
    }
})

const contractor = mongoose.model("contractor",contractorschema);

// module.export = contractor;
export default contractor;