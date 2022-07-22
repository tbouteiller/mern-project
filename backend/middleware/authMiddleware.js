const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Protects routes and verifies tokens for user authorization
const protect = async (req, res, next) => {
  let token;

  //check the http headers for a token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //extract token from http headers: bearer[0], token[1]
      token = req.headers.authorization.split(" ")[1];

      //verify token (decodes and gives payload access)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the payload and assign to req.user
      req.user = await User.findById(decoded.id).select("-password");

      //call next middleware
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Authorization failed: No token found." });
  }
};

module.exports = { protect };
