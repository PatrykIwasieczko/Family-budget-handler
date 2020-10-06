const jwt = require("jsonwebtoken");
const Member = require("../models/Member");

const dotenv = require("dotenv");

// Load config
dotenv.config({ path: "./config/config.env" });

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check if json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

// check current member
const checkMember = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET_TOKEN,
            async (err, decodedToken) => {
                if (err) {
                    res.locals.member = null;
                    next();
                } else {
                    let member = await Member.findById(decodedToken.id);
                    res.locals.member = member;
                    next();
                }
            }
        );
    } else {
        res.locals.member = null;
        next();
    }
};

module.exports = { requireAuth, checkMember };
