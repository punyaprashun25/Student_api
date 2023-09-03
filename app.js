const express = require("express");
const mongoose = require("mongoose");
const CreateError = require("http-errors");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGO_DB_URL}`, {
    dbName: `${process.env.MONGO_DB_NAME}`,
    user: `${process.env.MONGO_DB_USER}`,
    pass: `${process.env.MONGO_DB_PASS}`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected.....");
  });

  const StudentRoute = require("./Routes/Student.route");

  app.use("/students", StudentRoute);

  app.use((req, res, next) => {
    // const err = new Error("Not found");
    // err.status = 404;
    // next(err);
    // different method using http-errors
    next(CreateError(404, "Not found"));
  });
  
  // express error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  });


app.listen(3000, ()=>{
    console.log('Server started on port 3000....');
})