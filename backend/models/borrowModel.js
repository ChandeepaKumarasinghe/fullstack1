// borrowModel.js
import mongoose from "mongoose";

const borrowSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      required: true,
      // Set default return date to 14 days from borrow date
      default: () => new Date(+new Date() + 14 * 24 * 60 * 60 * 1000),
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  {
    timestamps: true,
  }
);

export const Borrow = mongoose.model("Borrow", borrowSchema);
