const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Route for Register:

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: false,
        message: "user already Exists",
      });
    }

    const newUser = await User(req.body);
  await newUser.save();

  res.send({
    success: true,
    message: "User registered successfully",
  });
  
  } catch (error) {
    console.log(error);
  }

  
});

module.exports = router;
