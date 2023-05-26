import express from 'express';
import Doc from '../../models/documentModels/doc.js';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// file controller
import multer from "multer";
import upload from '../../multer.js';

const router = express.Router();



router.route('/add').post(upload.single("file"), (req, res) => {
  const siteId = req.body.siteId;
  const siteName = req.body.siteName;
  const status = req.body.status;
  const file = req.file.path;

  const newDoc = new Doc({
    siteId,
    siteName,
    status,
    file
  });

  newDoc
    .save()
    .then(() => {
      res.json('Document Added');
    })
    .catch((err) => {
      console.log(err);
    });
});


router.route('/download/:id').get(async(req, res) => {
  const { id } = req.params;
  const item = await Doc.findById(id);
  if (!item) {
    return next(new Error("No item found"));
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const file = item.file;
  console.log(file)
  const filePath = path.join(__dirname, `../../${file}`);
  res.download(filePath);
})

router.route('/').get((req, res) => {
  Doc.find()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/update/:siteId').put(async (req, res) => {
  let userId = req.params.siteId;
  const { siteId, siteName, status} = req.body;

  const updateDoc = {
    siteId,
    siteName,
    status,
  }
  const update = await Doc.findByIdAndUpdate(userId, updateDoc)
    .then(() => {
      res.status(200).send({ status: 'Document Updated' });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: 'Error with updating document', error: err.message });
    });
});

router.route('/delete/:id').delete(async (req, res) => {
  let userId = req.params.id;

  await Doc.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: 'Document Deleted' });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: 'Error with deleting document', error: err.message });
    });
});

router.route('/get/:siteId').get(async (req, res) => {
  let userId = req.params.siteId;
  const doc = await Doc.findById(userId)
    .then((doc) => {
      res.status(200).send({ status: 'Document fetched', doc: doc });
    })
    .catch(() => {
      console.log(err.message);
    });
});


// module.exports=router;
export default router;
