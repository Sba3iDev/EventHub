import express from "express";
import {
    createEvent,
    updateEvent,
    getAllEvents,
    getEventByUserId,
    getEventByEventId,
    deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventByUserId);
router.get("/event/:id", getEventByEventId);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
