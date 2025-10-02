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
      return res.status(400).json({ error: "Password does not match" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    const userResponse = { _id: user._id, username: user.username, email: user.email, token };
    res.json(userResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username == username) {
        return res.status(400).json({ error: "Username is already existing" });
      }
      if ((existingUser.email === email)) {
        return res.status(400).json({ error: "Email already existing" });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const userResponse = { _id: user._id, username: user.username, email: user.email };
    res.status(201).json(userResponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports={
    signup,
    login
}