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
  file: {
    type: String,
    required: [true],
  }
});

const Permission = mongoose.model('Permission', docSchema);

// module.exports = Doc;
export default Permission;