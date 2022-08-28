import express from "express";
import { showProducts } from './../controllers/products.js';
import authMiddle from './../middleware/auth.js';


const router = express.Router();

router.get('/',showProducts);

// router.get('/logout', logout);
// router.post('/login', login);
// router.get("/:username", authMiddle, userinfo);


export default router;