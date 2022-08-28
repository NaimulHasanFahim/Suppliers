import express from "express";
import { showorders } from './../controllers/orderlist.js';


const router = express.Router();

router.get('/',showorders);

// router.get('/logout', logout);
// router.post('/login', login);
// router.get("/:username", authMiddle, userinfo);


export default router;