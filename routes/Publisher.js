import express from "express";

import { publishMQTTMessage, getPublisherPage } from "../controllers/Publish.js";

const router = express.Router();

// Publisher Home Route.
router.get("/pub", getPublisherPage);

router.post("/pub", publishMQTTMessage);

export default router;
