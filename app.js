const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const familyRoutes = require("./routes/familyRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkMember } = require("./middleware/authMiddleware");

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

const PORT = process.env.PORT || 8000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

// routes
app.get("*", checkMember);
app.get("/", (req, res) => res.render("home"));
app.get("/main", requireAuth, (req, res) => res.render("main"));
app.use(authRoutes);
app.use(familyRoutes);
