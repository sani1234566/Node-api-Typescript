require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
require("./src/db/dbLocal_conn");
// require("./db/server");
fs = require('fs');
const studentRouter = require("./src/routes/student");
const RegisterRouter = require("./src/routes/Register");
const cookieParser = require("cookie-parser");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
const cors = require('cors');
const bodyParser = require('body-parser');
const customer = require("./src/models/cutomer");


// console.log("secrekKey",process.env.SECRET_KEY);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(customer);
app.use(RegisterRouter, studentRouter);

// app.use('/loan', customer);




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.use(cors({
  origin: process.env.PORT || 3000,
  methods: ['GET','POST'],
  credentials: true
}))


app.listen(port, () => {
  console.log(
    `Your Connection is Success And Port Number is: https://localhost:${port}`
  );
});


