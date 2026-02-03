const { verifyToken } = require("./jwtUtil");

const authController = (req, res, next) => {
  const { authToken } = req.cookies;
  const userData = verifyToken(authToken);

  res.local.user = userData;
  next();
};

module.exports = authController;
