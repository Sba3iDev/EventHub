import bcrypt from "bcrypt";
import db from "../models/database.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, role, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            `INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)`,
            [username, email, role, hashedPassword],
            (err) => {
                if (err) return res.status(400).send({ error: err.message });
                db.get(`SELECT id FROM users WHERE email = ?`, [email], (err, row) => {
                    if (err) return res.status(400).send({ error: err.message });
                    res.status(201).send({ id: row.id, message: "User created successfully" });
                });
            }
        );
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        db.get(`SELECT password FROM users WHERE email = ?`, [email], async (err, row) => {
            if (err) return res.status(400).send({ error: err.message });
            if (!row) return res.status(404).send({ error: "User not found" });
            const match = await bcrypt.compare(password, row.password);
            if (!match) return res.status(401).send({ error: "Invalid password" });
            db.get(`SELECT id FROM users WHERE email = ?`, [email], (err, row) => {
                if (err) return res.status(400).send({ error: err.message });
                res.status(200).send({ id: row.id, message: "Login successful" });
            });
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getAllUsers = (req, res) => {
    db.all(`SELECT id, username, email, role, created_at FROM users`, [], (err, rows) => {
        if (err) return res.status(400).send({ error: err.message });
        res.status(200).send(rows);
    });
};

export const getUser = (req, res) => {
    db.get(`SELECT id, username, email, role, created_at FROM users WHERE id = ?`, [req.params.id], (err, row) => {
        if (err) return res.status(400).send({ error: err.message });
        if (!row) return res.status(404).send({ error: "User not found" });
        res.status(200).send(row);
    });
};

export const updateUser = (req, res) => {
    const { username, email } = req.body;
    db.run(`UPDATE users SET username = ?, email = ? WHERE id = ?`, [username, email, req.params.id], function (err) {
        if (err) return res.status(400).send({ error: err.message });
        if (this.changes === 0) return res.status(404).send({ error: "User not found" });
        res.status(200).send({ message: "User updated successfully" });
    });
};

export const deleteUser = (req, res) => {
    const userId = req.params.id;
    if (isNaN(userId)) return res.status(400).send({ error: "Invalid user ID" });
    db.run(`DELETE FROM users WHERE id = ?`, [userId], function (err) {
        if (err) return res.status(500).send({ error: err.message });
        if (this.changes === 0) return res.status(404).send({ error: "User not found" });
        db.run(`DELETE FROM events WHERE user_id = ?`, [userId], function (err) {
            if (err) return res.status(500).send({ error: err.message });
            res.status(200).send({ message: "User deleted successfully" });
        });
    });
};
