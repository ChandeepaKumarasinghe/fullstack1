import express from "express";
import Staff from "../models/Staff.js";

const router = express.Router();

// Get all staff
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add new staff
router.post("/", async (req, res) => {
  try {
    const { name, role } = req.body;
    const newStaff = new Staff({ name, role });
    await newStaff.save();
    res.status(201).json({ success: true, data: newStaff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete staff by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
