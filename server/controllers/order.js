import express from "express";
import Order from "../models/orderSchema.js";

const router = express.Router();

// SHOW ALL ORDERS
export const showOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().populate('productId');

    if (allOrders) res.status(200).json(allOrders);
    else res.status(201).json("No available orders right now!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ADD NEW ORDER
export const addOrder = async (req, res) => {
  const {
    productId,
    supplierId,
    transactionId,
    address,
    price,
    quantity,
    ecom_orderId,
    status,
  } = req.body;
  console.log(req.body);
  if (
    !productId ||
    !supplierId ||
    !transactionId ||
    !address ||
    !price ||
    !quantity ||
    !ecom_orderId ||
    !status
  )
    return res.status(200).json({ message: "All field of data must be required" });

  try {
    const existingOrder = await Order.findOne({ transactionId });
    if (existingOrder)
      res
        .status(200)
        .json({ message: "Order already exist with this Transaction ID" });

    const result = await Order.create({
      productId,
      supplierId,
      transactionId,
      address,
      price,
      quantity,
      ecom_orderId,
      status,
    });
    console.log(result);
    res.status(200).json({
      message: "Product creation successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT BY ID
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId,status} = req.body;

    Order.findByIdAndUpdate(orderId, {status : status},
      function (err, docs) {
        if (err){
          console.log(err)
        }
        else{
          res.status(200).json({ message: "Order Status updated successfullt" });      
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// DELETE PRODUCT BY ID
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const notExistingOrder = await Order.findOne({ _id: orderId });
    // console.log(notExistingProduct);

    if (notExistingOrder === null)
      return res.status(404).send(`No order with id: ${orderId}`);

    await Order.findByIdAndRemove(orderId);
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default router;
