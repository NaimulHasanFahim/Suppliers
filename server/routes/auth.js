import express from "express";
import { login, logout, userinfo } from './../controllers/auth.js';
import authMiddle from './../middleware/auth.js';


const router = express.Router();


router.get('/logout', logout);
router.post('/login', login);
router.get("/:username", authMiddle, userinfo);


export default router;