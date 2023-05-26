import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import CivilInfo from '../../models/towerInfoModels/civilInfoModel.js';

const civilInfoRouter = express.Router();


civilInfoRouter.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    // Check if siteId or siteName already exists in the database
    const existingCivilInfo = await CivilInfo.findOne({ 
      $or: [{ siteId: req.body.siteId }, { siteName: req.body.siteName }] });
    if (existingCivilInfo) {
      return res
      .status(409)
      .json({ message: 'Site ID or Site Name already in use' });
    }

    const newCivilInfo = new CivilInfo({
      siteId: req.body.siteId,
      siteName: req.body.siteName,
      date: req.body.date,
      towerOwner: req.body.towerOwner,
      height: req.body.height,
      contractor: req.body.contractor,
      region: req.body.region,
      status: req.body.status,
    });

    const civilIn = await newCivilInfo
      .save()
      .then(() => {
        res.send('New Data Added');
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  })
);




//read
civilInfoRouter.route("/").get((req, res) => {
  CivilInfo.find().then((civilInfoModel) => {
      res.json(civilInfoModel);
  }).catch((err) => {
      console.log(err);
  })
})


//read using site Id
civilInfoRouter.get("/:siteId", (req, res) => {
  const { siteId } = req.params;
  CivilInfo.findOne({ siteId }).then((civilInfoModel) => {
      res.json(civilInfoModel);
  }).catch((err) => {
      console.log(err);
  })
});


//delete

civilInfoRouter.delete(
  '/delete/:id',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params);
    await CivilInfo.findOneAndDelete({ siteId: req.params.id })
      .then(() => {
        res.status(200).send({status: "delete success"});
      })
      .catch((err) => {
        res.status(500).send({status: "delete error", error: err.message});
      });
  })
);



//Update
civilInfoRouter.put(
  '/update/:id',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    await CivilInfo.findOneAndUpdate(
      { siteId: req.params.id },
      {
        siteId: req.body.siteId,
        siteName: req.body.siteName,
        towerOwner: req.body.towerOwner,
        height: req.body.height,
        contractor: req.body.contractor,
        region: req.body.region,
        status: req.body.status,
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

export default civilInfoRouter;