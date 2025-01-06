const mongoose = require("mongoose")

async function connectMongoose(url){
    await mongoose.connect(url)
    if(!url){
        console.log("invalid")
    }else{
        console.log("mongo Server started")
    }
}

module.exports = connectMongoose;