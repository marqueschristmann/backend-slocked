import express from "express";
import { createSalaUser, deleteSalaUser, getSalasUser } from "../controllers/SalaUser.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/salauser',verifyUser, getSalasUser);
router.post('/salauser',verifyUser, adminOnly, createSalaUser);
router.delete('/salauser/:id',verifyUser, adminOnly, deleteSalaUser);

export default router;