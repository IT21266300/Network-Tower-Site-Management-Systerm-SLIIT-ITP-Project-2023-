//insert
import express from 'express';
import Staff from '../../models/contactModels/staff.js';

const router = express.Router();


router.route("/add").post((req,res)=>{
    const staffId = req.body.staffId;
    const name = req.body.name;
    const nic = req.body.nic;
    const address = req.body.address;
    const phone = req.body.phone;
    const siteId = req.body.siteId;
    const email = req.body.email;

    const newStaff = new Staff({
        staffId,
        name,
        nic,
        address,
        phone,
        siteId,
        email
    })

    newStaff.save().then(()=>{
        res.json("Staff Added")
    }).catch((err)=>{
        console.log(err);
    })
})


//read

router.route("/").get((req,res)=>{
    Staff.find().then((staffs)=>{
        res.json(staffs)
    }).catch((err)=>{
        console.log(err)
    })
})

//update

router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const {name,nic,address,phone,staffId,siteId,email} = req.body;

    const updateStaff = {
        name,
        nic,
        address,
        phone,
        staffId,
        siteId,
        email
    }

    const update = await Staff.findByIdAndUpdate(userId,updateStaff).then(()=>{
        res.status(200).send({status: "Updated"})
    }).catch((err)=>{
        console.log(err);
    })  
})

//delete

router.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id;

    await Staff.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Delete"})
    }).catch((err)=>{
        console.log(err);
    })  

})

// module.exports = router;
export default router;





