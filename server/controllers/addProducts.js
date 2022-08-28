import bcrypt from "bcryptjs";
import e from "express";
import express from "express";
import jwt from "jsonwebtoken";
import Products from "../models/productSchema.js";

const router = express.Router();

const addProducts = async (req, res) => {
  
/////// schema of product for supplier ////
//     product_id : {type: String, required: true},
//     supplier_id : {type: String, required: true, unique: true},
//     price : {type: Number, default : 0},
//     image :{type: String, required: true}
  const { product_id,supplier_id, price,amount} =
    req.body;
  // console.log(req.body);

  if (
    !product_id ||
    !supplier_id ||
    !price ||
    !amount

  ) {
    res.status(200).json({ message: "All field of data must be required" });
    return;
  }

  try {
    // console.log(phoneNumber);
    const existingProduct = await Products.findOne({product_id})
    
   
    if (existingProduct){

        console.log(existingProduct.amount+amount);
        Products.updateOne({product_id : product_id}, {amount: existingProduct.amount+amount}, (err,Products)=>{
        if(err) throw err;
		console.log("Record updated successfully");

		console.log(Products);
        res.status(200).json("success" );

        } );
    }else{
        // const hashedPassword = await bcrypt.hash(password, 12);
    // // console.log(phoneNumber);
       Products.create({
        product_id,
        supplier_id,
        price,
        amount,
        
      });
      res.status(200).json( "success" );

    }
      

    

    
    // const token = jwt.sign({ email: result.email, id: result._id }, "KEY", {
    //   expiresIn: "1h",
    // });
    // res.cookie("token", token,{httpOnly:true}).send('Successfully registration completed!');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }

};

export default addProducts;
