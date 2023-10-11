/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mainRouter = require("./src/api/routes");
const cloudinary = require("cloudinary").v2;
const { setError } = require("./src/config/error");
const { connectDB } = require("./src/config/db");

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

connectDB();

app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 50,
  standardHeaders: false,
  legacyHeaders: false,
});

app.use(limiter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.disable("x-powered-by");

app.use("/api", mainRouter);

app.use("*", (req, res, next) => {
  return next(setError(404, "Not found 🥲"));
});

app.use((error, req, res, next) => {
  console.log(">>>>> Server error, verifica que ha pasado:", error);
  return res
    .status(error.status || 500)
    .json({ data: error.message || "Internal Server Error" });
});

const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});