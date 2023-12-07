const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Score = require("./Score");
const nanoidEsm = require("nanoid-esm");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator: (v) => {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/.test(v);
            },
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    scores:
        [
            {
                // score_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Score",
                required: true,
                // }
            }
        ],
    avgSpeed: {
        type: Number,
        default: 0,
    },

    overallAccuracy: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    // Storing time in seconds
    totalTime: {
        type: Number,
        default: 0,
    }

});
// Leader Board
// Profile
userSchema.methods.comparePassword = async function (password) {
    const user = this;
    const isMatch = await bcrypt.compareSync(password, user.password);
    return isMatch;
};

userSchema.pre("save", async function (next) {
    // Check if the password is modified, if not, return to next route
    if (!this.isModified("password")) return next();

    const salt = "$2a$10$juvOZ0dxG20ugXTWn8dTD.";
    const hash = await bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
});

module.exports = mongoose.model("User", userSchema);

