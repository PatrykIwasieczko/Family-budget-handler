const Member = require("../models/Member");
const jwt = require("jsonwebtoken");

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "secret", {
        expiresIn: maxAge,
    });
};

// controller actions
module.exports.login_get = (req, res) => {
    res.render("login");
};
