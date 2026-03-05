const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'app.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database at', dbPath);
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table ready');
            // Insert default admin user if not exists
            db.run(`
                INSERT OR IGNORE INTO users (username, password) 
                VALUES ('admin', 'admin')
            `, (err) => {
                if (err) {
                    console.error('Error inserting admin user:', err);
                } else {
                    console.log('Admin user initialized');
                }
            });
        }
    });
}

module.exports = db;
