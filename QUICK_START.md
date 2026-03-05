# 🚀 Quick Start Guide - Login Application

## TLDR - Run Everything in 5 Minutes

### Step 1: Install Backend Dependencies
```powershell
cd server
npm install
```

### Step 2: Start Backend Server
```powershell
npm start
```
✓ Server will start on `http://localhost:5000`
✓ SQLite database will be created automatically
✓ Admin user (admin/admin) will be initialized

### Step 3: Install Frontend Dependencies (New Terminal)
```powershell
cd client
npm install
```

### Step 4: Start Frontend Application
```powershell
npm run dev
```
✓ Application will open on `http://localhost:5173`

### Step 5: Login
- **Username:** `admin`
- **Password:** `admin`
- Click Login button
- See "Welcome, admin!" message

---

## What Was Built

### ✅ Complete Files Created/Modified

**Backend (Node.js/Express/SQLite):**
- ✅ `server/db.js` - SQLite database connection & initialization
- ✅ `server/server.js` - Updated for SQLite (removed MongoDB)
- ✅ `server/routes/authRoutes.js` - Login API endpoint
- ✅ `server/package.json` - Updated dependencies (sqlite3 added)
- ✅ `server/.env` - Configuration file

**Frontend (React):**
- ✅ `client/src/pages/Login.jsx` - Login page with username/password inputs
- ✅ `client/src/pages/Welcome.jsx` - Welcome page showing "Welcome, admin!"
- ✅ `client/src/context/AuthContext.jsx` - Authentication context with LocalStorage
- ✅ `client/src/App.jsx` - Added routes for login and welcome pages

**Documentation:**
- ✅ `LOGIN_SETUP.md` - Complete setup and API documentation
- ✅ `QUICK_START.md` - This file

---

## ✨ Features Implemented

### Authentication
✅ Username/password login (username: admin, password: admin)
✅ Credentials validated against SQLite database
✅ Proper HTTP status codes (200 success, 401 unauthorized)
✅ Clear error messages for invalid login

### Frontend
✅ Login page with username and password fields
✅ Welcome page displaying "Welcome, [username]!"
✅ Username persistence using LocalStorage
✅ Username field prefilled on return visits
✅ Protected routes (need login to access welcome page)
✅ Logout functionality

### Backend
✅ Express.js API with /api/auth/login endpoint
✅ SQLite database with users table
✅ Admin user auto-created on start
✅ Async/await for database queries
✅ Proper error handling

### Database
✅ SQLite3 with users table
✅ Columns: id, username, password, created_at
✅ Default admin user inserted automatically
✅ Database file: `server/app.db` (auto-created)

---

## 🧪 Testing the Application

### Test Case 1: Successful Login
```
Username: admin
Password: admin
Expected Result: Redirects to /welcome
Shows: "Welcome, admin!"
```

### Test Case 2: Invalid Password
```
Username: admin
Password: wrong
Expected Result: Error message "Invalid credentials"
```

### Test Case 3: Invalid Username
```
Username: notadmin
Password: admin
Expected Result: Error message "Invalid credentials"
```

### Test Case 4: Username Persistence
```
1. Login successfully
2. Close browser/tab or logout
3. Return to http://localhost:5173/login
Expected Result: Username field shows "admin" (prefilled)
```

### Test Case 5: Protected Routes
```
1. Manually navigate to http://localhost:5173/welcome without logging in
Expected Result: Redirected to login page
```

---

## 📁 Project Structure

```
server/
├── server.js              # Main Express server
├── db.js                  # SQLite setup & initialization
├── package.json           # Dependencies
├── .env                   # Configuration
├── app.db                 # SQLite database (created on first run)
├── test-db.js             # Database test script
└── routes/
    └── authRoutes.js      # /api/auth/login endpoint

client/
├── src/
│   ├── App.jsx            # Main app with routes
│   ├── context/
│   │   └── AuthContext.jsx    # Auth state management
│   └── pages/
│       ├── Login.jsx          # Login page
│       └── Welcome.jsx        # Welcome page
├── vite.config.js
└── package.json
```

---

## 🔧 Key Code Snippets

### Login Component (React)
```jsx
// Fetches username from localStorage on mount
useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) setUsername(savedUsername);
}, []);

// Calls API to login
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(username, password);
        navigate('/welcome');
    } catch (err) {
        setError(err.response?.data?.message);
    }
};
```

### Authentication Context (React)
```jsx
const login = async (username, password) => {
    const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { username, password }
    );
    localStorage.setItem('username', username);
    setUser({ username });
};
```

### Login API (Node.js)
```javascript
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, user) => {
            if (user && user.password === password) {
                return res.status(200).json({
                    message: 'Login Successful',
                    user: { id: user.id, username: user.username }
                });
            }
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }
    );
});
```

### Database Initialization (Node.js)
```javascript
// Creates users table and inserts admin user
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);

db.run(`
    INSERT OR IGNORE INTO users (username, password) 
    VALUES ('admin', 'admin')
`);
```

---

## 🚨 Troubleshooting

### "Module not found: sqlite3"
Solution: Run `npm install` in server directory

### "Port 5000 already in use"
Solution: Change PORT in `.env` file or kill process using port 5000

### "Cannot connect to backend from frontend"
Solution: 
- Check server is running on http://localhost:5000
- Check firewall settings
- Ensure CORS is enabled (it is by default)

### "Login button does nothing"
Solution:
- Check browser console for errors (F12)
- Verify backend server is running
- Check network tab to see API calls

### "Database not being created"
Solution:
- Delete `server/app.db` if it exists
- Run `npm start` again to recreate
- Check file permissions in server directory

---

## 📊 API Reference

### POST /api/auth/login

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Login Successful",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

---

## 📝 Notes for Development

### Current Implementation
- Plain text passwords (for demo only)
- No JWT tokens (session-based)
- LocalStorage for client-side persistence
- SQLite for simplicity

### For Production
- Use bcryptjs for password hashing
- Implement JWT tokens
- Use HTTPS
- Add rate limiting
- Implement CSRF protection
- Add input validation
- Use environment variables for secrets

---

## ✅ Verification Checklist

- [ ] Server installed and running on port 5000
- [ ] SQLite database created (server/app.db exists)
- [ ] Admin user created in database
- [ ] Client installed and running on port 5173
- [ ] Login page displays with username and password fields
- [ ] Can login with admin/admin
- [ ] Welcome page displays "Welcome, admin!"
- [ ] Username persists in LocalStorage
- [ ] Error message shows for invalid credentials
- [ ] Logout button returns to login page
- [ ] Protected routes redirect to login

---

## 🎯 Next Steps

Once everything is working:

1. **Add more users:** Modify database to add more test users
2. **Add password hashing:** Use bcryptjs to hash passwords
3. **Add JWT tokens:** Implement proper session management
4. **Add remember me:** Extend session duration
5. **Add forgot password:** Email verification flow
6. **Host online:** Deploy to Heroku, Vercel, etc.

---

**Happy coding! 🎉**
