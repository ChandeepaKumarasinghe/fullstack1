// // export default router;
import express from "express";
import { Admin } from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const router = express.Router();

// Securely get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_fallback_secret_key";

// Input validation middleware for signup
const validateSignupInput = (req, res, next) => {
  const { name, password, userType } = req.body;

  // Comprehensive input validation
  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Name is required and cannot be empty",
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  // Optional: Add userType validation if needed
  if (userType && !["adminUser", "normalUser"].includes(userType)) {
    return res.status(400).json({
      message: "Invalid user type. Must be adminUser or normalUser",
    });
  }

  next();
};

// Admin Signup Route
router.post("/signup", validateSignupInput, async (req, res) => {
  try {
    const { name, password, userType } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ name });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin with this name already exists",
      });
    }

    // Create new admin
    const newAdmin = new Admin({
      name,
      password,
      userType,
    });

    // Save the new admin
    await newAdmin.save();

    // Generate JWT token with all necessary information
    const token = jwt.sign(
      {
        id: newAdmin._id,
        name: newAdmin.name,
        userType: newAdmin.userType,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Admin created successfully",
      token,
      adminId: newAdmin._id,
      userType: newAdmin.userType,
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      message: "Error creating admin",
      error: error.message,
    });
  }
});

// Admin Login Route
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    // Validate input
    if (!name || !password) {
      return res.status(400).json({
        message: "Name and password are required",
      });
    }

    // Find admin by name
    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await admin.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT token with complete admin information
    const token = jwt.sign(
      {
        id: admin._id,
        name: admin.name,
        userType: admin.userType,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      adminId: admin._id,
      userType: admin.userType,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Login error",
      error: error.message,
    });
  }
});

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token is not valid",
      error: error.message,
    });
  }
};

// Token Validation Route
router.get("/validate-token", verifyAdminToken, (req, res) => {
  res.json({
    message: "Token is valid",
    admin: {
      id: req.admin.id,
      name: req.admin.name,
      userType: req.admin.userType,
    },
  });
});

// Admin Logout Route (mainly client-side operation)
router.post("/logout", verifyAdminToken, (req, res) => {
  res.json({
    message: "Logout successful",
  });
});

// New endpoint to get all users
router.get("/users", verifyAdminToken, async (req, res) => {
  try {
    // Only allow adminUsers to access this endpoint
    if (req.admin.userType !== "adminUser") {
      return res.status(403).json({
        message: "Access denied. Only admin users can view all users.",
      });
    }

    const users = await Admin.find({}, { password: 0 }); // Exclude password field
    res.json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

router.delete("/users/:id", verifyAdminToken, async (req, res) => {
  try {
    if (req.admin.userType !== "adminUser") {
      return res.status(403).json({
        message: "Access denied. Only admin users can delete users.",
      });
    }

    if (req.admin.id === req.params.id) {
      return res.status(400).json({
        message: "Cannot delete your own account",
      });
    }

    const deletedUser = await Admin.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
});

export default router;
