import express from 'express';
import Checklist from '../../models/towerInfoModels/Checklist.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();


// Retrieve checklist data
router.get("/get", async (req, res) => {
  try {
    const checklist = await Checklist.find();
    res.json(checklist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update checklist data
router.put("/put", async (req, res) => {
  const { step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11, step12, step13, step14, step15, step16, step17,
     step18, step19, step20, step21, step22, step23, step24, step25, step26, step27, step28, step29,
      step30, step31, step32 } = req.body;

  try {
    let checklist = await Checklist.findOne();
    if (!checklist) {
      // If no checklist exists, create a new one
      checklist = new Checklist({
        step1,
        step2,
        step3,
        step4,
        step5,
        step6,
        step7,
        step8,
        step9,
        step10,
        step11,
        step12,
        step13,
        step14,
        step15,
        step16,
        step17,
        step18,
        step19,
        step20,
        step21,
        step22,
        step23,
        step24,
        step25,
        step26,
        step27,
        step28,
        step29,
        step30,
        step31,
        step32,
      });
    } else {
      // Otherwise, update the existing checklist
      checklist.step1 = step1;
      checklist.step2 = step2;
      checklist.step3 = step3;
      checklist.step4 = step4;
      checklist.step5 = step5;
      checklist.step6 = step6;
      checklist.step7 = step7;
      checklist.step8 = step8;
      checklist.step9 = step9;
      checklist.step10 = step10;
      checklist.step11 = step11;
      checklist.step12 = step12;
      checklist.step13 = step13;
      checklist.step14 = step14;
      checklist.step15 = step15;
      checklist.step16 = step16;
      checklist.step17 = step17;
      checklist.step18 = step18;
      checklist.step19 = step19;
      checklist.step20 = step20;
      checklist.step21 = step21;
      checklist.step22 = step22;
      checklist.step23 = step23;
      checklist.step24 = step24;
      checklist.step25 = step25;
      checklist.step26 = step26;
      checklist.step27 = step27;
      checklist.step28 = step28;
      checklist.step29 = step29;
      checklist.step30 = step30;
      checklist.step31 = step31;
      checklist.step32 = step32;
    }

    const updatedChecklist = await checklist.save();
    res.json(updatedChecklist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default Checklist;