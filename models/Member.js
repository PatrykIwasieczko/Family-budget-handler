const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const memberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Proszę podać adres e-mail"],
        unique: true,
        validate: [isEmail, "Proszę podać poprawny numer e-mail"],
    },
    password: {
        type: String,
        required: [true, "Proszę podać hasło"],
        minlength: [6, "Hasło musi mieć co najmniej 6 znaków"],
    },
    name: {
        type: String,
        required: [true, "Proszę podać imię i nazwisko"],
        trim: true,
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Family",
    },
});

// encrypt password before saving to DB
memberSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Member = mongoose.model("member", memberSchema);

module.exports = Member;
