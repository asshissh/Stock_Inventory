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
  console.log(`${req.method} ${req.path} - Origin: ${req.get('Origin') || 'No origin'}`)
  next()
})

// CORS configuration - simplified for better compatibility
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://stock-inventory-z8ce.onrender.com",
      "https://stockwise-omega.vercel.app",
      "https://stock-inventory-pe4s.vercel.app"
    ];
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    // Allow all Vercel preview URLs
    if (origin.includes('vercel.app')) return callback(null, true);
    // Allow specific origins
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200
}));

// Handle preflight OPTIONS requests explicitly

//Routes
const companyRoutes = require("./routes/companyRoutes");
const stockRoutes = require("./routes/stockRoutes");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const whatsappRoutes = require("./routes/chatRoutes");

app.get("/",(req,res)=>{
  res.json({message: "Server is running", timestamp: new Date().toISOString()})
})

// Health check endpoint
app.get("/health",(req,res)=>{
  res.json({status: "OK", message: "Server is healthy"})
})

// Test CORS endpoint
app.get("/test-cors",(req,res)=>{
  res.json({message: "CORS test successful", origin: req.get('Origin')})
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

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });
