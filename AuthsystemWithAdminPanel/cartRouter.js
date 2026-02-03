const express = require("express");
const authController = require("./authController");
const cartRouter = express.Router();

const userDetails = [
  {
    username: "shivsharan yadav",
    name: "shivsharan",
    email: "shivsharanyadav9516@gmail.com",
    password: "shivsharan@123",
    cart: [],
  },
];
cartRouter.post("/add-to-cart", authController, (req, res) => {
  const user = res.local.user;

  user.cart.push({ id: 101, price: 12000, name: "laptop" });
  res.send({ message: " product added to cart", cart: user.cart });
});
module.exports = cartRouter;
