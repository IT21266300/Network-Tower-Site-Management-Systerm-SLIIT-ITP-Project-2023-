import mongoose, { Model } from "mongoose";
const tiInfoSchema = new mongoose.Schema({ 
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
    manual : {
        type : String,
        // required : true
    },
    commissioningPlan : {
        type : Date,
    },
    ranClusOwner : {
        type : String,
        // require: true
    	},

    province : {
        type : String,
        // required : true
    },

    status : {
        type : Boolean,
    }
 
 } )

 const TiInfo = mongoose.model('TiInfo', tiInfoSchema);
export default TiInfo;