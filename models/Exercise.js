const mongoose = require("mongoose");

const exerciseSchema = new Schema({
  _id: String,
  description: String,
  duration: Number,
  date: Date,
});

export const Exercise = mongoose.model("Exercise", exerciseSchema);
