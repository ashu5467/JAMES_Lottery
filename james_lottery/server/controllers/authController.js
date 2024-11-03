const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// exports.login = async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       const user = await User.findOne({ username });
  
//       console.log("User from DB:", user); // Debugging line
  
//       if (user) {
//         console.log("Password Comparison:", password, user.password); // Debugging line
//         if (await bcrypt.compare(password, user.password)) {
//           const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "defaultSecretKey", { expiresIn: "1h" });
//           return res.status(200).json({ message: "Login successful", token });
//         }
//       }
//       res.status(401).json({ error: "Invalid username or password" });
//     } catch (error) {
//       res.status(500).json({ error: "Login failed" });
//     }
//   };
  
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "defaultSecretKey", { expiresIn: "1h" });
      return res.status(200).json({ message: "Login successful", token , userId: user._id});
    }

    return res.status(401).json({ error: "Invalid username or password" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

