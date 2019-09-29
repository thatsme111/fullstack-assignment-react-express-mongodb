const mongoose = require("mongoose");

module.exports = mongoose.model("user", new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profile_picture: { type: String },
}));