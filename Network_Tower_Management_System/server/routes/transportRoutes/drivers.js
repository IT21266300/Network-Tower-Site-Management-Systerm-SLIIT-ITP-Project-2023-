// const router =require("express").Router();

import express from 'express';
import Driver from '../../models/transportModels/Driver.js';

// let Driver = require("../models/Driver");

const router = express.Router();

router.route('/add').post(async (req, res) => {
  const name = req.body.name;
  const license_number = req.body.license_number;
  const nic = req.body.nic;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;

  const existingData = await Driver.findOne({
    $and: [{ email }, { license_number }, { phone }, { nic }],
  });

  if (existingData) {
    return res.status(409).send('Data cannot be duplicated');
  }

  const newDriver = new Driver({
    name,
    license_number,
    nic,
    address,
    phone,
    email,
  });

  newDriver
    .save()
    .then(() => {
      res.json('Driver Added');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/').get((req, res) => {
  Driver.find()
    .then((drivers) => {
      res.json(drivers);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/update/:did').put(async (req, res) => {
  let userId = req.params.did;
  const { name, license_number, nic, address, phone, email } = req.body;

  const updateDriver = {
    name,
    license_number,
    nic,
    address,
    phone,
    email,
  };
  const update = await Driver.findByIdAndUpdate(userId, updateDriver)
    .then(() => {
      res.status(200).send({ status: 'User updated' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 'Error with updating data' });
    });
});

router.route('/delete/:did').delete(async (req, res) => {
  let userId = req.params.did;
  await Driver.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: 'User deleted' });
    })
    .catch((error) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: 'Error with delete user', error: err.message });
    });
});

// module.exports =router;
export default router;
