const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
