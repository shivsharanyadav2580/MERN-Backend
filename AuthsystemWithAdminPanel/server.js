const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./router");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

// 🔥 THIS LINE WAS MISSING
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`);
});
