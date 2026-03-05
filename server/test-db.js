const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'app.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    } else {
        console.log('✓ Connected to SQLite database');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.serialize(() => {
        // Create users table
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
                console.log('✓ Users table created/verified');
            }
        });

        // Insert default admin user
        db.run(`
            INSERT OR IGNORE INTO users (username, password) 
            VALUES ('admin', 'admin')
        `, (err) => {
            if (err) {
                console.error('Error inserting admin user:', err);
            } else {
                console.log('✓ Admin user initialized (admin/admin)');
            }
        });

        // Verify data
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                console.error('Error reading users:', err);
            } else {
                console.log('✓ Users in database:', rows);
                db.close();
                console.log('\n✓ Database setup complete!');
            }
        });
    });
}
