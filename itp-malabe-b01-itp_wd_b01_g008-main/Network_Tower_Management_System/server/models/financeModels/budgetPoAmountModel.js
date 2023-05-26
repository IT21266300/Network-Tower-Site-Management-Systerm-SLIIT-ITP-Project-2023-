import mongoose from "mongoose";

const budgetPoAmountSchema = new mongoose.Schema(
    {
        siteId: {type: String, required: true},
        siteName: {type: String, required: true},
        date: {type: Date, required: true},
        checkedDate: {type: String, required: true},
        time: {type: String, required: true},
        budgetPoAmount: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);

budgetPoAmountSchema.index({ date: 1, time: 1 }, { unique: true });

const BudgetPoAmount = mongoose.model('BudgetPoAmount', budgetPoAmountSchema);
export default BudgetPoAmount;