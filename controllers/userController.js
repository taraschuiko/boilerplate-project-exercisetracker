const { User } = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      _id: uuidv4(),
      username: req.body.username,
    });

    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Could not create user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Could not get users" });
  }
};

module.exports = {
  createUser,
  getUsers,
};
