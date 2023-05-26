import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contractorSchema = new Schema({

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
    siteID : {
        type : String,
        required : true
    },
    siteName : {
        type : String,
        required : true
    }

})

const Contractor = mongoose.model("Contractor",contractorSchema);

export default Contractor;