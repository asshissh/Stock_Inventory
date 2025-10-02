const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables immediately
dotenv.config();

const app = express()
app.use(express.json())

//global erroHandeler
const errorHandler = require('./middlewares/ExpressError')

//log all request 
app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://stock-inventory-z8ce.onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  })
)
//Routes
const companyRoutes = require("./routes/companyRoutes");
const stockRoutes = require("./routes/stockRoutes");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const whatsappRoutes = require("./routes/chatRoutes");

app.get("/",(req,res)=>{
  res.json("/route here")
})

//routes
app.use("/api/auth",authRoutes);
app.use("/api/dashboard/companies",companyRoutes)
app.use("/api/dashboard/companies/data",dataRoutes)
app.use("/api/dashboard/companies/data/prediction",predictionRoutes)
app.use("/api/dashboard/companies/chat",whatsappRoutes)
app.use("/api/dashboard/companies/:companyId/stocks",stockRoutes)
// Start server

app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI).then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log(
      `Connected to DB & Server running on port http://localhost:${process.env.PORT}`
    )
  })
})
