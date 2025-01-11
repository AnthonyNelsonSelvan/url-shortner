const express = require("express");
const URL = require("../model/url");
const User = require("../model/user");
const { onlyAccessibleBy } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/urls",onlyAccessibleBy(["ADMIN"]), async (req,res) =>{
  const allurls = await URL.find({})
  return res.render("home",{
    urls : allurls,
  })
})

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allUrl = await URL.find({ createdBy: req.user.id });
  const user = await User.findOne({ name: req.user.name });
  //getting the url from query which was passed while creating the url
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
