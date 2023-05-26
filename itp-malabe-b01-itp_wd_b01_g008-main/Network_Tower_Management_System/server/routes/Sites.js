const router = require("express").Router();
let Site = require("../models/siteinfo");
// create 
http://localhost:8070/sites/add
router.route("/add").post((req,res)=>{
    const siteID = req.body.siteID;
    const siteName = req.body.siteName;
    const towerOwner = req.body.towerOwner;
    const height = Number(req.body.height);
    const manual = req.body.manual;
    const commissioningPlan = Date(req.body.commissioningPlan);
    const province = req.body.province;
    
    const newSite = new Site({
        siteID,
        siteName, 
        towerOwner,
        height, 
        manual, 
        commissioningPlan, 
        province
    })
// ecsaption handling
    newSite.save().then(() => {
        res.json("Site Added")
    }).catch(err => {
        console.log(err);
    })

})
// Read
// http://localhost:8070/sites/
router.get("/").get((req, res) => {
    Site.find().then((Sites) => {
        res.json(Sites);
    }).catch((err) => {
        console.log(err);
    })
})

// Update
http://localhost:8070/sites/update/
router.route("/update/:siteID").put(async (req, res) => {
 /*asynchronous function (can run multiple funtions in same line) */
    let siteID = req.params.siteID;
    const {siteName, towerOwner, height, manual, commissioningPlan, province} = req.body; //destructure

    const updateSite = {
        siteName, towerOwner, height, manual, commissioningPlan, province
    }

    const update = await Site.findOneAndUpdate(siteID, updateSite)
    .then(() => {

    res.status(200).send({status: "Site updated", data: update})
 }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error updating site", error: err.message});
 })
})
//Delete
http://localhost:8070/sites/delete/
router.route("/delete/:siteID").delete(async (req, res) => {
    let siteID = req.params.siteID;

    await Site.findOneAndDelete(siteID).then(() => {
        res.status(200).send({status: "Site deleted"});
    }).catch(errr)
    console.log(errr.message);
    res.status(500).send({status: "Error with delete site", error: err.message
 });
});

// get requested site
router.route("/get/:id").get(async (req, res) => {
    let siteID = req.params.siteID;
    await Site.findOne(siteID).then(() => {
        res.status(200).send({status: "Site fetched", site: siteID})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});  
})

})

module.exports = router;