const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String,
  username: String,
});

export const User = mongoose.model("User", userSchema);
