const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    min: [3, "username must be greater then 3 characters"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, "password length must be greater then 8 characters"],
    trim: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("Users", UserSchema);
