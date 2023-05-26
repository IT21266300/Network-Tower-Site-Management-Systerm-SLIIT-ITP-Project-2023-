//create database models
//safe.js file

// const mongoose = require('mongoose');

import mongoose, { Model } from "mongoose";
 
const Schema = mongoose.Schema;

const safeSchema = new Schema({

    
    siteId : {
        type : String,
        required: true
    },
    siteName : {
        type : String,
        required: true
    },
    safetyhelmets : {
        type : Number,
        required: true
    },
    safetyjacket : {
        type : Number,
        required: true
    },
    safetyshoes : {
        type : Number,
        required: true
    },
    safetygloves : {
        type : Number,
        required: true
    },
    safetyharness : {
        type : Number,
        required: true
    },
    cautionbord : {
        type : Number,
        required: true
    },
    isAccepted : {
        type : Number,
        required: true,
        default: -1,
    }
})

const Safe = mongoose.model("Safe",safeSchema);
export default Safe;