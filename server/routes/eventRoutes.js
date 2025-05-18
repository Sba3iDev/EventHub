import express from "express";
import { createEvent, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);
router.put("/:id", updateEvent);

export default router;
