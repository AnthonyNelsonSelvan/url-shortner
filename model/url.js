const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortURL : {
        type : String,
        required : true,
        unique : true
    },
    redirectUrl :{
        type : String,
        required : true
    },visitHistory : [{timestamps : { type : Number}}], 
},{timestamps :true})

const URL = mongoose.model('url',urlSchema)

module.exports = URL; 