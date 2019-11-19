const express = require("express");
const router = express.Router();
const session = require("express-session");

router.use(
  session({
    secret: "우주는고양이의것이다",
    resave: false,
    saveUninitialized: true
  })
);

function whenLoggedIn(req, res, next) {
  if (req.session.user) return next();
  else return res.redirect("/login");
}

function whenNotLoggedIn(req, res, next) {
  if (!req.session.user) return next();
  else return res.redirect("/");
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
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.get("/", whenLoggedIn, (req, res) => {
  console.log("hi");
  res.render("index");
});

module.exports = router;
