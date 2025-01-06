
const express = require("express");

const router = express.Router()

const {handleGetUrl,handleDeleteUrl} = require("../controller/url")

router.get('/:shortUrl', handleGetUrl)
//router.get('realUrl/:shortUrl',handleGetUrlAdress) //not working
router.delete('/:shortUrl',handleDeleteUrl)

module.exports = router;