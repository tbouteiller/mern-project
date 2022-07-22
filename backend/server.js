const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

connectDB();
const app = express();

//middleware
app.use(express.json());
app.use("/api/workouts", require("./routes/workoutRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
