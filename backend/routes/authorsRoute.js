import express from "express";
import Author from "../models/authorModel.js";

const router = express.Router();

// Add an author
router.post("/add", async (req, res) => {
  const { name, age, medium, country } = req.body;
  try {
    const newAuthor = new Author({ name, age, medium, country });
    await newAuthor.save();
    res
      .status(201)
      .json({ message: "Author added successfully", author: newAuthor });
  } catch (error) {
    res.status(500).json({ message: "Error adding author", error });
  }
});

// Get all authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching authors", error });
  }
});

// Delete an author
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Author.findByIdAndDelete(id);
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting author", error });
  }
});

export default router;
