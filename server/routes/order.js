import express from "express";
import { addOrder, deleteOrder, showOrders, updateOrderStatus } from './../controllers/order.js';
// import authMiddle from './../middleware/auth.js';


const router = express.Router();

router.get('/showall',showOrders);
router.post("/add", addOrder);
router.post("/delete", deleteOrder);
router.post("/update/status", updateOrderStatus);


export default router;