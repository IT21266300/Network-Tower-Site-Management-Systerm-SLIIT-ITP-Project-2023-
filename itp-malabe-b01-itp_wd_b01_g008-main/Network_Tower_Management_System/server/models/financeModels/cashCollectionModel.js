import mongoose, { Model } from "mongoose";

const cashCollectionSchema = new mongoose.Schema(
    {
        siteId: {type: String, required: true},
        siteName: {type: String, required: true},
        date: {type: Date, required: true},
        checkedDate: {type: String, required: true},
        time: {type: String, required: true},
        cashCollection: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);


const CashCollection = mongoose.model('CashCollection', cashCollectionSchema);
export default CashCollection;