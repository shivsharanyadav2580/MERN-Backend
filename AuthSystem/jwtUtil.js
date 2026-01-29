const {sign, verify} = require("jsonwebtoken");

const SECRET_KEY = "MY_SECRET_KEY";

const generateToken = (userData) => {
   const token = sign(userData, SECRET_KEY, { expiresIn: "1h" });
   console.log("generateToken:", token);
   return token;
}

const verifyToken = (token) => {
   if (!token) {
      throw new Error("token is required");
   }
   const decoded = verify(token, SECRET_KEY);
   return decoded;
}

module.exports = { generateToken, verifyToken };
