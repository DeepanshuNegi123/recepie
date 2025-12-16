const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const  jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    console.log("Registration request body:", req.body);
    
    const { username, email, password } = req.body; // Destructure form data
    

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: "All fields (username, email, password) are required",
        received: { 
          username: !!username, 
          email: !!email, 
          password: !!password 
        }
      });
    }

    // Check for existing user by both email and username
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      const conflictField = existingUser.email === email ? 'email' : 'username';
      return res.status(409).json({ 
        message: `User with this ${conflictField} already exists`,
        conflict: conflictField
      });
    }

    // Create user (password will be hashed by pre-save hook)
    const newUser = new User({ 
      username: username.trim(), 
      email: email.toLowerCase().trim(), 
      password 
    });

    await newUser.save();
    
    console.log("New user created:", { 
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    
    });

    return res.status(201).json({ 
      success: true,
      message: "User registered successfully!",
      user: { 
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (err) {
  console.error("Registration error:", err);

  // If duplicate key (username/email already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
      conflict: field
    });
  }

  // For all other errors, return full error for debugging
  return res.status(500).json({
    success: false,
    message: "Registration failed",
    error: err.message,    // <-- show exact error
    stack: err.stack       // <-- optional, shows line of error
  });
}


};




const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

  
    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Authentication failed",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};





const profilecontroller = async (req, res) => {
  try {
    const authheader = req.headers["authorization"];
    
    // Debug log
    console.log("Authorization header:", authheader);
    
    if (!authheader) {
      return res.status(401).json({ message: "No authorization header provided" });
    }
    
    const token = authheader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    console.log("Token received:", token.substring(0, 20) + "...");

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        return res.status(403).json({ 
          message: "Invalid or expired token",
          error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }

      return res.json({ 
        message: "Profile information",
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    });

  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ 
      message: "Profile failed",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

module.exports = { registerController, loginController , profilecontroller};
