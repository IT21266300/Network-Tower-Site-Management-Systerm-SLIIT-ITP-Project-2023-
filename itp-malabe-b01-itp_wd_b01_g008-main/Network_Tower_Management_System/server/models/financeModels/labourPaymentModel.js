import mongoose, { Model } from "mongoose";

const labourPaymentSchema = new mongoose.Schema(
    {
        siteId: {type: String, required: true},
        siteName: {type: String, required: true},
        date: {type: Date, required: true},
        checkedDate: {type: String, required: true},
        time: {type: String, required: true},
        labourPayment: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);

const LabourPayment = mongoose.model('LabourPayment', labourPaymentSchema);
export default LabourPayment;