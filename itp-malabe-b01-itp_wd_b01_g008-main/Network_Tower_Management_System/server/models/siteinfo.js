const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({ 
    siteID : {
        type : String,
        required : true
    },
    siteName : {
        type : String,
        required : true
    },
    towerOwner : {
        type : String,
        required : true
    },
    height : {
        type : Number,
        required : true
    },
    manual : {
        type : String,
        required : true
    },
    commissioningPlan : {
        type : Date,
    },
    province : {
        type : String,
        required : true
    }
 
 } )

 const Site = mongoose.model("SiteDetails", siteSchema);
 module.exports = Site;