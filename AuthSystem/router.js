const express = require("express");
const { generateHash, verifyPassword } = require("./passwordUtils");
const { generateToken } = require("./jwtUtil");
const { sanitizeUserData } = require("./utils");

const router = express.Router();

/* Fake DB */
const userDetails = [
  {
    userName: "shivsharanyadav",
    // name: "Shivsharan",
    // email: "shivsharanyadav9516@gmail.com",
    password: "$2b$10$dummyhash",
    // cart: [],
  },
];

/* TEST */
router.get("/", (req, res) => {
  res.send({ status: true, message: "API running 🚀" });
});

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { userName, password, email, name } = req.body;

  const existingUser = userDetails.find(
    (u) => u.userName === userName
  );
  if (existingUser) {
    return res.status(409).send("User already exists");
  }
router.post("/signup", async (req, res) => {
  const userData = req.body;
  const { userName, password } = userData;

  const hashedPassword = await generateHash(password);

  // const newUser = {
  //   userName,
  //   name,
  //   email,
  //   password: hashedPassword,
  //   cart: [],
  // };

  userDetails.push(newUser);

  res.send({
    message: "Signup successful ✅",
    data: sanitizeUserData(newUser),
  });
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const user = userDetails.find((u) => u.userName === userName);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return res.status(401).send("Invalid password");
  }

  const payload = {
    userName: user.userName,
    email: user.email,
  };

  const token = generateToken(payload, "1h");

  res.cookie("authToken", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });

  res.send({
    message: "Login successful 🎉",
    data: sanitizeUserData(user),
  });
});

/* LOGOUT */
router.get("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.send("Logged out successfully 👋");
});

module.exports = router;
