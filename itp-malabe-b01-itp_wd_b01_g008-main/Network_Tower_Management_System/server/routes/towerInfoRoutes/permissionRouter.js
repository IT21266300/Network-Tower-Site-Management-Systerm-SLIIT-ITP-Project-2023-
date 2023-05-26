import express from 'express';
import Doc from '../../models/towerInfoModels/permission.js';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// file controller
import multer from "multer";
import upload from '../../multer.js';
import Permission from '../../models/towerInfoModels/permission.js';

const router = express.Router();



router.route('/add').post(upload.single("file"), (req, res) => {
  const siteId = req.body.siteId;
  const siteName = req.body.siteName;
  const file = req.file.path;

  const newDoc = new Permission({
    siteId,
    siteName,
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

router.route('/download/:id').get(async (req, res) => {
  const { id } = req.params;
  const item = await Permission.findById(id);
  if (!item) {
    return res.status(404).send('No item found');
  }

  const file = item.file;
  const filePath = path.join(__dirname, '../../ ${file}');
  res.download(filePath);
});

// router.route('/download/:id').get(async(req, res) => {
//   const { id } = req.params;
//   const item = await Permission.findById(id);
//   if (!item) {
//     return res.status(404).send("No item found");
//   }

//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);
//   const file = item.file;
//   console.log(file)
//   const filePath = path.join(__dirname, `../../${file}`);
//   res.download(filePath);
// })

// router.route('/download/:siteId').get((req, res) => {
//   const siteId = req.params.siteId;

//   Permission.findOne({ siteId: siteId }, (err, document) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json('Error occurred');
//     } else {
//       if (!document) {
//         res.status(404).json('Document not found');
//       } else {
//         const __filename = fileURLToPath(import.meta.url);
//         const __dirname = dirname(__filename);
//         const file = item.file;
//   console.log(file)
//         const filePath = path.join(__dirname, `../../${file}`);
//         res.download(filePath, (err) => {
//           if (err) {
//             console.log(err);
//             res.status(500).json('Error occurred during download');
//           }
//         });
//       }
//     }
//   });
// });

// router.route('/download/:siteId').get(async (req, res) => {
//   const { siteId } = req.params;
  
//   try {
//     const permission = await Permission.findOne({ siteId });
//     if (!Permission) {
//       return res.status(404).send("No item found");
//     }

//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = dirname(__filename);
//     const file = Permission.file;
//     const filePath = path.join(__dirname, `../../${file}`);
//     res.download(filePath);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error");
//   }
// });

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
  const { siteId, siteName} = req.body;

  const updateDoc = {
    siteId,
    siteName,
    
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