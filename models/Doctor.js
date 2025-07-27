const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema({
    name:{
        type: String
    },
    specialty:{
        type: String
    },
    yearsOfExperience:{
        type: Number
    }
})
const Doctor = mongoose.model("Doctor",doctorSchema)
module.exports = Doctor 