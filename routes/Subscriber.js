import express from "express";
import { getSubscriberPage } from "../controllers/Subscriber.js";

const router = express.Router();

// Subscriber Home Route.
router.get("/sub", getSubscriberPage);

export default router;
