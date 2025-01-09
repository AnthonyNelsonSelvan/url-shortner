const express = require("express");
const URL = require("../model/url");
const User = require("../model/user");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allUrl = await URL.find({ createdBy: req.user.id });
  const user = await User.findOne({ name: req.user.name });
  const {id} = req.query;
  return res.render("home", {
    urls: allUrl,
    user: user,
    id : id
  });
});
router.get("/signUp", (req, res) => {
  return res.render("signUp");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
