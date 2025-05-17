import db from "../models/database.js";

export const createEvent = (req, res) => {
    try {
        const { title, description, category, date, time, location, user_id } = req.body;
        db.run(
            `INSERT INTO events (title, description, category, date, time, location, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, description, category, date, time, location, user_id],
            (err) => {
                if (err) return res.status(400).send({ error: err.message });
                res.status(201).send({ message: "Event created successfully" });
            }
        );
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
