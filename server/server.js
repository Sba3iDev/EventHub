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
                console.log("Users table created");
            }
        }
    );
    db.run(
        `CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            location TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)`,
        (err) => {
            if (err) {
                console.error("Error creating users table:", err.message);
            } else {
                console.log("Events table created");
            }
        }
    );
}

app.post("/users/register", async (req, res) => {
    try {
        const { username, email, role, password } = req.body;
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

app.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        db.get(`SELECT password FROM users WHERE email = ?`, [email], async (err, row) => {
            if (err) return res.status(400).send({ error: err.message });
            if (!row) return res.status(404).send({ error: "User not found" });
            const match = await bcrypt.compare(password, row.password);
            if (!match) {
                return res.status(401).send({ error: "Invalid password" });
            }
            res.status(200).send({ message: "Login successful" });
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get("/users", (req, res) => {
    db.all(`SELECT id, username, email, role, created_at FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(400).send({ error: err.message });
        }
        res.status(200).send(rows);
    });
});

app.get("/users/:id", (req, res) => {
    db.get(`SELECT id, username, email, role, created_at FROM users WHERE id = ?`, [req.params.id], (err, row) => {
        if (err) {
            return res.status(400).send({ error: err.message });
        }
        if (!row) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(row);
    });
});

app.put("/users/:id", (req, res) => {
    const { username, email } = req.body;
    db.run(`UPDATE users SET username = ?, email = ? WHERE id = ?`, [username, email, req.params.id], function (err) {
        if (err) {
            return res.status(400).send({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send({ message: "User updated successfully" });
    });
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
