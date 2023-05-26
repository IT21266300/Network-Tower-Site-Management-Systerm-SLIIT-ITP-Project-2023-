import express from 'express';
import InvoiceAmount from '../../models/financeModels/invoiceAmountModel.js';
import Counter from '../../models/financeModels/counterModel.js';
import expressAsyncHandler from 'express-async-handler';

const invoiceAmountRouter = express.Router();

invoiceAmountRouter.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    try {
      const cd = await Counter.findOneAndUpdate(
        { id: 'autoval' },
        { $inc: { seq: 1 } },
        { new: true }
      ).exec();

      let seqId;
      if (cd == null) {
        const newval = new Counter({ id: 'autoval', seq: 1 });
        await newval.save();
        seqId = 1;
      } else {
        seqId = cd.seq;
      }

      const siteId = req.body.siteId;
      const siteName = req.body.siteName;
      const date = req.body.date;
      const invoiceNo = seqId;
      const invoiceAmountExTax = req.body.invoiceAmountExTax;
      const taxAmount = req.body.taxAmount;
      const invoiceAmountInTax = req.body.invoiceAmountInTax;

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

      const existingData = await InvoiceAmount.findOne({
        $and: [{ checkedDate }, { time }],
      });

      if (existingData) {
        return res
          .status(409)
          .send('Data with same date and time already exists');
      }

      const newInvoiceAmount = new InvoiceAmount({
        siteId,
        siteName,
        date,
        checkedDate,
        time,
        invoiceNo,
        invoiceAmountExTax,
        taxAmount,
        invoiceAmountInTax,
      });

      await newInvoiceAmount.save();
      res.send('New Data Added');
    } catch (err) {
      console.log('Error: ', err);
    }
  })
);

invoiceAmountRouter.delete(
  '/delete/:id',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params);
    await InvoiceAmount.findByIdAndDelete({ _id: req.params.id })
      .then(() => {
        res.status(200).send({ status: 'delete success' });
      })
      .catch((err) => {
        res.status(500).send({ status: 'delete error', error: err.message });
      });
  })
);

invoiceAmountRouter.put(
  '/update/:id',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    await InvoiceAmount.findByIdAndUpdate(
      { _id: req.params.id },
      {
        siteId: req.body.siteId,
        siteName: req.body.siteName,
        date: req.body.date,
        // invoiceNo: req.body.invoiceNo,
        invoiceAmountExTax: req.body.invoiceAmountExTax,
        taxAmount: req.body.taxAmount,
        invoiceAmountInTax: req.body.invoiceAmountInTax,
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

export default invoiceAmountRouter;
