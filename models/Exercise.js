const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    _id: String,
    userId: String,
    description: String,
    duration: Number,
    date: Date,
  },
  {
    versionKey: false,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = {
  Exercise,
};
