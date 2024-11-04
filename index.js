const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { createUser } = require("./controllers/userController");
const { createExercise } = require("./controllers/exerciseController");

require("dotenv").config();

main().catch((err) => console.log(err));

async function main() {
  // https://cloud.mongodb.com/v2/6728e5c7a71ab55a3a085f7e#/overview
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@griddynamicslearning.4fx1k.mongodb.net/?retryWrites=true&w=majority&appName=GridDynamicsLearning`
  );

  app.use(cors());
  app.use(express.static("public"));
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });

  app.post("/api/users", createUser);

  app.post("/api/users/:_id/exercises", createExercise);

  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
}
