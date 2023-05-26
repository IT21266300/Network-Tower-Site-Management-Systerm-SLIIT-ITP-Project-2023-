import express from 'express';

// import models
import ActualPoAmount from '../../models/financeModels/actualPoAmountModel.js';
import BudgetPoAmount from '../../models/financeModels/budgetPoAmountModel.js';
import InvoiceAmount from '../../models/financeModels/invoiceAmountModel.js';
import CashCollection from '../../models/financeModels/cashCollectionModel.js';
import LabourPayment from '../../models/financeModels/labourPaymentModel.js';
import MaterialPayment from '../../models/financeModels/materialPaymentModel.js';
import OtherPayment from '../../models/financeModels/otherPaymentModel.js';
import ToBeCashCollection from '../../models/financeModels/toBeCashCollectionModel.js';
import expressAsyncHandler from 'express-async-handler';

const allRouter = express.Router();

allRouter.get('/', async (req, res) => {
  try {
    const actualPo = await ActualPoAmount.find({});
    const budgetPo = await BudgetPoAmount.find({});
    const invoiceAm = await InvoiceAmount.find({});
    const cashCol = await CashCollection.find({});
    const labourPay = await LabourPayment.find({});
    const materialPay = await MaterialPayment.find({});
    const otherPay = await OtherPayment.find({});

    const data = {
      actualPoAmount: actualPo,
      budgetPoAmount: budgetPo,
      invoiceAmount: invoiceAm,
      cashCollection: cashCol,
      materialPayment: materialPay,
      labourPayment: labourPay,
      otherPayment: otherPay,
    };
    res.send(data);
  } catch (err) {
    console.log(
      '🚀 ~ file: allRetrieveDataRouter.js:18 ~ allRouter.get ~ err:',
      err
    );
    res.status(500).json({ message: 'Data Retrieve failed' });
  }
});

allRouter.get('/siteSummary/:siteId', async (req, res) => {
  try {
    const budgetPo = await BudgetPoAmount.find({
      siteId: req.params.siteId,
    });
    const actualPo = await ActualPoAmount.find({
      siteId: req.params.siteId,
    });
    const invoiceAm = await InvoiceAmount.find({
      siteId: req.params.siteId,
    });
    const cashCol = await CashCollection.find({
      siteId: req.params.siteId,
    });
    const labourPay = await LabourPayment.find({
      siteId: req.params.siteId,
    });
    const materialPay = await MaterialPayment.find({
      siteId: req.params.siteId,
    });
    const otherPay = await OtherPayment.find({
      siteId: req.params.siteId,
    });

    const data = {
      budgetPoAmount: budgetPo,
      actualPoAmount: actualPo,
      invoiceAmount: invoiceAm,
      cashCollection: cashCol,
      materialPayment: materialPay,
      labourPayment: labourPay,
      otherPayment: otherPay,
    };
    res.send(data);
  } catch (err) {
    console.log(
      '🚀 ~ file: allRetrieveDataRouter.js:18 ~ allRouter.get ~ err:',
      err
    );
    res.status(500).json({ message: 'Data Retrieve failed' });
  }
});

export default allRouter;
