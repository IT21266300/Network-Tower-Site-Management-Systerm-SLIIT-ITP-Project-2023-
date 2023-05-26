import mongoose, { Model } from "mongoose";

const toBeCashCollectionSchema = new mongoose.Schema(
    {
        siteId: {type: String, required: true},
        siteName: {type: String, required: true},
        date: {type: Date, required: true},
        toBeCollection: {type: Number, required: true, default: 0}
    },
    {
        timestamps: true
    }
);

const ToBeCashCollection = mongoose.model('ToBeCashCollection', toBeCashCollectionSchema);
export default ToBeCashCollection;