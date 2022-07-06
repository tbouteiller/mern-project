require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/workouts");

//create an express app
const app = express();

//MIDDLEWARE
app.use(express.json()); //checks if request has data and attaches to req object
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
}); //fires for every request and logs path and method

//fire request to /api/workouts & then uses router
app.use("/api/workouts", routes);

//connect to db -> returns a promise -> only listen for requests when db connects
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB. Listening on port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
