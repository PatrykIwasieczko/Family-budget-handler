const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
});

const Deposit = mongoose.model("deposit", depositSchema);

module.exports = Deposit;
