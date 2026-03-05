# Full-Stack Login Application

A complete authentication system built with React (frontend), Node.js/Express (backend), and SQLite database.

## Features

✅ Simple username/password authentication
✅ Login form with persistent username (LocalStorage)
✅ Welcome page after successful login
✅ Error messages for invalid credentials
✅ Database-backed authentication
✅ Protected routes
✅ Logout functionality

## Project Structure

```
MERN-Stack-Hero4/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx     # Login page with username/password
│   │   │   └── Welcome.jsx   # Welcome page after login
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Authentication context & state
│   │   ├── App.jsx           # Routes setup
│   │   └── main.jsx
│   └── package.json
│
├── server/                    # Node.js + Express Backend
│   ├── server.js             # Main server file with SQLite
│   ├── db.js                 # SQLite database setup
│   ├── app.db               # SQLite database (auto-created)
│   ├── routes/
│   │   └── authRoutes.js    # Login API endpoint
│   ├── .env
│   └── package.json
│
└── README.md
```

## Technology Stack

**Frontend:**
- React 18
- React Router v6
- Axios (HTTP client)
- Vite (build tool)

**Backend:**
- Node.js
- Express.js
- SQLite3 (SQL database)

**Database:**
- SQLite (file-based SQL database)

## Installation

### Prerequisites
- Node.js v14+ installed
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already exists) with:
```
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

The server will:
- Initialize SQLite database
- Create `users` table
- Insert default admin user (username: `admin`, password: `admin`)
- Run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Endpoints

### POST /api/auth/login

**Request:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**Success Response (HTTP 200):**
```json
{
  "message": "Login Successful",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

**Error Response (HTTP 401):**
```json
{
  "message": "Invalid credentials"
}
```

## Database Schema

### users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Default record:
INSERT INTO users (username, password) VALUES ('admin', 'admin');
```

## How to Use

### 1. Start Backend Server
```bash
cd server
npm start
```

Expected output:
```
Connected to SQLite database at [path/to/app.db]
✓ Users table ready
✓ Admin user initialized
Server running on port 5000
```

### 2. Start Frontend Application
```bash
cd client
npm run dev
```

Expected output:
```
VITE v4.5.2  ready in 123 ms

➜  Local:   http://localhost:5173/
```

### 3. Access Login Page

1. Open browser to `http://localhost:5173`
2. Login with:
   - **Username:** `admin`
   - **Password:** `admin`

### 4. After Successful Login

- Username is saved to LocalStorage
- Redirected to Welcome page showing "Welcome, admin!"
- Click "Logout" to return to login page

### 5. Prefilled Username

- Revisit login page - username field will be prefilled from LocalStorage
- Try logging in again with correct password

## Testing Instructions

### Test 1: Successful Login
1. Username: `admin`
2. Password: `admin`
3. Expected: Redirects to Welcome page
4. Expected: "Welcome, admin!" message displays

### Test 2: Invalid Credentials
1. Username: `admin`
2. Password: `wrong`
3. Expected: Error message displays: "Invalid credentials"
4. Expected: Stay on login page

### Test 3: Missing Fields
1. Leave username or password empty
2. Click Login
3. Expected: Browser validation message

### Test 4: Username Persistence
1. Login successfully with `admin/admin`
2. Close browser/clear auth
3. Return to login page
4. Expected: Username field is prefilled with "admin"

### Test 5: Logout
1. Login successfully
2. Click "Logout" button on Welcome page
3. Expected: Redirected to login page
4. Expected: Username localStorage cleared

## Code Quality Features

✅ Proper folder structure (frontend/backend separation)
✅ Clean, readable code with comments
✅ Async/await for API calls
✅ Proper error handling with try-catch
✅ Appropriate HTTP status codes (200, 401, etc)
✅ Protected routes with React Router
✅ Context API for state management
✅ LocalStorage for client-side persistence
✅ Database-backed authentication (not hardcoded)

## Browser Compatibility

- Chrome/Edge/Brave
- Firefox
- Safari
- Any modern browser with ES6 support

## Troubleshooting

### Server won't start
- Check if port 5000 is available
- Verify Node.js is installed: `node --version`
- Check for errors in `server/server.js`

### Frontend won't start
- Check if port 5173 is available
- Verify all dependencies installed: `npm install`
- Clear node_modules and reinstall if needed

### Login not working
- Ensure backend server is running on port 5000
- Check browser Console for errors
- Verify credentials (admin/admin)
- Clear browser cache/localStorage

### Database issues
- Delete `server/app.db` to reset database
- Run server again to reinitialize

## Environment Variables

### Server (.env)
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key (optional)
```

## Security Notes

⚠️ **This is a basic demo application**
- Passwords are stored in plain text (for demo only)
- In production: use bcrypt for password hashing
- Add HTTPS/TLS for secure communication
- Implement JWT tokens for session management
- Add rate limiting for login attempts
- Use environment variables for sensitive data

## Author
Built following full-stack development best practices

## License
Educational - Use freely for learning purposes
