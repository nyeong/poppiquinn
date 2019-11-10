const express = require("express");
const router = express.Router();

router.post("/user/info", async (req, res) => {
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

module.exports = router;
