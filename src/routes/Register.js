require("dotenv").config();
const express = require("express");
const router = new express.Router();
const RegisterSchema = require("../models/registers");
const auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  try {
    const pass = req.body.password;
    const cpass = req.body.confirm_password;
    if (pass === cpass) {
      const userRegistion = new RegisterSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        phone_Number: req.body.phone_Number,
        password: pass,
        confirm_password: cpass,
      });

      const token = await userRegistion.AuthGenerateToken();
      console.log("token data", token);

      console.log(userRegistion);
      const savedb = await userRegistion.save();
      console.log("page data ", savedb);

      // now get cookies for token through
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });
      console.log("Cookies data ", cookie);

      res.status(201).send(userRegistion);
    } else {
      res.send("Your passwword are Not matching").status(404);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/signup", async (req, res) => {
  // console.log("required",req)
  try {
    const users = await RegisterSchema.find();
    // console.log("get", users);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  // console.log("Email: jitendra@gmail.com", req.body.email);
  try {
    const emails = req.body.email;
    const pass = req.body.password;
    console.log(`Email id is ${emails} and password is ${pass}`);
    const userCredentials = await RegisterSchema.findOne({ email: email });
    console.log(userCredentials);
    console.log("password", userCredentials.password);
    // userCredentials.password === pass before  normal password condtion used
    // now compare hash password data based & user fill data
    const isMatchHasPass = await bcrypt.compare(pass, userCredentials.password);
    console.log("Match password", isMatchHasPass);
    const token = await userCredentials.AuthGenerateToken();
    console.log("token data", token);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 60000),
      httpOnly: true,
      // secure:true  for using https service secure mode
    });
    console.log("Cookies data ", cookie);
    console.log("Cookies get data ", req.cookies.jwt);
    if (isMatchHasPass) {
      res.status(201).send("Login is succesfully");
    } else {
      res.send("Invalid Password Details");
    }
  } catch (error) {
    res.status(400).send("Invalid Login Details" + error);
  }
});

router.get("/logout", auth, async (req, res) => {
  alert();
  try {
    // 1)  particular data base remove token with using auth midddleware for multiple device
    req.user.tokens = req.user.tokens.filter((item) => {
      return item.token !== req.token;
    });
    // 2)  all device logout for netflix multiple device.
    // req.user.tokens = [];
    console.log(req.user);
    // only clearCookie single device logout
    res.clearCookie("jwt");
    console.log("Logout succesfully..");
    await user.save();
    res.status(201).send("Logout is succesfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
