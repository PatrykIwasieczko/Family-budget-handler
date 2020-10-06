const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load config
dotenv.config({ path: "./config/config.env" });

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = "Niepoprawny email";
    }

    // incorrect password
    if (err.message === "incorrect password") {
        errors.password = "Niepoprawne hasło";
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = "Ten email jest już zarejestrowany";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

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
        const errors = handleErrors(err);
        res.status(400).json({ errors });
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
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};
