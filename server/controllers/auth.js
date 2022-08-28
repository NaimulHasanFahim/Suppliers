import bcrypt from "bcryptjs";
import express from "express";
// import PostMessage from '../models/postMessage.js';
import fs from "fs";
import jwt from "jsonwebtoken";
///DATABASE
import User from "../models/userSchema.js";
const router = express.Router();

///DATABASEE
let USERS = [];

fs.readFile("./../server/database/user.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  USERS = JSON.parse(data);
  // console.log(data);
});


export const login = async (req, res) => {
  // console.log(req.body);
  const { accountNumber, password } = req.body;
  if (!accountNumber || !password) {
    res.status(200).json({ message: "All field of data must be required" });
  }

  try {
    const existingUser = await User.findOne({ accountNumber });

    if (!existingUser)
      return res
        .status(404)
        .json({ message: "Please log in with a registered account number." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credintials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "KEY",
      { expiresIn: "1h" }
    );
    // res.cookie("token", token,{httpOnly:true}).send(username);  
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};


export const logout = (req, res) => {
  res.clearCookie("token").send("Successfully logged out.");
};


export const userinfo = (req, res) => {
  USERS.map((user) => {
    if (user.username == req.params.username) {
      res.send(user);
    }
  });
};

export default router;
