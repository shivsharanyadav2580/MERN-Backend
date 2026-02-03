const express = require("express");
const { generateToken } = require("./jwtUtil");
const { sanitizeUserData } = require("./utils");
const router = express.Router();

const userDetails = [
  {
    username: "shivsharan yadav",
    name: "shivsharan",
    email: "shivsharanyadav9516@gmail.com",
    password: "shivsharan@123",
    cart: [],
  }
];

// dummy helpers (maan lo ye sahi kaam kar rahe hain)
const hashPassword = async (pwd) => pwd + "_hashed";
const verifyPassword = async (pwd, hash) => hash === pwd + "_hashed";

router.get("/", (req, res) => {
  res.send("yes");
});

router.post("/signup", async (req, res) => {
  const { password, ...userData } = req.body;
  userData.password = await hashPassword(password);
  userDetails.push(userData);

  res.send({
    data: userData,
    message: `User ${userData.username} created successfully`,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userData = userDetails.find(
    (user) => user.username === username
  );

  if (!userData) {
    return res.status(401).send({ message: "User not found" });
  }

  const isPasswordValid = await verifyPassword(
    password,
    userData.password
  );

  if (!isPasswordValid) {
    return res.status(401).send({ message: "Invalid password" });
  }

  const token = generateToken(userData, "30s");

  // ✅ COOKIE FIX HERE
  res.cookie("authToken", token, {
    httpOnly: true,
    maxAge: 3600_000,
    sameSite: "lax",
  });

  res.send({
    data: sanitizeUserData(userData),
    message: `User ${userData.username} logged in successfully`,
  });
});
router.get("/logout", (req, res) => {
  res.cookie("authToken", "", {
    httpOnly: true,
    maxAge: 0,
    
  });
  res.send({ message: "User logged out successfully" });
});

module.exports = router;
