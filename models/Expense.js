const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
    },
});

const Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;
