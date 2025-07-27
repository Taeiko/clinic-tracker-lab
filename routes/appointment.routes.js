const Appointment = require("../models/Appointment")
const router = require("express").Router()


// create appointment
router.get("/new", async (req,res) =>{
    res.render("appointment/new.ejs")
})

router.post("/" , async (req, res)=>{
try {
    console.log(req.body)
    await Appointment.create(req.body)
    res.redirect("appointments/new")
} catch (error) {
    console.log("failed to create appointment", error)
}
})

// list appointments
router.get("/", async(req,res)=>{
    try {
        const allAppointments = await Appointment.find()
        res.render("appointments/all-appointments.ejs", {allAppointments: allAppointments})
    } catch (error){
        console.log("failed to fetch appointment list", error)
    }
})

module.exports = router