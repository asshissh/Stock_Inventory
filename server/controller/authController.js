const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  
  try {
    console.log("Login attempt for email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", user._id);
      return res.status(400).json({ error: "Invalid email or password" });
    }
    
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({ error: "Server configuration error" });
    }
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    
    const userResponse = { 
      _id: user._id, 
      username: user.username, 
      email: user.email, 
      token 
    };
    
    console.log("Login successful for user:", user._id);
    res.json(userResponse);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};
const signup = async (req, res) => {
  try {
    console.log("Signup request received:", req.body);
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      console.log("Missing required fields");
      return res.status(400).json({ error: "Username, email, and password are required" });
    }
    
    if (password.length < 6) {
      console.log("Password too short");
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    
    console.log("Signup attempt for email:", email, "username:", username);
    
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        console.log("Username already exists:", username);
        return res.status(400).json({ error: "Username is already taken" });
      }
      if (existingUser.email === email) {
        console.log("Email already exists:", email);
        return res.status(400).json({ error: "Email is already registered" });
      }
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({ error: "Server configuration error" });
    }
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    
    const userResponse = { 
      _id: user._id, 
      username: user.username, 
      email: user.email,
      token 
    };
    
    console.log("Signup successful for user:", user._id);
    res.status(201).json(userResponse);
  } catch (err) {
    console.error("Signup error:", err);
    console.error("Error stack:", err.stack);
    res.status(400).json({ error: err.message });
  }
};
module.exports={
    signup,
    login
}