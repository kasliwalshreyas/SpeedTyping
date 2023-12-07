const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const scoreSchema = new mongoose.Schema({
    speed: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    testDuration: {
        type: Number,
        required: true,
    },
    createdAt:{
        type: String,
        required:true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Score', scoreSchema);
