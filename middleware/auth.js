const {getUser} = require("../services/auth")

async function handleAllowLoggedInUserOnly(req,res,next){
    const userid = req.cookies?.uid;
    if(!userid){
        return res.redirect("/login")
    }
    const user = getUser(userid)
    if(!user){
        return res.redirect("/login")
    }
    req.user = user;
    next()
}

async function handleCheckAuth(req,res,next){
    const userid = req.cookies.uid;

    const user = getUser(userid)

    req.user = user;
    next()
}

module.exports = {handleAllowLoggedInUserOnly,handleCheckAuth}