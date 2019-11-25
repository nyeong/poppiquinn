const express = require("express");
const router = express.Router();
const User = require("./models/user");
const { haversine } = require("./utils");

/*
{
  phone: string
  name: string
  nickname: string
  youPhone: string
}
*/
router.post("/user/info", async (req, res) => {
  console.log("POST /user/info", req.body);
  let user = new User();
  user.phone = req.body["phone"];
  user.name = req.body["name"];
  user.nickname = req.body["nickname"];
  user.youPhone = req.body["youPhone"];

  try {
    const savedUser = await user.save();
    console.log("user saved:", savedUser);
    res.send({ status: "ok", message: "user saved", user });
  } catch (err) {
    console.error(err);
    res.status(401).send({ status: "error", message: err });
  }
});

/* Input:
{
  lat: number
  lng: number
  phone: string
  threshold: number, optional
}
*/
router.post("/user/location", async (req, res) => {
  try {
    console.log(req.body);

    if (
      typeof req.body["lat"] !== "number" ||
      typeof req.body["lng"] !== "number" ||
      typeof req.body["phone"] !== "string" ||
      req.body["phone"].length !== 11
    )
      throw Error("Wrong Argument Type Error");
    const { lat, lng, phone } = req.body;

    const user = await User.findByPhone(phone);
    if (!user) throw Error("No User Found");
    console.log(user);

    await user.updateLocation({ lat, lng, time: Date.now() });

    const whoLikesMe = await User.find({ youPhone: phone }).exec();
    if (!whoLikesMe) throw Error("Noone Likes Me");

    const userPosition = user.recentLocation();

    whoLikesMe.map(async youUser => {
      const youPosition = youUser.recentLocation();
      if (!userPosition || !youPosition) continue;

      const distance = haversine(userPosition, youPosition);
      const distance_threshold =
        typeof req.body["threshold"] === "number"
          ? req.body["threshold"]
          : 0.03;

      if (distance <= distance_threshold) {
        await youUser.increseRingingCnt();
        return 1;
      } else {
        return 0;
      }
    });

    const sum = whoLikesMe.reduce((aac, cur) => aac + cur);

    if (sum === 0) return res.status(200).send({ status: "ok" });
    else
      return res
        .status(200)
        .send({ status: 1, distance, ringing_cnt: user.ringingCnt });
  } catch (err) {
    res.status(401).send({ status: "error", message: err.message });
  }
});

/*
{
  phone: string, required
  name: string, optional
  nickname: string, optional
  youPhone: string, optional
}
*/
router.post("/user/change/phone", async (req, res) => {
  const { phone, name, nickname, youPhone } = req.body;
  try {
    const user = await User.findByPhone(phone);
    if (!user) throw Error("User Not Found By Phone Number");
    user.name = name || user.name;
    user.nickname = nickname || user.nickname;
    user.youPhone = youPhone || user.youPhone;
    user.ringingCnt = 0;
    await user.save();
    return res.status(200).send({ status: "ok", user });
  } catch (err) {
    res.status(401).send({ status: "error", message: err.message });
  }
});

module.exports = router;
