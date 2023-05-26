import mongoose, { Model } from "mongoose";;

const ChecklistSchema = new mongoose.Schema({
  step1: {
    type: Boolean,
    default: false,
  },
  step2: {
    type: Boolean,
    default: false,
  },
  step3: {
    type: Boolean,
    default: false,
  },

  step4: {
    type: Boolean,
    default: false,
  },

  step5: {
    type: Boolean,
    default: false,
  },

  step6: {
    type: Boolean,
    default: false,
  },

  step7: {
    type: Boolean,
    default: false,
  },

  step8: {
    type: Boolean,
    default: false,
  },
  step9: {
    type: Boolean,
    default: false,
  },
  step10: {
    type: Boolean,
    default: false,
  },
  step11: {
    type: Boolean,
    default: false,
  },
  step12: {
    type: Boolean,
    default: false,
  },
  step13: {
    type: Boolean,
    default: false,
  },
  step14: {
    type: Boolean,
    default: false,
  },
  step15: {
    type: Boolean,
    default: false,
  },
  step16: {
    type: Boolean,
    default: false,
  },
  step17: {
    type: Boolean,
    default: false,
  },
  step18: {
    type: Boolean,
    default: false,
  },
  step19: {
    type: Boolean,
    default: false,
  },
  step20: {
    type: Boolean,
    default: false,
  },
  step21: {
    type: Boolean,
    default: false,
  },
  step22: {
    type: Boolean,
    default: false,
  },
  step23: {
    type: Boolean,
    default: false,
  },
  step24: {
    type: Boolean,
    default: false,
  },
  step25: {
    type: Boolean,
    default: false,
  },
  step26: {
    type: Boolean,
    default: false,
  },
  step27: {
    type: Boolean,
    default: false,
  },
  step28: {
    type: Boolean,
    default: false,
  },
  step29: {
    type: Boolean,
    default: false,
  },
  step30: {
    type: Boolean,
    default: false,
  },
  step31: {
    type: Boolean,
    default: false,
  },
 
  step32: {
    type: Boolean,
    default: false,
  },
});


const Checklist = mongoose.model('Checklist', ChecklistSchema);
export default Checklist;