// import express from "express";
// import { Payment } from "../models/paymentModel.js";
// import { verifyAdminToken } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Get all payments
// router.get("/", verifyAdminToken, async (req, res) => {
//   try {
//     const payments = await Payment.find()
//       .populate("userId", "name")
//       .sort({ createdAt: -1 });
//     res.json({ data: payments });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create new payment
// router.post("/", verifyAdminToken, async (req, res) => {
//   try {
//     const payment = new Payment({
//       userId: req.body.userId,
//       amount: req.body.amount,
//       description: req.body.description,
//       dueDate: new Date(req.body.dueDate),
//     });
//     const newPayment = await payment.save();
//     res.status(201).json(newPayment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete payment
// router.delete("/:id", verifyAdminToken, async (req, res) => {
//   try {
//     const payment = await Payment.findByIdAndDelete(req.params.id);
//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }
//     res.json({ message: "Payment deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
import express from "express";
import { Payment } from "../models/paymentModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_fallback_secret_key";

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

// Get all payments
router.get("/", verifyAdminToken, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    res.json({ data: payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new payment
router.post("/", verifyAdminToken, async (req, res) => {
  try {
    const payment = new Payment({
      userId: req.body.userId,
      amount: req.body.amount,
      description: req.body.description,
      dueDate: new Date(req.body.dueDate),
    });
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete payment
router.delete("/:id", verifyAdminToken, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
