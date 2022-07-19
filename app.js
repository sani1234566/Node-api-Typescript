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
const customer = require("./src/routes/customer_view");
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
app.use(cors());


// console.log("secrekKey",process.env.SECRET_KEY);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(RegisterRouter, studentRouter ,customer);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.listen(port, () => {
  console.log(
    `Your Connection is Success And Port Number is: https://localhost:${port}`
  );
});
