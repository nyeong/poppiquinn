const express = require("express");
const mongoose = require("mongoose");
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.send("여기는 가톨릭 대학교~");
  console.log("누군가가 접속했습니다:");
  console.log(">", req.headers["user-agent"]);
});

app.post("/user/info", async (req, res) => {
  let user = new User();
  user.seq = req.body["seq"];
  user.phone = req.body["phone"];
  user.name = req.body["name"];
  user.nickname = req.body["nickname"];
  user.youPhone = req.body["youPhone"];

  try {
    const savedUser = await user.save();
    console.log("user saved:", savedUser);
    res.send({ ok: "user saved", user });
  } catch (err) {
    console.error(err);
    res.send({ error: err });
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find({}).exec();
    console.log(users);
    res.send({ ok: "", users });
  } catch (err) {
    console.error(err);
    res.send({ error: err });
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
