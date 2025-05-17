import express from "express";
import sqlite from "sqlite3";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
app.use(express.json());

const db = new sqlite.Database("./database/users.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to database");
    }
});

app.post("/users", async (req, res) => {
    const { username, email, role, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run(
            "INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)",
            [username, email, role, hashedPassword],
            (err) => {
                if (err) return res.status(400).json({ error: err.message });
                res.status(201).send({ message: "User created successfully" });
            }
        );
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(port, () => {
    console.log("Started server");
});
