const express = require("express");
const createError = require("http-errors");
const router = express.Router();

const Student = require("../Models/Student.model");
// here '/' means products/   [products will be given when calling the Routes in app.js] relative url

router.get("/", async (req, res, next) => {
  try {
    // here we are using projection to get the desired fields or to omit the fields
    const result = await Student.find({}, { __v: 0 });
    // const result = await Product.find({}, {name: 1, _id: 0, price: 1});
    if(result.length==0)
    {
      throw createError(404, "There is no product");
    }
    res.send(result);
  } catch (error) {
    console.log(error.message)
    next(error)
  }
});

// asynchronous req for the creation of the product
router.post("/", async (req, res, next) => {
  try {
    const student = new Student(req.body);
    const result = await student.save();
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await Student.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.patch("/:id", async(req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = {new: true}; //for getting the new result
    const result = await Student.findByIdAndUpdate(id, updates, options);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
