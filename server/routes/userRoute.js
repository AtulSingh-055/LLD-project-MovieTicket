const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Route for Register:

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.send({
        success: false,
        message: "user already exists",
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

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    console.log(user);

    if (!user) {
      return res.send({
        success: false,
        message: "You are not registered! Please register first",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Sorry, invalid password entered!",
      });
    }

    const token = jwt.sign({userId : user._id} , `${process.env.SECRET_KEY}` , {expiresIn:  "1d"})

    res.send({
      success: true,
      message: "User Logged in",
      token : token
    });
  } catch (error) {
    console.log(err);
  }
});

module.exports = router;
