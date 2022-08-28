import express from "express";
import update from './../controllers/updateOrder.js';


const router = express.Router();

router.post('/', update);

router.get('/',(req,res)=>{
    res.status(200).json({message : "Hit the get point of product info!"});
})

export default router;