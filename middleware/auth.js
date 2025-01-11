const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
  const tokenValue = req.cookies?.token;
  req.user = null;
  if (!tokenValue) return next();
  //will return the value of the token which was stored
  const user = getUser(tokenValue);
  //assigning user to req.user to use it later
  req.user = user;
  return next();
}

function onlyAccessibleBy(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("unauthorized");

    return next();
  };
}
module.exports = { checkForAuthentication,onlyAccessibleBy };