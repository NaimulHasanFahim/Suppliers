import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const router = express.Router();

//SIGN IN
export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(200).json({ message: "All field of data must be required" });
  }

  try {
    const existingUser = await User.findOne({ email });

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

//SIGN UP
export const signup = async (req, res) => {
  const {
    address,
    email,
    username,
    password,
    phoneNumber,
    confirmPassword,
    bankid,
  } = req.body;
  console.log(req.body);

  if (
    !username ||
    !address ||
    !email ||
    !password ||
    !phoneNumber ||
    !confirmPassword ||
    !bankid
  ) {
    res.status(200).json({ message: "All field of data must be required" });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });


    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      username,
      address,
      phoneNumber,
      bankid,
    });
    console.log(result);
    const token = jwt.sign({ email: result.email, id: result._id }, "KEY", {
      expiresIn: "1h",
    });
    const temp = { result, token };
    // res.cookie("userDetails & token", temp,{httpOnly:true}).send('Successfully registration completed!');
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//SIGN OUT
export const signout = (req, res) => {
  res.clearCookie("token").send("Successfully logged out.");
};

// export const userinfo = (req, res) => {
//   USERS.map((user) => {
//     if (user.username == req.params.username) {
//       res.send(user);
//     }
//   });
// };

export default router;
