require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
require("./src/db/dbLocal_conn");
// require("./db/server");
fs = require('fs');
const studentRouter = require("./src/routes/student");
const RegisterRouter = require("./src/routes/Register");
const LoginRouter = require("./src/routes/Login");
const cookieParser = require("cookie-parser");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

// console.log("secrekKey",process.env.SECRET_KEY);
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(LoginRouter, RegisterRouter, studentRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));


app.listen(port, () => {
  console.log(
    `Your Connection is Success And Port Number is: https://localhost:${port}`
  );
});
