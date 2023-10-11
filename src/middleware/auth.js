const { verifyJwt } = require("../config/jwt");
const { setError } = require("../config/error");
const User = require("../api/models/user");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(setError(401, "You need a token"));
    }

    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken);
    const userLogued = await User.findById(validToken.id);

    userLogued.password = null;
    req.user = userLogued;
    next();
  } catch (error) {
    return next(setError(401, "You need a valid token"));
  }
};

module.exports = { isAuth };