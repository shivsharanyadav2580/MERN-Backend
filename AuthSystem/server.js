const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const userRouter = require("./router");
const cartRouter = require("./cartRouter");

const app = express();
const PORT = 4000;

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://localhost:4000", "ws://localhost:4000"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/user", userRouter);
app.use("/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
