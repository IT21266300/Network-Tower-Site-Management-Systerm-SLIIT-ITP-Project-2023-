import mongoose, { Model } from "mongoose";

const materialPaymentSchema = new mongoose.Schema(
    {
        siteId: {type: String, required: true},
        siteName: {type: String, required: true},
        date: {type: Date, required: true},
        checkedDate: {type: String, required: true},
        time: {type: String, required: true},
        materialPayment: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);

const MaterialPayment = mongoose.model('MaterialPayment', materialPaymentSchema);
export default MaterialPayment;