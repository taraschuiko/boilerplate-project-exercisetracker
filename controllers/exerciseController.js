const createExercise = (req, res) => {
  res.json({
    description: "example",
    duration: 60,
    date: "Mon Jan 01 1990",
  });
};

module.exports = {
  createExercise,
};