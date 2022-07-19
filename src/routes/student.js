const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

///////////// All http  method for using is async wait ///////////////////

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
    const users = await Student.find();
    // console.log("get", users);
    res.status(200).send(users);
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

/////////////////////// get students By search by single Filelds key Id data//////////////// //

router.get("/students-search/:key", async (req, res) => {
  try {
    // console.log(`search?query=${req.params.key}`);
    const users = await Student.find({
      $or: [
        {
          // email_Id :{$regex:req.params.key}, now using email for search
          name: { $regex: req.params.key },
        },
      ],
    });
    console.log("gets", users);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

/////////////////////// get students By search querry for multiple filelds Id data//////////////// //

router.get("/students-query", async (req, res) => {
  try {
    let searchQuery = req.query;
    console.log("search? name=:", searchQuery);
    const users = await Student.find(searchQuery);
    console.log("students Query=:", users);
    // console.log("data Querry",users[0].email_Id);
    res.status(200).send(searchQuery);
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

////////////////// update students for put value prefix filelds data/////////////////////////////////

router.put("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params);
    const update = await Student.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    console.log(update);
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
