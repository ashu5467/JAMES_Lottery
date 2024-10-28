const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
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
  
      // Log the incoming request body
      console.log("Request Body:", req.body); 
  
      // Find the user by username
      const user = await User.findOne({ username });
      console.log("User from DB:", user); // Debugging line
  
      // Check if user exists
      if (user) {
        console.log("Password Comparison:", password, user.password); // Debugging line
        // Compare the password
        if (await bcrypt.compare(password, user.password)) {
          // If the password matches, return a token
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "defaultSecretKey", { expiresIn: "1h" });
          return res.status(200).json({ message: "Login successful", token });
        }
      }
  
      // Always return success for testing purposes, regardless of credentials
      return res.status(200).json({ message: "Login successful (testing mode)", token: "dummy-token" });
    } catch (error) {
      console.error("Error during login:", error); // Log any error
      res.status(500).json({ error: "Login failed" });
    }
  };
  