const User = require("../model/user");
const {v4 : uuidv4} = require("uuid")
const {setUser} = require("../services/auth")

async function handleUserSignUp(req,res){
    const {email,name,password} = req.body;
    await User.create({
        name,
        password,
        email
    })

    return res.render("home")
}
async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password})
    if(!user){
        return res.render("login",{
            response : "wrong email or password"
        })
    }
    const sessionId = uuidv4();
    setUser(sessionId,user)
    res.cookie("uid",sessionId)
    return res.redirect("/test")
}

module.exports = {handleUserSignUp, handleUserLogin}