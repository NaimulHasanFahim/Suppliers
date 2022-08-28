import express from "express";
import deleteProduct from './../controllers/deleteProduct.js';


const router = express.Router();

router.post('/', deleteProduct);

router.get('/',(req,res)=>{
    res.status(200).json({message : "Hit the get point of product info!"});
})

export default router;