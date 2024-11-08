const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { createUser, getUsers } = require("./controllers/userController");
const { createExercise, getLogs } = require("./controllers/exerciseController");

require("dotenv").config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URI);

  app.use(cors());
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });

  app.post("/api/users", createUser);
  app.get("/api/users", getUsers);

  app.post("/api/users/:_id/exercises", createExercise);
  app.get("/api/users/:_id/logs", getLogs);

  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
}
