import express from "express";
import { signin, signout, signup } from './../controllers/auth.js';


const router = express.Router();


router.post('/signup', signup);
router.get('/signout', signout);
router.post('/signin', signin);
// router.get("/:username", authMiddle, userinfo);


export default router;