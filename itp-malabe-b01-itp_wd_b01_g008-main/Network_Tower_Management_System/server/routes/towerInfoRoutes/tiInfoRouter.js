import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import TiInfo from '../../models/towerInfoModels/tiInfoModel.js';

const tiInfoRouter = express.Router();

//create
// tiInfoRouter.post(
//   '/add',
//   expressAsyncHandler(async (req, res) => {
//     const newTiInfo = new TiInfo({
//       siteId: req.body.siteId,
//       siteName: req.body.siteName,
//       date: req.body.date,
//       towerOwner: req.body.towerOwner,
//       height: req.body.height,
//       manual: req.body.manual,
//       commissioningPlan: req.body.commissioningPlan,
//       ranClusOwner: req.body.ranClusOwner,
//       province: req.body.province,
//       status: req.body.status,
//     });

//     const tiIn = await newTiInfo
//       .save()
//       .then(() => {
//         return res.send('New Data Added');
//       })
//       .catch((err) => {
//         console.log('Error: ', err);
//       });
//   })
// );


tiInfoRouter.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    const existingTiInfo = await TiInfo.findOne({
      $or: [{ siteId: req.body.siteId }, { siteName: req.body.siteName }],
    });
    
    if (existingTiInfo) {
      return res
      .status(409)
      .json({ message: 'Site ID or Site Name already in use' });
    }

    const newTiInfo = new TiInfo({
      siteId: req.body.siteId,
      siteName: req.body.siteName,
      date: req.body.date,
      towerOwner: req.body.towerOwner,
      height: req.body.height,
      manual: req.body.manual,
      commissioningPlan: req.body.commissioningPlan,
      ranClusOwner: req.body.ranClusOwner,
      province: req.body.province,
      status: req.body.status,
    });

    const tiIn = await newTiInfo
      .save()
      .then(() => {
        return res.send('New Data Added');
      })
      .catch((err) => {
        console.log(err);
      });
  })
);




//read
tiInfoRouter.route("/").get((req, res) => {
  TiInfo.find().then((tiInfoModel) => {
      res.json(tiInfoModel);
  }).catch((err) => {
      console.log(err);
  })
})


//read using site Id
tiInfoRouter.get("/:siteId", (req, res) => {
  const { siteId } = req.params;
  TiInfo.findOne({ siteId }).then((tiInfoModel) => {
      res.json(tiInfoModel);
  }).catch((err) => {
      console.log(err);
  })
});

//delete

tiInfoRouter.delete(
  '/delete/:id',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params);
    await TiInfo.findOneAndDelete({ siteId: req.params.id })
      .then(() => {
        res.status(200).send({status: "delete success"});
      })
      .catch((err) => {
        res.status(500).send({status: "delete error", error: err.message});
      });
  })
);

//Update
  tiInfoRouter.put(
  '/update/:id',
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    await TiInfo.findOneAndUpdate(
      { siteId: req.params.id },
      {
        siteId: req.body.siteId,
        siteName: req.body.siteName,
        towerOwner: req.body.towerOwner,
        height: req.body.height,
        manual: req.body.manual,
        commissioningPlan: req.body.commissioningPlan,
        ranClusOwner: req.body.ranClusOwner,
        province: req.body.province,
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

export default tiInfoRouter;