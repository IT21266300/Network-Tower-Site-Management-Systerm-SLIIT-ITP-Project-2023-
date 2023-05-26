import mongoose, { Model } from "mongoose";

const toBeInvoiceSchema = new mongoose.Schema(
    {
        siteId: {type: String, required: true},
        siteName: {type: String, required: true},
        date: {type: Date, required: true},
        toBeInvoice: {type: Number, required: false, default: 0.00},
    },
    {
        timestamps: true
    }
);

const ToBeInvoice = mongoose.model('ToBeInvoice', toBeInvoiceSchema);
export default ToBeInvoice;