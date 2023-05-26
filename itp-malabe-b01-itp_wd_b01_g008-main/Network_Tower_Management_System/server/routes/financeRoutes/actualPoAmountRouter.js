import express from 'express';
import ActualPoAmount from '../../models/financeModels/actualPoAmountModel.js';
import expressAsyncHandler from 'express-async-handler';

const actualPoAmountRouter = express.Router();  

actualPoAmountRouter.post(
  '/add',
  expressAsyncHandler(async (req, res) => {

    const siteId = req.body.siteId
    const  siteName = req.body.siteName
    const  date = req.body.date
    const  actualPoAmount = req.body.actualPoAmount


    const reDate = new Date(req.body.date);
    const reTime = reDate.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Kolkata',
    };

    const checkedDate = reDate.toLocaleDateString('en-US', options);

    const time = reTime

    const existingData = await ActualPoAmount.findOne({
      $and: [{ checkedDate }, { time }],
    });


    if (existingData) {
      return res
        .status(409)
        .json({message:'Data with same date and time already exists'});
    }


    const newActualPoAmount = new ActualPoAmount({
      siteId,
      siteName,
      date,
      checkedDate,
      time,
      actualPoAmount,
    });
   

    const actualPo = await newActualPoAmount
      .save()
      .then(() => {
        res.send('New Data Added');
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  })
);


actualPoAmountRouter.delete(
  '/delete/:id',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params);
    await ActualPoAmount.findByIdAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).send({status: "delete success"});
      })
      .catch((err) => {
        res.status(500).send({status: "delete error", error: err.message});
      });
  })
);


actualPoAmountRouter.put(
  '/update/:id',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    await ActualPoAmount.findByIdAndUpdate(
      { _id: req.params.id },
      {
        siteId: req.body.siteId,
        siteName: req.body.siteName,
        date: req.body.date,
        actualPoAmount: req.body.actualPoAmount,
      }
    )
      .then(() => {
        res.status(200).send({ status: 'Update success' });
      })
      .catch((err) => {
        res.status(500).send({ status: 'update error', error: err.message });
      });
  })
);

export default actualPoAmountRouter;
