const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cookie_time = process.env.COOKIE_EXPIRES_TIME;

// Register
router.post("/register", async(req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            return res.status(400).send({
                message: "Account with this email already exists. Please login!"
            });
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC).toString(),
        });
        console.log(req.body);
        const savedUser = await newUser.save();
        return res.status(201).json({
            success: true,
            savedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Login user
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        }).select(
                "+password");
        if (!user) {
            return res.status(401).json("Something went wrong!");
        } else {
            const hashedPassword = CryptoJS.AES.decrypt(
                    user.password,
                    process.env.PASS_SEC);
            console.log(user);
            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            if (OriginalPassword !== req.body.password) {
                return res.status(401).json("Something went wrong!");
            } else {
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                        process.env.JWT_SEC, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
                const {
                    password,
                    ...others
                } = user._doc;
                res.cookie("token", accessToken, {
                    expires: new Date(Date.now() + cookie_time * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                });
                return res.status(200).json({
                    ...others,
                    accessToken
                });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: "An error occurred."
        });
    }
});

// Logout user
router.get("/logout", async(req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "Logged out",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;