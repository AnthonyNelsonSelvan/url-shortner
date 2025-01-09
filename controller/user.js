const User = require("../model/user");
const {setUser} = require("../services/auth")

async function handleUserSignUp(req,res){
    const {email,name,password} = req.body;
    await User.create({
        name,
        password,
        email,
    })

    return res.render("login")
}
async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password})
    if(!user){
        return res.render("login",{
            response : "wrong email or password"
        })
    }
    const token = setUser(user)
    return res.json({token})
}

module.exports = {handleUserSignUp, handleUserLogin}