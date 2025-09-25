const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Company = require("../models/companyModel");

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware to save redirect URL (if using sessions)
const saveRedirectUrl = (req, res, next) => {
  if (req.session && req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// Middleware to check if user is the owner of a company
const isOwner = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res.status(400).json({ error: "Company ID is required" });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    if (!company.owner.equals(req.user._id)) {
      return res.status(401).json({ error: "You do not have permission to access this resource" });
    }

    next();
  } catch (error) {
    console.error("Owner check error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Middleware to authenticate user and attach full user object
const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization header is missing or malformed" });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token: user not found" });
    }

    req.user = user; // attach full user object
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  isLoggedIn,
  saveRedirectUrl,
  isOwner,
  isAuthenticated,
};
