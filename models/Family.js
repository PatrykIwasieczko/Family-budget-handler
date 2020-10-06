const mongoose = require("mongoose");
const { Member } = require("./Member");
const { Deposit } = require("./Deposit");
const { Expense } = require("./Expense");

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
        type: [Expense],
    },
});

const Family = mongoose.model("family", familySchema);

module.exports = Family;
