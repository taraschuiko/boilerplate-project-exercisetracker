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
    if (from) dateFilter.$gte = new Date(from);
    if (to) dateFilter.$lte = new Date(to);

    const exercises = await Exercise.find({
      userId: req.params._id,
      ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
    })
      .limit(parseInt(limit) || 0)
      .exec();

    res.json({
      username: user.username,
      count: exercises.length,
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
