import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import storeRoutes from "./storeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/industriesMap")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/stores", storeRoutes);

// Start Server
app.listen(5000, () =>
  console.log("Server running at http://localhost:5000")
);
