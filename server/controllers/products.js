import express from "express";

import User from "../models/productSchema.js";


const router = express.Router();


export const showProducts = async (req, res) => {

  try {
    const filter = {};
    const existingUser = await User.find(filter);

    if(existingUser)
        res.status(200).json({ result: existingUser });
    else
        res.status(201).json("nothing to show");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};




export default router;
