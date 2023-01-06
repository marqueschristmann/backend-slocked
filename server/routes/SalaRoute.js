import express from "express";
import {
    getSalas,
    getSalaById,
    createSala,
    updateSala,
    deleteSala
} from "../controllers/Salas.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/salas',verifyUser, getSalas);
router.get('/salas/:id',verifyUser, getSalaById);
router.post('/salas',verifyUser, adminOnly, createSala);
router.patch('/salas/:id',verifyUser, adminOnly, updateSala);
router.delete('/salas/:id',verifyUser, adminOnly, deleteSala);

export default router;