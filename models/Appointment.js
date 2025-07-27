const mongoose = require("mongoose")
const { type } = require("os")
const notesSchema = new mongoose.Schema({
    notes: String
})
const appointmentSchema = new mongoose.Schema({
    patientName:{
        type: String
    },
    date:{
        type: Date
    },
    reason:{
        type: String
    },
    doctor:{
        // i want the id of the doctor
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    notes: [notesSchema]
})

// models
const Appointment = mongoose.model("Appointment", appointmentSchema)

// export to other files
module.exports = Appointment