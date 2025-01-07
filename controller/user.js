const User = require("../model/user");

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
    return res.redirect("/test")
}

module.exports = {handleUserSignUp, handleUserLogin}