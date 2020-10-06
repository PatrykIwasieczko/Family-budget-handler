const Family = require("../models/Family");

module.exports.family_post = async (req, res) => {
    const { name } = req.body;

    try {
        const family = await Family.create({ name });
        res.status(201).json({ family: family._id, name });
    } catch (err) {
        console.log(err);
        res.status(400).json();
    }
};
