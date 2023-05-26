import mongoose, { Model } from "mongoose";


const clientschema = new mongoose.Schema({

    name : {
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
    clientId : {
        type : String,
        required : true
    },
    email :{
        type : String
    }
})

const client = mongoose.model("client",clientschema);

// module.export = client;
export default client;