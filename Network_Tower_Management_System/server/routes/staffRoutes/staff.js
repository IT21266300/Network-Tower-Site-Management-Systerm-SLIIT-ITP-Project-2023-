import express from 'express';
import Staff from '../../models/staffModels/staff.js';
import bcrypt from 'bcryptjs';
import multer from 'multer';

const router = express.Router();

const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single('testImage');


router.route('/add').post(async (req, res) => {
  
  const staffId = Number(req.body.staffId);
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const position = req.body.position;
  const team = req.body.team;
  const nic = req.body.nic;
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password);


  const existingUser = await Staff.findOne({
    $or: [{ username }, { staffId }, { email }, {nic}],
  });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: 'Username or staffID already in use' });
  }

  const newStaff = new Staff({
    staffId,
    name,
    phone,
    email,
    position,
    team,
    nic,
    username,
    password,
  });

  newStaff
    .save()
    .then(() => {
      res.json('Staff Added');
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});


router.route('/').get((req, res) => {
  Staff.find()
    .then((staff) => {
      res.json(staff);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/update/:staffId').put(async (req, res) => {
  let userId = req.params.staffId;
  const { staffId, name, phone, email, position, team, nic, username } = req.body;

  const password = bcrypt.hashSync(req.body.password);

  const existingUser = await Staff.findOne({
    $or: [{ username }, { staffId }, {nic}],
  });
  if (existingUser && existingUser.staffId != userId) {
    return res
      .status(409)
      .json({ message: 'Username or staffID already in use by another user' });
  }

  const updateStaff = {
    staffId,
    name,
    phone,
    email,
    position,
    team,
    nic,
    username,
    password,
  };
  const update = await Staff.findOneAndUpdate({ staffId: userId }, updateStaff)
    .then(() => {
      res.status(200).send({ status: 'User Updated' });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err.message });
    });
});

router.route('/delete/:staffId').delete(async (req, res) => {
  let userId = req.params.staffId;

  await Staff.findByIdAndDelete({ _id: userId })
    .then(() => {
      res.status(200).send({ status: 'User Deleted' });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: 'Error with deleting user', error: err.message });
    });
});

router.route('/get/:staffId').get(async (req, res) => {
  let userId = req.params.staffId;
  const staff = await Staff.findOne({ staffId: userId })
    .then((staff) => {
      res.status(200).send({ status: 'User fetched', staff: staff });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// module.exports=router;
export default router;
