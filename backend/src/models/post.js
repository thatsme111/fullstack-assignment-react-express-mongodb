const mongoose = require("mongoose");

module.exports = mongoose.model("post", new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
}));