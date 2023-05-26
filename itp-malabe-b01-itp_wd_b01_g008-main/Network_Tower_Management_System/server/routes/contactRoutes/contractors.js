//insert
// const router = require("express").Router();
// let contractor = require("../models/contractor");
import express from 'express';
import Contractor from '../../models/contactModels/contractor.js';

const router = express.Router();

router.route('/add').post(async(req, res) => {
  const name = req.body.name;
  const nic = req.body.nic;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;

  const existingData = await Contractor.findOne({
    $and: [{ email }, { phone }, { nic }],
  });

  if (existingData) {
    return res.status(409).send('Data cannot be duplicated');
  }

  const newStaff = new Contractor({
    name,
    nic,
    address,
    phone,
    email,
  });

  newStaff
    .save()
    .then(() => {
      res.json('Contractor Added');
    })
    .catch((err) => {
      console.log(err);
    });
});

//read

router.route('/').get((req, res) => {
    Contractor
    .find()
    .then((contractors) => {
      res.json(contractors);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update

router.route('/update/:id').put(async (req, res) => {
  let userId = req.params.id;
  const { name, nic, address, phone, email } = req.body;

  const updateContractor = {
    name,
    nic,
    address,
    phone,
    email,
  };

  const update = await Contractor
    .findByIdAndUpdate(userId, updateContractor)
    .then(() => {
      res.status(200).send({ status: 'Updated'});
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete

router.route('/delete/:id').delete(async (req, res) => {
  let userId = req.params.id;

  await Contractor
    .findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: 'Delete' });
    })
    .catch((err) => {
      console.log(err);
    });
});

// module.exports = router;
export default router;
