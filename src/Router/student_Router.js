const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

///////////// All http  method for using is async wait ///////////////////

router.get('/' ,async(req,res,next)=>{
  res.send("<h1> Node js............ </h1>");
  next();
})

router.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    // console.log(user);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/////////////////////// get all students data//////////////// //

router.get("/students", async (req, res) => {
  // console.log("required",req)
  try {
    // const users = await Student.find();
    // console.log("get", users);
    res.send("<h1> students .................</h1>");
  } catch (error) {
    res.status(500).send(error);
  }
});

/////////////////////// get students By Id data//////////////// //

router.get("/students/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    const users = await Student.findById(req.params.id);
    // console.log("get", users);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

////////////////// update students for patch value prefix filelds data/////////////////////////////////

router.patch("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // console.log(update);
    res.send(update).status(201);
  } catch (error) {
    res.status(404).send(error);
  }
});

////////////////// Delete students data/////////////////////////////////

router.delete("/students/:id", async (req, res) => {
  //   console.log(req);
  try {
    const id = req.params.id;
    // console.log(id);
    const delteData = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(500).send("server Error");
    }
    res.send(delteData).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});

module.exports = router;
