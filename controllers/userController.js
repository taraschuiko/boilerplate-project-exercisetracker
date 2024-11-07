const { User } = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
  const newUser = new User({
    _id: uuidv4(),
    username: req.body.username,
  });

  await newUser.save();

  res.json(newUser);
};

const getUsers = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

module.exports = {
  createUser,
  getUsers,
};
