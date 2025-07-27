const express = require("express")
const app = express() //make the app work
const dotenv = require('dotenv').config() //allows use of .env in this file 
const morgan = require("morgan")
const methodOverride = require("method-override")
const connectToDB = require("./config/db")
const doctorRoutes = require("./routes/doctor.routes")
const appointmentRoutes = require("./routes/appointment.routes")



// middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

// database connection 
connectToDB()

// routes
app.use("/doctors", doctorRoutes)
app.use("/appointments", appointmentRoutes)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log("Listening on port " + port)
}) // Listen on port 3000
