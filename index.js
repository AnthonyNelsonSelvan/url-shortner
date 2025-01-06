//imports
const express = require("express");
const app = express()
const port = 3000;
const path = require("path")

//custom imports
const connectMongoose = require("./connection/url")
const urlRouter = require("./routes/url")
const staticRoute = require("./routes/staticRoute")

//function from connection folder
connectMongoose("mongodb://127.0.0.1:27017/url-shortner")

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use("/shortUrl", urlRouter)
app.use("/", staticRoute)

//view engine
app.set("view engine", "ejs")
//telling where is the ejs files
app.set("views", path.resolve("./view"))

//creaing port
app.listen(port ,() => console.log(`serverStarted at port :: ${port}`))



