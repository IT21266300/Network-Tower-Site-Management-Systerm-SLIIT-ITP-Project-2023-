import express from 'express';

// import models
import civilInfo from '../../models/towerInfoModels/civilInfoModel.js';
import tiInfo from '../../models/towerInfoModels/tiInfoModel.js';


const allRouter = express.Router();

allRouter.get('/', async (req, res) => {
    try{
        const civil_info = await civilInfo.find({});
        const ti_info = await tiInfo.find({});
       
        const data = {
            civilInfo: civil_info,
            tiInfo: ti_info,
           
            // toBeCashCollection: toBeCash,
        };
        res.send(data);
    } catch (err) {
        console.log("🚀 ~ file: allRetrieveDataRouter.js:18 ~ allRouter.get ~ err:", err)
        res.status(500).json({ message: 'Data Retrieve failed' });
    }
})

export default allRouter;
