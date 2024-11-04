const createUser = (req, res) => {
  res.json({
    username: "example",
  });
};

module.exports = {
  createUser,
};