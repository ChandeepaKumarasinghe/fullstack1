import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["Librarian", "Assistant", "Other"],
      required: true,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
