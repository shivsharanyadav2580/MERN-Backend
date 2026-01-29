const { verifyToken } = require("./jwtUtil");

const authController = (req, res, next) => {
  try {
    const { authToken } = req.cookies;
    const decoded = verifyToken(authToken);

    res.locals.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized / Token expired");
  }
};

module.exports = authController;
