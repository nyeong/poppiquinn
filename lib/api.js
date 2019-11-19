const express = require("express");
const router = express.Router();
const User = require("./models/user");

router.post("/user/info", async (req, res) => {
  let user = new User();
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
    res.status(401).send({ error: err });
  }
});

router.post("/user/fetch", async (req, res) => {
  try {
    console.log(req.body);

    res.status(200).send({ recallTime: 300 });
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});

module.exports = router;
