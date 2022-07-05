require("dotenv").config();
const express = require("express");
const routes = require("./routes/workouts");

//create an express app
const app = express();

//MIDDLEWARE
//checks if request has data and attaches to req object
app.use(express.json());
//fires for every request and logs path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//fire request to /api/workouts & then uses router
app.use("/api/workouts", routes);

//listen for requests
app.listen(process.env.PORT, () => {
  console.log("Running on Port", process.env.PORT);
});
