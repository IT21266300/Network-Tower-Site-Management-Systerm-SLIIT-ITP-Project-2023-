import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';

const signRouter = express.Router();

import Staff from '../../models/staffModels/staff.js';
import { generateToken } from '../../utils.js';


signRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const member = await Staff.findOne({username: req.body.username});
    if(member){
        if(bcrypt.compareSync(req.body.password, member.password)){
            res.send({
                mongoID: member._id,
                profileImage: member.profileImage,
                name: member.name,
                staffId: member.staffId,
                username: member.username,
                position: member.position,
                phone: member.phone,
                team: member.team,
                email: member.email,
                password: member.password,
                token: generateToken(member)
            })
            return;
        }
    }
    res.status(401).send({message: 'Invalid username or password'});
}))

export default signRouter;