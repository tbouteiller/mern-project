const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

//@type: STATIC: signup
//@desc: A static signup method for creating a user.
userSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("Please add all required fields.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Please use a stronger password.");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw Error("Email already in use.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  return await this.create({ name, email, password: hashed });
};

//@type: STATIC: login
//@desc: A static login method for logging in a user
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be completed.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("The email you provided cannot be found.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("The password you provided was incorrect.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
