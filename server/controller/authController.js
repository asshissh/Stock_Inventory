const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errro: "Password doesnot match" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username == username) {
        return res.status(400).json("Username is already existing");
      }
      if ((existingUser.email === email)) {
        return res.status(400).json("email already existing");
      }
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = new User({username,email,password:hashedPassword})
    await user.save()
    res.status(202).json({message:"You are login"})
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
module.exports={
    signup,
    login
}