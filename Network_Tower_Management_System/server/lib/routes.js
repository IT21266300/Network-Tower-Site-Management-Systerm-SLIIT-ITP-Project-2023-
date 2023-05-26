import express from 'express';

// import sign in routes
import SignRouter from '../routes/signinRoutes/signin.js';

// import NTInfo routes
import civilInfoRouter from '../routes/towerInfoRoutes/civilInfoRouter.js';
import tiInfoRouter from '../routes/towerInfoRoutes/tiInfoRouter.js';
import Checklist from '../routes/towerInfoRoutes/Checklist.js';
import All from '../routes/towerInfoRoutes/dataRetrieveAll.js';
import Permission from '../routes/towerInfoRoutes/permissionRouter.js'



// import finance routes
import BudgetPoAmountRouter from '../routes/financeRoutes/budgetPoAmountRouter.js';
import ActualPoAmountRouter from '../routes/financeRoutes/actualPoAmountRouter.js';
import InvoiceAmountRouter from '../routes/financeRoutes/invoiceAmountRouter.js';
import CashCollectionRouter from '../routes/financeRoutes/cashCollectionRouter.js';
import MaterialPaymentRouter from '../routes/financeRoutes/materialPaymentRouter.js';
import LabourPaymentRouter from '../routes/financeRoutes/labourPaymentRouter.js';
import OtherPaymentRouter from '../routes/financeRoutes/otherPaymentRouter.js';
import AllRouter from '../routes/financeRoutes/allRetrieveDataRouter.js';
import filterSitesRouter from '../routes/filterSitesRoutes/index.js';

//import Contractor routes
import ContractorRouter from '../routes/contractorRoutes/contractors.js';

// import Staff routes
import StaffRouter from '../routes/staffRoutes/staff.js'

//import safety routes
import SafetyRouter from '../routes/safetyRoutes/safes.js'

// import transport routes
import Allocations from '../routes/transportRoutes/allocations.js';
import Drivers from '../routes/transportRoutes/drivers.js';
import Vehicles from '../routes/transportRoutes/vehicles.js';

// import contact routes
import ContactStaff from '../routes/contactRoutes/staffs.js'
import ContactContractor from '../routes/contactRoutes/contractors.js'
import ContactContClient from '../routes/contactRoutes/clients.js'

//import documents
import DocRouter from '../routes/docRoutes/doc.js'

const app = express.Router();


// make router paths

// sign in
app.use('/signroute', SignRouter);

//NTInfo

app.use('/civilInfo', civilInfoRouter)
app.use('/tiInfo', tiInfoRouter)
app.use('/Checklist', Checklist)
app.use('/nti_all', All)
app.use('/permission', Permission)


// finance
app.use('/budgetPoAmount', BudgetPoAmountRouter);
app.use('/actualPoAmount', ActualPoAmountRouter);
app.use('/invoiceAmount', InvoiceAmountRouter);
app.use('/cashCollection', CashCollectionRouter);
app.use('/materialPayment', MaterialPaymentRouter);
app.use('/labourPayment', LabourPaymentRouter);
app.use('/otherPayment', OtherPaymentRouter);
app.use('/all', AllRouter);
app.use('/filterSites', filterSitesRouter);

//Contractor
app.use('/contractor',ContractorRouter);

// staff
app.use('/staff', StaffRouter);

//safety
app.use('/safety', SafetyRouter);

//transport
app.use('/transportAllocation', Allocations);
app.use('/transportDriver', Drivers);
app.use('/transportVehicle', Vehicles);

//contact
app.use('/contactStaff', ContactStaff);
app.use('/contactContract', ContactContractor);
app.use('/contactClient', ContactContClient);


//doc
app.use('/doc', DocRouter);

export default app;
