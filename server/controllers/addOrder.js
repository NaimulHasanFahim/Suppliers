import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import addOrder from "../models/orderlistSchema.js";
import User from "../models/userSchema.js";


const router = express.Router();

const addOrders = async (req, res) => {
  
/////// schema of product for supplier ////
// product_id : {type: String, required: true},
// supplier_id : {type: String, required: true, unique: true},
// transaction_id : {type: String, required: true},
// address : {type: String, required: true},
// price : {type: Number, default : 0},
// image :{type: String, required: false}
// amount : {type: Number, default : 0},
  const { product_id,supplier_id, transaction_id, address, price, amount,status} =
    req.body;
  // console.log(req.body);

  if (
    !product_id ||
    !supplier_id ||
    !price ||
    !amount ||
    !transaction_id ||
    !address ||
    !status

  ) {
    res.status(200).json({ message: "All field of data must be required" });
    return;
  }

  try {
    // console.log(phoneNumber);
    const existingOrder = await addOrder.findOne({product_id});
    console.log(existingOrder);
    if(existingOrder){
        addOrder.updateOne({product_id : product_id}, {amount: existingOrder.amount + amount}, (err,addOrder)=>{
            if(err) throw err;
            console.log("Record updated successfully");
    
            console.log(addOrder);
            res.status(200).json("success updated" );
    
            } );

    }
   else{
    addOrder.create({
        product_id,
        supplier_id, 
        transaction_id,
        address,
        price,
        amount
      
    });
    // const token = jwt.sign({ email: result.email, id: result._id }, "KEY", {
    //   expiresIn: "1h",
    // });
    // res.cookie("token", token,{httpOnly:true}).send('Successfully registration completed!');
    res.status(200).json( "success created" );
   }
    
  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: "Something went wrong." });
  }

};

export default addOrders;
