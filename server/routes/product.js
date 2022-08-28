import express from "express";
import { addProduct, deleteProduct, showProducts, updateProduct } from './../controllers/product.js';
// import authMiddle from './../middleware/auth.js';


const router = express.Router();

router.get('/showall',showProducts);
router.post("/add", addProduct);
router.post("/delete", deleteProduct);
router.post("/update", updateProduct);


export default router;