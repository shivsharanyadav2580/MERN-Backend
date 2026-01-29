const express = require("express");
const authController = require("./authController");

const cartRouter = express.Router();

/* SAME DB reference (important) */
const { userDetails } = require("./router"); // or move DB to separate file

cartRouter.post("/add", authController, (req, res) => {
  const { userName } = res.locals.user;

  const user = userDetails.find((u) => u.userName === userName);
  if (!user) {
    return res.status(404).send("User not found");
  }

  user.cart.push({
    id: 101,
    name: "MacBook",
    price: 90000,
  });

  res.send({
    message: "Product added to cart ✅",
    cart: user.cart,
  });
});

module.exports = cartRouter;
