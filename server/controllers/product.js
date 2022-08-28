import express from "express";

import Product from "../models/productSchema.js";

const router = express.Router();

// SHOW ALL PRODUCTS
export const showProducts = async (req, res) => {
  try {
    const allProducts = await Product.find().populate('supplierId');

    if (allProducts) return res.status(200).json({ result: allProducts });
    else return res.status(201).json("No available products right now!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// ADD NEW PRODUCTS
export const addProduct = async (req, res) => {
  const { title, desc, img, price, quantity, supplierId } = req.body;
  // console.log(req.body);
  if (!title || !desc || !img || !price || !quantity || !supplierId)
    return res
      .status(200)
      .json({ message: "All field of data must be required" });

  try {
    const existingProduct = await Product.findOne({ title });
    if (existingProduct)
      return res
        .status(200)
        .json({ message: "Product already exist with this title" });

    const result = await Product.create({
      title,
      desc,
      img,
      price,
      quantity,
      supplierId,
    });
    console.log(result);
    res.status(200).json({
      message: "Product creation successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// UPDATE PRODUCT BY ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    const notExistingProduct = await Product.findOne({ _id: productId });
    if (notExistingProduct == null)
        return res.status(404).send(`No product with id: ${productId}`);
    
      const updatedProduct = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      _id: id,
      num: Random(),
    };
    await PostMessage.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// DELETE PRODUCT BY ID
export const deleteProduct = async (req, res) => {
  // console.log(req.params);

  try {
    const { productId } = req.body;
    // console.log(productId);
    // if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(404).send(`No product with id: ${productId}`);

    const notExistingProduct = await Product.findOne({ _id: productId });
    // console.log(notExistingProduct);

    if (notExistingProduct == null)
      return res.status(404).send(`No product with id: ${productId}`);

    await Product.findByIdAndRemove(productId);
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export default router;
