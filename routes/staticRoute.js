const express = require("express");
const {handleCreateShortUrl} = require("../controller/url")
const URL = require("../model/url")

const router = express.Router()


router.get("/success", async (req,res) => {
    const allUrl = await URL.find({})
    const {id} =req.query;
    res.render("home",{id ,urls : allUrl,})
})
router.get('/test',async (req,res) => {
    const allUrl = await URL.find({})
    return res.render('home',{
        urls : allUrl,
    })
})

module.exports= router;