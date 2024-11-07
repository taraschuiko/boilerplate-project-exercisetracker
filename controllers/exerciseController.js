const { Exercise } = require("../models/Exercise");
const { User } = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const createExercise = async (req, res) => {
  const defaultDate = new Date().toISOString().split("T")[0];

  const newExercise = new Exercise({
    _id: uuidv4(),
    userId: req.params._id,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date || defaultDate,
  });

  await newExercise.save();

  const user = await User.findById(req.params._id);

  res.json({
    username: user.username,
    description: newExercise.description,
    duration: newExercise.duration,
    date: newExercise.date,
    _id: user._id,
  });
};

const getLogs = async (req, res) => {
  const user = await User.findById(req.params._id);

  const { from, to, limit } = req.query;

  const dateFilter = {};
  if (from) dateFilter.$gte = new Date(from);
  if (to) dateFilter.$lte = new Date(to);

  console.log(dateFilter);

  const exercises = await Exercise.find({
    userId: req.params._id,
    ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
  })
    .limit(parseInt(limit) || 0)
    .exec();

  res.json({
    username: user.username,
    count: exercises.length,
    _id: user._id,
    log: exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
    })),
  });
};

module.exports = {
  createExercise,
  getLogs,
};
