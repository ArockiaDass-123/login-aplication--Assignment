const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/auth/login
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Query database for user
        db.get(
            'SELECT * FROM users WHERE username = ?',
            [username],
            (err, user) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Server error' });
                }

                // Check if user exists and password matches
                if (user && user.password === password) {
                    return res.status(200).json({
                        message: 'Login Successful',
                        user: {
                            id: user.id,
                            username: user.username
                        }
                    });
                } else {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
            }
        );
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
