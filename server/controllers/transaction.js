import bcrypt from "bcryptjs";
import express from "express";
// import mongoose from 'mongoose';
// import PostMessage from '../models/postMessage.js';
import fs from "fs";
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

///DATABASE

export const deposit = async (req, res) => {
  console.log(req.body);
  const amount = parseInt(req.body.amount);
  const username = req.body.username;
  if (!amount) {
    res.status(400).json({ message: "Amount not to be nulled" });
  }
  // res.status(200).json({ message: 'Success' });
  USERS.map((user) => {
    if (user.username == username) {
      user.balance += amount;

      fs.writeFile(
        "./../server/database/user.json",
        JSON.stringify(USERS),
        (err) => {
          if (err) {
            res.send("Amount not deposited");
          } else {
            res.status(200).send("Amount successfully deposited");
          }
        }
      );
    }
  });
};

export const withdraw = async (req, res) => {
  // console.log(req.body);
  const amount = parseInt(req.body.amount);
  const username = req.body.username;
  if (!amount) {
    res.status(400).json({ message: "Amount not to be nulled" });
  }
  // res.status(200).json({ message: 'Success' });
  USERS.map((user) => {
    if (user.username == username) {
      if (amount > user.balance) {
        return res.send("Not enough balance in the account");
      }
      user.balance -= amount;

      fs.writeFile(
        "./../server/database/user.json",
        JSON.stringify(USERS),
        (err) => {
          if (err) {
            res.send("Amount not withdrawn");
          } else {
            res.status(200).send("Amount successfully withdrawn");
          }
        }
      );
    }
  });
};

function getData(data){
  let {username, password, address, email, balance, accountNumber} = data;
  let newData = {username, password, address, email, balance, accountNumber};
  return newData;
}


export const payment = async (req, res) => {
  // console.log(req.body);
  const amount = parseInt(req.body.amount);
  const {sender, reciever} = req.body;

  if (!sender || !reciever || !req.body.password) {
    res.status(200).json({ message: "All field of data must be required" });
  }

  if (!amount) {
    res.status(400).json({ message: "Amount not to be nulled" });
  }

  try {
    const senderExist = await User.findOne({ sender });
    const recieverExist = await User.findOne({ reciever });
    
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      senderExist.password
    );

    if(!isPasswordCorrect){
      return res
        .status(500)
        .json({ message: "Incorrect password" });
    }
    else if (!senderExist) {
      return res
        .status(404)
        .json({ message: "No account with the sender account number." });
    } else if (!recieverExist) {
      return res
        .status(404)
        .json({ message: "No account with the reciever account number." });
    } else if (senderExist.balance < amount) {
      return res
        .status(400)
        .json({ message: "Not a valid ammount to be sent!" });
    }

    let senderTemp = getData(senderExist);
    let recieverTemp = getData(recieverExist);
    
    senderTemp.balance = senderTemp.balance - amount;
    recieverTemp.balance = recieverTemp.balance - amount;


    const senderUpdated = {...senderTemp} ;
    const recieverUpdated = { ...recieverTemp};
    // console.log(temp1);
    // console.log(temp2);
    // console.log(senderExist._doc._id.toString());
    console.log(senderUpdated);
    console.log(recieverUpdated);

    await User.findByIdAndUpdate(senderExist._doc._id.toString(), senderUpdated, { new: true });
    await User.findByIdAndUpdate(recieverExist._doc._id.toString(), recieverUpdated, { new: true });
    
    res.status(200).send('Transaction successfully executed');
  } catch (error) {
    console.log(error);
  }
  // res.status(200).json({ message: 'Success' });
  // USERS.map((user)=>{
  //   if(user.username == username ){
  //       user.balance +=amount;

  //       fs.writeFile('./../server/database/user.json', JSON.stringify(USERS), (err)=>{
  //           if(err){
  //               res.send('Amount not deposited');
  //           }
  //           else{
  //               res.status(200).send('Amount successfully deposited');
  //           }
  //       })
  //   }
  // })
};

export default router;
