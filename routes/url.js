
const express = require("express");

const router = express.Router()

const {handleCreateShortUrl,handleGetUrl} = require("../controller/url")

router.post("/", handleCreateShortUrl)
router.get('/:shortUrl', handleGetUrl)

module.exports = router;