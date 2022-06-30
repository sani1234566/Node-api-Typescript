require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
require("./src/db/dbLocal_conn");
// require("./db/server");
const studentRouter = require("./src/Router/student_Router");
const RegisterRouter = require("./src/Router/Register_router");
const LoginRouter = require("./src/Router/Login_router");
const cookieParser = require("cookie-parser");

// console.log("secrekKey",process.env.SECRET_KEY);
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(LoginRouter, RegisterRouter, studentRouter);

app.listen(port, () => {
  console.log(
    `Your Connection is Success And Port Number is: https://localhost:${port}`
  );
});
