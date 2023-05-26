import mongoose, { Model } from "mongoose";

const otherPaymentSchema = new mongoose.Schema(
    {
        siteId: {type: String, required: true},
        siteName: {type: String, required: true},
        date: {type: Date, required: true},
        checkedDate: {type: String, required: true},
        time: {type: String, required: true},
        otherPayment: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);

const OtherPayment = mongoose.model('OtherPayment', otherPaymentSchema);
export default OtherPayment;