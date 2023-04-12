const router = require("express").Router();
const User = require("../models/User");
// const Otp = require("../models/Otp");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
require("dotenv").config();
const cookie_time = process.env.COOKIE_EXPIRES_TIME;

// Register
router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send({
      message: "Account with this email already exists. Please login!"
    });
  }
  else{
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
    console.log(req.body);
    try {
      const savedUser = await newUser.save();
      res.status(201).json({ success: true, savedUser });
    } catch (err) {
      res.status(500).json(err.stack);
    }
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    // !user && res.status(401).json("Wrong credentials! EMAIL");
    if (!user) {
      return res.status(401).json("Something went wrong!");
    }
    else{
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      console.log(user);
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  
      // OriginalPassword !== req.body.password &&
      //   res.status(401).json("Wrong credentials! Password");
      if (OriginalPassword !== req.body.password) {
        return res.status(401).json("Something went wrong!");
      }
      else{
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        // console.log(user);
        const { password, ...others } = user._doc;
        res.cookie("token", accessToken, {
          expires: new Date(Date.now() + cookie_time * 24 * 60 * 60 * 1000),
          httpOnly: true,
        });
        return res.status(200).json({ ...others, accessToken });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "An error occurred." });
  }
});

// Logout user
router.get("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

module.exports = router;