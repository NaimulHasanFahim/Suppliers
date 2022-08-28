
import express from "express";
import addOrder from './../controllers/addOrder.js';


const router = express.Router();

router.post('/', addOrder);

router.get('/',(req,res)=>{
    res.status(200).json({message : "Hit the get point of product info!"});
})

export default router;