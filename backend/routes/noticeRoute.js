// routes/noticeRoute.js
import express from "express";
import Notice from "../models/Notice.js";

const router = express.Router();

// Get all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new notice
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newNotice = new Notice({ title, description });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
