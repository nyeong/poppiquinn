const express = require("express");
const router = express.Router();
const User = require("./models/user");

const URL_PREFIX = "/admin";

function whenLoggedIn(req, res, next) {
  if (req.session.user) return next();
  else return res.redirect(`${URL_PREFIX}/login`);
}

function whenNotLoggedIn(req, res, next) {
  if (!req.session.user) return next();
  else return res.redirect(`${URL_PREFIX}`);
}

router.get("/login", whenNotLoggedIn, (req, res) => {
  res.render("login");
});

router.post("/login", whenNotLoggedIn, (req, res) => {
  if (
    req.body["username"] === process.env.ADMIN_USERNAME &&
    req.body["password"] === process.env.ADMIN_PASSWORD
  ) {
    req.session["user"] = {
      loggedInAt: Date.now()
    };
    res.redirect(`${URL_PREFIX}`);
  } else {
    res.render("login");
  }
});

router.get("/", whenLoggedIn, async (req, res) => {
  const users = await User.find({});
  console.info("current user number:", users.length);
  res.render("users", { users });
});

router.get("/user/:userid", whenLoggedIn, async (req, res) => {
  const user = await User.findById(req.params["userid"]);
  res.render("user", { user });
});

module.exports = router;
