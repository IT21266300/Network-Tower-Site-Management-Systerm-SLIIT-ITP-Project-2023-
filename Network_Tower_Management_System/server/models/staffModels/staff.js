import mongoose, { Model } from "mongoose";

const staffSchema = new mongoose.Schema({
  profileImage: {
    data: Buffer,
    contentType: String,
  },
  staffId: {
    type: Number,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  nic:{
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const Staff = mongoose.model('Staff', staffSchema);

// module.exports = Staff;
export default Staff;