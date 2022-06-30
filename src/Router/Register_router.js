require("dotenv").config();
const express = require("express");
const router = new express.Router();
const RegisterSchema = require("../models/registers");

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

module.exports = router;
