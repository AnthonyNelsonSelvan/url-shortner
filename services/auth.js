const jwt = require("jsonwebtoken");
const secret = "Nelson234$!";

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name : user.name
    },
    secret
  );
}

function getUser(id) {
  try {
    let decoded = jwt.verify(id,secret)
    return decoded
  } catch (error) {
    return null
  }
}

module.exports = {
  setUser,
  getUser,
};
