//insert
// const router = require("express").Router();
// let client = require("../models/client");

import express from 'express';
import Client from '../../models/contactModels/client.js';
const router = express.Router();

router.route('/add').post(async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const clientId = req.body.clientId;
  const email = req.body.email;

  const existingData = await Client.findOne({
    $and: [{ email }, { phone }, { clientId }],
  });

  if (existingData) {
    return res.status(409).send('Data cannot be duplicated');
  }

  const newClient = new Client({
    name,
    address,
    phone,
    clientId,
    email,
  });

  newClient
    .save()
    .then(() => {
      res.json('Client Added');
    })
    .catch((err) => {
      console.log(err);
    });
});

//read

router.route('/').get((req, res) => {
  Client.find()
    .then((clients) => {
      res.json(clients);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update

router.route('/update/:id').put(async (req, res) => {
  let userId = req.params.id;
  const { name, address, phone, clientId, email } = req.body;

  const updateClient = {
    name,
    address,
    phone,
    clientId,
    email,
  };

  const update = await Client.findByIdAndUpdate(userId, updateClient)
    .then(() => {
      res.status(200).send({ status: 'Updated' });
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete

router.route('/delete/:id').delete(async (req, res) => {
  let userId = req.params.id;

  await Client.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: 'Delete' });
    })
    .catch((err) => {
      console.log(err);
    });
});

// module.exports = router;
export default router;
