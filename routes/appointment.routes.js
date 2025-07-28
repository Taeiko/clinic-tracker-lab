const Appointment = require("../models/Appointment")
const Doctor = require("../models/Doctor")
const router = require("express").Router()


// create appointment
router.get("/new", async (req,res) =>{
    const allDocs = await Doctor.find()
    res.render("appointments/new.ejs", {allDocs: allDocs})
})

router.post("/" , async (req, res)=>{
try {
    console.log(req.body)
    await Appointment.create(req.body)
    res.redirect("appointments")
} catch (error) {
    console.log("failed to create appointment", error)
}
})

// list appointments
router.get("/", async(req,res)=>{
    try {
        const allAppointments = await Appointment.find().populate('doctor')
        console.log(allAppointments)
        res.render("appointments/all-appointments.ejs", {allAppointments: allAppointments})
    } catch (error){
        console.log("failed to fetch appointment list", error)
    }
})


// get appointment by id 
router.get("/:appointmentId", async (req,res)=>{
    try { const foundAppointment = await Appointment.findById(req.params.appointmentId).populate("doctor")
        res.render("appointments/appointment-details.ejs",{foundAppointment: foundAppointment})
    } catch (error){

    }
})  
module.exports = router