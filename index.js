const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", (req, res) => {
  res.json({
    username: "example",
  });
});

app.post("/api/users/:_id/exercises", (req, res) => {
  res.json({
    username: "example",
    description: "example",
    duration: 60,
    date: "Mon Jan 01 1990",
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
