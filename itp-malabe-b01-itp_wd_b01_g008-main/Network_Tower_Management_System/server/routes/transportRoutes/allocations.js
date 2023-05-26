// const router =require("express").Router();
import express from 'express';

import Allocation from '../../models/transportModels/Allocation.js';

const router = express.Router();

router.route('/add').post(async(req, res) => {
  const type = req.body.type;
  const location = req.body.location;
  const driver_id = req.body.driver_id;
  const vehicle_number = req.body.vehicle_number;
  const date = req.body.date;

  const reDate = new Date(req.body.date);
    const reTime = reDate.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Kolkata',
    };

    const checkedDate = reDate.toLocaleDateString('en-US', options);

    const time = reTime

    const existingData = await Allocation.findOne({
      $and: [{vehicle_number}, {driver_id}, { checkedDate }, { time }],
    });


    if (existingData) {
      return res
        .status(409)
        .send('Data cannot be duplicated');
    }

  const newAllocation = new Allocation({
    type,
    location,
    driver_id,
    vehicle_number,
    date,
    checkedDate,
    time
  });

  newAllocation
    .save()
    .then(() => {
      res.json('Allocation Added');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/').get((req, res) => {
  Allocation.find()
    .then((allocations) => {
      res.json(allocations);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/update/:aid').put(async (req, res) => {
  let userId = req.params.aid;
  const { type, location, driver_id, vehicle_number,date } = req.body;

  const updateAllocation = {
    type,
    location,
    driver_id,
    vehicle_number,
    date,
  };
  const update = await Allocation.findByIdAndUpdate(userId, updateAllocation)
    .then(() => {
      res.status(200).send({ status: 'User updated'});
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: 'Error with updating data'});
    });
});

router.route('/delete/:aid').delete(async (req, res) => {
  let userId = req.params.aid;
  await Allocation.findByIdAndDelete(userId)
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
