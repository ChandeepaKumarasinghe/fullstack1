import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import adminRoute from "./routes/adminRoute.js";
import borrowRoute from "./routes/borrowRoute.js";
import authorsRoute from "./routes/authorsRoute.js";
import noticeRoute from "./routes/noticeRoute.js";
import staffRoute from "./routes/staffRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app's URL
    credentials: true,
  })
);

// Routes
app.get("/", (request, response) => {
  return response.status(234).send("Welcome To Library Management System");
});

// Book routes
app.use("/books", booksRoute);
// Admin routes
app.use("/admin", adminRoute);
// Borrow routes - Add this line
app.use("/borrows", borrowRoute);
// Add author routes
app.use("/authors", authorsRoute);
// Add notice routes
app.use("/notices", noticeRoute);
app.use("/staff", staffRoute);
app.use("/payments", paymentRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
