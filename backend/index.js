import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import adminRoute from "./routes/adminRoute.js";
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
