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

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const member = await Member.login(email, password);
        const token = createToken(member._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ member: member._id });
    } catch (err) {
        res.status(400).json();
    }
};

module.exports.signup_get = (req, res) => {
    res.render("signup");
};

module.exports.signup_post = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const member = await Member.create({ email, name, password });
        const token = createToken(member._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ member: member._id });
    } catch (err) {
        console.log(err);
        res.status(400).json();
    }
};
