import mongoose, { Model } from "mongoose";

const actualPoAmountSchema = new mongoose.Schema(   
    {
        siteId: {type: String, required: true},
        siteName: {type: String, required: true},
        date: {type: Date, required: true},
        checkedDate: {type: String, required: true},
        time: {type: String, required: true},
        actualPoAmount: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);

actualPoAmountSchema.index({ date: 1, time: 1 }, { unique: true });

const ActualPoAmount = mongoose.model('ActualPoAmount', actualPoAmountSchema);
export default ActualPoAmount;