import sqlite from "sqlite3";
import fs from "fs";

fs.mkdir("./database/", (err) => {
    if (err) {
        return console.error("Error creating folder:", err);
    }
});

const db = new sqlite.Database("./database/database.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to database");
        createTables();
    }
});

function createTables() {
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            role TEXT NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
        (err) => {
            if (err) console.error("Error creating users table:", err.message);
            else console.log("Users table created");
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
            if (err) console.error("Error creating events table:", err.message);
            else console.log("Events table created");
        }
    );
}

export default db;
