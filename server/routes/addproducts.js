import express from "express";
import addProducts from './../controllers/addProducts.js';


const router = express.Router();

router.post('/', addProducts);

router.get('/',(req,res)=>{
    res.status(200).json({message : "Hit the get point of product info!"});
})

export default router;