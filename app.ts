require("dotenv").config();
// const express = require("express");
import express from 'express';
const app = express();
const  port = process.env.PORT || 3000;
require("./src/db/dbLocal_conn");
// require("./db/server");
import fs from 'fs';
// import studentRouter from "./src/routes/students";
// import RegisterRouter from "./src/routes/Register";
import * as EmployeeRouter from "./src/routes/employee_view";
// import cookieParser  from "cookie-parser";
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json';
import  bodyParser from 'body-parser';
// import  customer from "./src/routes/customer_view";
// import customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token");
    if ('OPTIONS' == req.method) {
        // res.send(200);
        res.sendStatus(200);
    }
    else {
        next();
    }
});

// const csrfProtection = csrf()

// console.log("secrekKey",process.env.SECRET_KEY);
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.use(EmployeeRouter);

// app.use(RegisterRouter, studentRouter ,customer,EmployeeRouter);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(port, () => {
  console.log(
    `Your Connection is Success And Port Number is: https://localhost:${port}`
  );
});
