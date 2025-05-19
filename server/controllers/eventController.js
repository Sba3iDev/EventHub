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

export const getAllEvents = (req, res) => {
    db.all(
        `SELECT id, title, description, category, date, time, location, user_id, created_at FROM events`,
        [],
        (err, rows) => {
            if (err) return res.status(400).send({ error: err.message });
            res.status(200).send(rows);
        }
    );
};

export const getEvent = (req, res) => {
    db.all(
        `SELECT id, title, description, category, date, time, location, user_id, created_at FROM events WHERE user_id = ?`,
        [req.params.id],
        (err, row) => {
            if (err) return res.status(400).send({ error: err.message });
            if (!row) return res.status(404).send({ error: "Event not found" });
            res.status(200).send(row);
        }
    );
};

export const updateEvent = (req, res) => {
    const { title, description, category, date, time, location } = req.body;
    db.run(
        `UPDATE events SET title = ?, description = ?, category = ?, date = ?, time = ?, location = ? WHERE id = ?`,
        [title, description, category, date, time, location, req.params.id],
        function (err) {
            if (err) return res.status(400).send({ error: err.message });
            if (this.changes === 0) return res.status(404).send({ error: "Event not found" });
            res.status(200).send({ message: "Event updated successfully" });
        }
    );
};

export const deleteEvent = (req, res) => {
    const userId = req.params.id;
    if (isNaN(userId)) return res.status(400).send({ error: "Invalid user ID" });
    db.run(`DELETE FROM events WHERE id = ?`, [userId], function (err) {
        if (err) return res.status(500).send({ error: err.message });
        if (this.changes === 0) return res.status(404).send({ error: "Event not found" });
        res.status(200).send({ message: "Event deleted successfully" });
    });
};
