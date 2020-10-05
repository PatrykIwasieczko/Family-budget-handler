const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load config
dotenv.config({ path: "./config/config.env" });

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: maxAge,
    });
};

// controller actions
module.exports.login_get = (req, res) => {
    res.render("login");
};

module.exports.signup_get = (req, res) => {
    res.render("signup");
};
