import express from "express";
import { deposit, payment, withdraw } from './../controllers/transaction.js';
import authMiddle from './../middleware/auth.js';


const router = express.Router();


router.post('/payment', payment);
router.post('/deposit', authMiddle, deposit);
router.post('/withdraw', withdraw);
// router.get("/:username", authMiddle, userinfo);


export default router;