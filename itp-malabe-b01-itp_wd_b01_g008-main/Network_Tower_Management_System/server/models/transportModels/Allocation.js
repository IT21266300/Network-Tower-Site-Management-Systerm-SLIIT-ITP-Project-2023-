// const mongoose =require('mongoose');
import mongoose, { Model } from 'mongoose';

// const Schema = mongoose.Schema;

const allocationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },
  driver_id: {
    type: String,
    required: true,
  },

  vehicle_number: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checkedDate: { type: String, required: true },
  time: { type: String, required: true },
});

const Allocation = mongoose.model('Allocation', allocationSchema);

// module.exports = Allocation;
export default Allocation;
