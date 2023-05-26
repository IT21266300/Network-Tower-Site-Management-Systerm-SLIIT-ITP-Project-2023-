import mongoose, { Model } from "mongoose";

const civilInfoSchema = new mongoose.Schema({ 
    siteId : {
        type : String,
        // required : true
    },
    siteName : {
        type : String,
        // required : true
    },
    towerOwner : {
        type : String,
        // required : true
    },
    height : {
        type : Number,
        // required : true
    },
    contractor : {
        type : String,
        // required : true
    },
   
    region : {
        type : String,
        // required : true
    },

    status : {
        // type : Boolean,
    }
 } )

 const CivilInfo = mongoose.model('CivilInfo', civilInfoSchema);
export default CivilInfo;