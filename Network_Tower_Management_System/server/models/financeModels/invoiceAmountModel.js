import mongoose, { Model } from "mongoose";

const invoiceAmountSchema = new mongoose.Schema(
    {
        siteId: {type: String, required: true},
        siteName: {type: String, required: true},
        date: {type: Date, required: true},
        checkedDate: {type: String, required: true},
        time: {type: String, required: true},
        invoiceNo: {type: Number, required: true, unique: true},
        invoiceAmountExTax: {type: Number, required: true},
        taxAmount: {type: Number, required: true},
        invoiceAmountInTax: {type: Number, required: true},
    },
    {
        timestamps: true
    }
);

const InvoiceAmount = mongoose.model('InvoiceAmount', invoiceAmountSchema);
export default InvoiceAmount;