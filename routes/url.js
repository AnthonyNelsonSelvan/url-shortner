
const express = require("express");

const router = express.Router()

const {handleCreateShortUrl,handleGetUrl,handleDeleteUrl} = require("../controller/url")

router.post("/", handleCreateShortUrl)
router.get('/:shortUrl', handleGetUrl)
//router.get('realUrl/:shortUrl',handleGetUrlAdress) //not working
router.delete('/:shortUrl',handleDeleteUrl)

module.exports = router;