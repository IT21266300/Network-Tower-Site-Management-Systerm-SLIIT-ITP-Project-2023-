import express from 'express';
import TiInfo from '../../models/towerInfoModels/tiInfoModel.js';
import CivilInfo from '../../models/towerInfoModels/civilInfoModel.js';
import expressAsyncHandler from 'express-async-handler';

const filterSitesRouter = express.Router();

filterSitesRouter.get(
  '/filterSites',
  expressAsyncHandler(async (req, res) => {
    try {
      const tiSites = await TiInfo.distinct('siteId', {}, { lean: true });
      const civilSites = await CivilInfo.distinct('siteId', {}, { lean: true });
      const tiResult = [];
      const civilResult = [];
      for (let i = 0; i < tiSites.length; i++) {
        const tiSite = await TiInfo.findOne(
          { siteId: tiSites[i] },
          { _id: 0, siteId: 1, siteName: 1 }
        );
        tiResult.push(tiSite);
      }
      for (let i = 0; i < civilSites.length; i++) {
        const civilSite = await CivilInfo.findOne(
          { siteId: civilSites[i] },
          { _id: 0, siteId: 1, siteName: 1 }
        );
        civilResult.push(civilSite);
      }

      const joinedResult = [...tiResult, ...civilResult];

      const result = joinedResult.filter(
        (site, index, self) =>
          index ===
          self.findIndex(
            (s) => s.siteId === site.siteId && s.siteName === site.siteName
          )
      );

      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
);

export default filterSitesRouter;
