import express from "express";
import {Login, logOut, Me} from "../controllers/Auth.js";

const router = express.Router();

router.get('/me',verifyToken, Me,);
router.post('/login',verifyToken, Login);
router.delete('/logout', logOut);

export default router;
