import express from "express";
import { createSalaUser, deleteSalaUser } from "../controllers/SalaUser.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";


const router = express.Router();

router.post('/salauser',verifyUser, adminOnly, createSalaUser);
router.delete('/salauser/:id',verifyUser, adminOnly, deleteSalaUser);
router.delete('/usersala/:id',verifyUser, adminOnly, deleteSalaUser);

export default router;