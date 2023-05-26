import express from 'express';
import LabourPayment from '../../models/financeModels/labourPaymentModel.js';
import expressAsyncHandler from 'express-async-handler';

const labourPaymentRouter = express.Router();

labourPaymentRouter.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    const siteId = req.body.siteId;
    const siteName = req.body.siteName;
    const date = req.body.date;
    const labourPayment = req.body.labourPayment;

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

    const time = reTime;

    const existingData = await LabourPayment.findOne({
      $and: [{ checkedDate }, { time }],
    });

    if (existingData) {
      return res
        .status(409)
        .send('Data with same date and time already exists');
    }

    const newLabour = new LabourPayment({
      siteId,
      siteName,
      date,
      checkedDate,
      time,
      labourPayment,
    });

    const actualPo = await newLabour
      .save()
      .then(() => {
        res.send('New Data Added');
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  })
);

labourPaymentRouter.delete(
  '/delete/:id',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params);
    await LabourPayment.findByIdAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).send({ status: 'delete success' });
      })
      .catch((err) => {
        res.status(500).send({ status: 'delete error', error: err.message });
      });
  })
);

labourPaymentRouter.put(
  '/update/:id',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    await LabourPayment.findByIdAndUpdate(
      { _id: req.params.id },
      {
        siteId: req.body.siteId,
        siteName: req.body.siteName,
        date: req.body.date,
        labourPayment: req.body.labourPayment,
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

export default labourPaymentRouter;
