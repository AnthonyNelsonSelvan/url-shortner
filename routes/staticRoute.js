const express = require("express");
const {handleCreateShortUrl} = require("../controller/url")
const URL = require("../model/url")

const router = express.Router()


router.get("/success", async (req,res) => {
    const allUrl = await URL.find({})
    const {id} =req.query;
    res.render("home",{id ,urls : allUrl,})
})

//route for pages
router.get('/test',async (req,res) => {
    const allUrl = await URL.find({})
    return res.render('home',{
        urls : allUrl,
    })
})
router.get('/signUp', (req,res) =>{
    return res.render("signUp")
})
router.get('/login',(req,res) =>{
    return res.render("login")
})

module.exports= router;