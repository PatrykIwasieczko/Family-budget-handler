const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const memberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "incorrect email"],
        unique: true,
        validate: [isEmail, "Proszę podać poprawny numer e-mail"],
    },
    password: {
        type: String,
        required: [true, "incorrect password"],
        minlength: [6, "Hasło musi mieć co najmniej 6 znaków"],
    },
    name: {
        type: String,
        required: [true, "incorrect name"],
        trim: true,
        minlength: [5, "Podaj poprawne imię i nazwisko"],
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

// static method to login member
memberSchema.statics.login = async function (email, password) {
    const member = await this.findOne({ email });
    if (member) {
        const auth = await bcrypt.compare(password, member.password);
        if (auth) {
            return member;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

const Member = mongoose.model("member", memberSchema);

module.exports = Member;
