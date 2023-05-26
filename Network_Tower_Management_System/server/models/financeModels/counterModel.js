import mongoose, { Model } from "mongoose";

const counterSchema = new mongoose.Schema(
    {
        id:{
            type: String
        },
        seq:{
            type: Number
        }
    }
);

const Counter = mongoose.model('Counter', counterSchema);
export default Counter;