const Family = require("../models/Family");
const { checkMember } = require("../middleware/authMiddleware");

module.exports.family_post = async (req, res) => {
    const { name } = req.body;

    try {
        const family = await Family.create({ name });
        res.status(201).json({ familyId: family._id, name });
    } catch (err) {
        console.log(err);
        res.status(400).json();
    }
};

module.exports.families_get = async (req, res) => {
    try {
        const families = await Family.find();
        res.status(201).json({ families });
    } catch (err) {
        console.log(err);
        res.status(400).json();
    }
};
