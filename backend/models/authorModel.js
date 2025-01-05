import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  medium: { type: String, required: true },
  country: { type: String, required: true },
});

const Author = mongoose.model("Author", authorSchema);
export default Author;
