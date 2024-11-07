const mongoose = require("mongoose");

const exerciseSchema = new Schema(
  {
    _id: String,
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
