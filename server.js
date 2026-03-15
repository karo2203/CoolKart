const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const menuRoutes = require("./routes/menuRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.error("MongoDB connection error:",err))

app.use("/api/auth", authRoutes)
app.use("/api/menu", menuRoutes)
app.use("/api/orders", orderRoutes)

app.get("/",(req,res)=>{
res.send("Stallify API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
console.log(`Server running on http://localhost:${PORT}`)
})
