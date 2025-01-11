//imports
const express = require("express");
const app = express()
const port = 800;
const path = require("path")
const cookieParser = require('cookie-parser')

//custom imports
const connectMongoose = require("./connection/url")
const urlRouter = require("./routes/url")
const staticRoute = require("./routes/staticRoute")
const userRoute = require("./routes/user")
const {checkForAuthentication,onlyAccessibleBy} = require("./middleware/auth")

//function from connection folder
connectMongoose("mongodb://127.0.0.1:27017/url-shortner")

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication)

//routes
app.use("/url",onlyAccessibleBy(['NORMAL','ADMIN']), urlRouter)
app.use("/", staticRoute)
app.use("/user", userRoute)

//view engine
app.set("view engine", "ejs")
//telling where is the ejs files
app.set("views", path.resolve("./view"))

//creaing port
app.listen(port ,() => console.log(`serverStarted at port :: ${port}`))



