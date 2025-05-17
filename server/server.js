import express from "express";
import sqlite from "sqlite3";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
app.use(express.json());

const db = new sqlite.Database("./database/database.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to database");
        createtables();
    }
});

function createtables() {
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            role TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
        (err) => {
            if (err) {
                console.error("Error creating users table:", err.message);
            } else {
                console.log("Users table ready");
            }
        }
    );
}

app.post("/users", async (req, res) => {
    const { username, email, role, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            `INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)`,
            [username, email, role, hashedPassword],
            (err) => {
                if (err) return res.status(400).send({ error: err.message });
                res.status(201).send({ message: "User created successfully" });
            }
        );
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    if (isNaN(userId)) {
        return res.status(400).send({ error: "Invalid user ID" });
    }
    db.run(`DELETE FROM users WHERE id = ?`, [userId], function (err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully" });
    });
});

app.listen(port, () => {
    console.log("Started server");
});
