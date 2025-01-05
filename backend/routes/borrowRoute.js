import express from "express";
import { Borrow } from "../models/borrowModel.js";
import { Book } from "../models/bookModel.js";
const router = express.Router();

// Route to create a new borrow record
router.post("/", async (request, response) => {
  try {
    if (!request.body.userId || !request.body.bookId) {
      return response.status(400).send({
        message: "Send all required fields: userId, bookId",
      });
    }

    // Check if book exists
    const book = await Book.findById(request.body.bookId);
    if (!book) {
      return response.status(404).send({ message: "Book not found" });
    }

    // Check if book is already borrowed
    const existingBorrow = await Borrow.findOne({
      bookId: request.body.bookId,
      status: "borrowed",
    });
    if (existingBorrow) {
      return response.status(400).send({
        message: "Book is already borrowed",
      });
    }

    const newBorrow = {
      userId: request.body.userId,
      bookId: request.body.bookId,
    };

    const borrow = await Borrow.create(newBorrow);
    return response.status(201).send(borrow);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all borrows
router.get("/", async (request, response) => {
  try {
    const borrows = await Borrow.find({})
      .populate("bookId")
      .sort({ borrowDate: -1 }); // Sort by borrow date, newest first

    return response.status(200).json({
      count: borrows.length,
      data: borrows,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get a single borrow by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const borrow = await Borrow.findById(id).populate("bookId");

    if (!borrow) {
      return response.status(404).send({ message: "Borrow record not found" });
    }

    return response.status(200).json(borrow);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all borrows for a specific user
router.get("/user/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    const borrows = await Borrow.find({ userId })
      .populate("bookId")
      .sort({ borrowDate: -1 });

    return response.status(200).json({
      count: borrows.length,
      data: borrows,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to return a book
router.put("/return/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const borrow = await Borrow.findById(id);

    if (!borrow) {
      return response.status(404).send({ message: "Borrow record not found" });
    }

    if (borrow.status === "returned") {
      return response.status(400).send({ message: "Book is already returned" });
    }

    borrow.status = "returned";
    borrow.returnDate = new Date();
    await borrow.save();

    return response.status(200).send({
      message: "Book returned successfully",
      data: borrow,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a borrow record
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const borrow = await Borrow.findById(id);

    if (!borrow) {
      return response.status(404).send({ message: "Borrow record not found" });
    }

    const updatedBorrow = await Borrow.findByIdAndUpdate(id, request.body, {
      new: true,
    }).populate("bookId");

    return response.status(200).send({
      message: "Borrow record updated successfully",
      data: updatedBorrow,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a borrow record
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Borrow.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Borrow record not found" });
    }

    return response.status(200).send({
      message: "Borrow record deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to extend return date
router.put("/extend/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { extensionDays } = request.body;

    if (!extensionDays || extensionDays <= 0) {
      return response.status(400).send({
        message: "Please provide a valid number of days for extension",
      });
    }

    const borrow = await Borrow.findById(id);

    if (!borrow) {
      return response.status(404).send({ message: "Borrow record not found" });
    }

    if (borrow.status === "returned") {
      return response
        .status(400)
        .send({ message: "Cannot extend return date for returned books" });
    }

    // Calculate new return date
    const currentReturnDate = new Date(borrow.returnDate);
    currentReturnDate.setDate(currentReturnDate.getDate() + extensionDays);
    borrow.returnDate = currentReturnDate;

    await borrow.save();

    return response.status(200).send({
      message: "Return date extended successfully",
      data: borrow,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
