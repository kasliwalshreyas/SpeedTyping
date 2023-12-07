const mongoose = require("mongoose");


const passagesSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Passages', passagesSchema);