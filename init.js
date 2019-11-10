const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const User = require("./models/user");

const MONGODB_URL = process.env["IS_ON_DOCKER"]
  ? "mongodb://mongo:27017/test"
  : "mongodb://localhost:27017/test";

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Db연결됨");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./api"));
app.use("/", require("./web"));

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
