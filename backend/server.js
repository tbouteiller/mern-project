const express = require("express");

//create am express app
const app = express();

//react to requests with route handler
//takes request and response object
app.get("/", (req, res) => {
  res.json({ mssg: "Test" });
});

//listen for requests
app.listen(4000, () => {
  console.log("Running on Port 4000");
});
