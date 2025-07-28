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

// update appointment 

router.get("/edit/:appointmentId", async (req,res)=>{
    try {
        const allDocs = await Doctor.find()
        const foundAppointment = await Appointment.findById(req.params.appointmentId)
        res.render("appointments/update.ejs", {foundAppointment: foundAppointment, allDocs: allDocs})
    } catch (error) {
        console.log("failed to update", error)
    }
})

router.put("/edit/:appointmentId", async (req,res)=>{
    try {
        const allDocs = await Doctor.find()
        const foundAppointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body).populate("doctor")
        res.redirect(`/appointments/${req.params.appointmentId}`)
    } catch (error) {
        console.log("failed to update", error)
    }
})



// delete appointment 
router.post('appointments/delete/:id', async (req,res)=>{
    try {
        const deletedAppointmnt = await Appointment.findByIdAndDelete(req.params.id)
            res.redirect('/appointments')
    } catch (error) {
        console.log("failed to fetch appointment list", error)
    }
})





module.exports = router