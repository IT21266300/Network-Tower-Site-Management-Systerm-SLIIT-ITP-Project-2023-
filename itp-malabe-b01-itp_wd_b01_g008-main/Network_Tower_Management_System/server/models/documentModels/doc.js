import mongoose, { Model } from "mongoose";


const docSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
  },
  siteName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: [true],
  }
});

const Doc = mongoose.model('Document', docSchema);

// module.exports = Doc;
export default Doc;
