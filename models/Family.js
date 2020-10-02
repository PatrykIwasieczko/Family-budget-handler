const mongoose = require("mongoose");
const { Member } = require("./Member");

const familySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: {
        type: [Member],
    },
    deposits: {
        type: [Deposit],
    },
    expenses: {
        type: [Expenses],
    },
});

const Family = mongoose.model("family", familySchema);

module.exports = Family;
