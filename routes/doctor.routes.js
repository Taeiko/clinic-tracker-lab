const Doctor = require("../models/Doctor")
// route it 
const router = require("express").Router()

// list all of the doctors 
router.get("/new", async (req,res) =>{
    res.render("doctors/new.ejs")
})


router.post("/", async (req, res) =>{
    try {
        console.log(req.body)
        await Doctor.create(req.body)
        res.redirect("doctors")
    } catch (error) {
        console.log(error)
    } 
})

router.get("/", async(req,res)=>{
    try {
        const allDocs = await Doctor.find()
        console.log(allDocs)
        res.render("doctors/all-doctors.ejs", {allDocs: allDocs})
    } catch (error) {
        console.log("failed to fetch doctor list",error)
    }
})

router.get("/:doctorId", async (req,res)=>{
    try {
        const foundDoc = await Doctor.findById(req.params.doctorId)
        console.log(foundDoc)
        res.render("doctors/doctor-details.ejs", {foundDoc: foundDoc})
    } catch (error) {
        console.log(error)
    }

})

module.exports = router