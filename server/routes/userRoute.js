const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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

     // Hashing The password

     const salt = await bcrypt.genSalt(10);

     const hashedPassword = await bcrypt.hash(req.body.password, salt);
     req.body.password = hashedPassword;
 
     console.log(salt);

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
