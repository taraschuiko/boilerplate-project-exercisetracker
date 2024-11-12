const { Exercise } = require("../models/Exercise");
const { User } = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const createExercise = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const defaultDate = new Date().toISOString().split("T")[0];

    if (!req.body.description || !req.body.duration) {
      return res
        .status(400)
        .json({ error: "Description and duration are required" });
    }

    if (isNaN(req.body.duration) || req.body.duration <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid duration value, expecting positive number." });
    }

    if (req.body.date && new Date(req.body.date).toString() === "Invalid Date") {
      return res.status(400).json({ error: "Invalid date" });
    }

    const newExercise = new Exercise({
      _id: uuidv4(),
      userId: req.params._id,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date || defaultDate,
    });

    await newExercise.save();

    res.json({
      username: user.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: new Date(newExercise.date).toDateString(),
      _id: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Could not create exercise" });
  }
};

const getLogs = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { from, to, limit } = req.query;
    const dateFilter = {};

    if (from) {
      const date = new Date(from);
      if (date.toString() === "Invalid Date") {
        return res.status(400).json({ error: "Invalid from date" });
      }
      dateFilter.$gte = date;
    }

    if (to) {
      const date = new Date(to);
      if (date.toString() === "Invalid Date") {
        return res.status(400).json({ error: "Invalid to date" });
      }
      dateFilter.$lte = date;
    }

    if (limit && (isNaN(limit) || limit <= 0)) {
      return res.status(400).json({ error: "Invalid limit value" });
    }

    const exercises = await Exercise.find({
      userId: req.params._id,
      ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
    }).sort({ date: 1 }).limit(parseInt(limit || 0));

    const count = await Exercise.countDocuments({
      userId: req.params._id,
      ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
    });

    res.json({
      username: user.username,
      count: count,
      log: exercises.map((exercise) => ({
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString(),
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Could not get logs" });
  }
};

module.exports = {
  createExercise,
  getLogs,
};
