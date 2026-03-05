# Application Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (REACT)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Port: 5173 (Vite Dev Server)                             │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │ App.jsx (Router)                                │   │  │
│  │  │  - AuthProvider wrapper                         │   │  │
│  │  │  - Routes setup                                 │   │  │
│  │  │  - ProtectedRoute component                     │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                        │                                 │  │
│  │        ┌───────────────┼───────────────┐               │  │
│  │        ▼               ▼               ▼               │  │
│  │  ┌──────────┐  ┌──────────┐   ┌─────────────┐         │  │
│  │  │ Login    │  │ Welcome  │   │ Other Pages │         │  │
│  │  │ Page     │  │ Page     │   │ (Protected) │         │  │
│  │  │          │  │          │   │             │         │  │
│  │  │ - Form   │  │ - Greet  │   │ - Home      │         │  │
│  │  │ - Submit │  │ - Logout │   │ - Cart      │         │  │
│  │  │ - Error  │  │ - Button │   │ - Settings  │         │  │
│  │  └──────────┘  └──────────┘   └─────────────┘         │  │
│  │        │               │                                │  │
│  │        └───────────────┴────────────────────────────┐  │  │
│  │                                                     │  │  │
│  │              AuthContext.jsx (State)               │  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │  │
│  │  │ • user state                                │  │  │  │
│  │  │ • loading state                             │  │  │  │
│  │  │ • login(username, password)                 │  │  │  │
│  │  │ • logout()                                  │  │  │  │
│  │  │ • localStorage persistence                  │  │  │  │
│  │  └─────────────────────────────────────────────┘  │  │  │
│  │                        │                           │  │  │
│  │                        │ axios POST                │  │  │
│  │                        ▼                           │  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │  │
│  │  │ localStorage                                │  │  │  │
│  │  │ Key: 'username'                             │  │  │  │
│  │  │ Value: username string                      │  │  │  │
│  │  └─────────────────────────────────────────────┘  │  │  │
│  │                                                     │  │  │
│  └──────────────────────────────────────────────────┘  │  │
│                        │                               │  │
│                        │ HTTP POST                     │  │
│                        │ /api/auth/login               │  │
│                        │                               │  │
│                        ▼                               │  │
└────────────────────────────────────────────────────────┘  │
                                                              │
                    NETWORK                                  │
                                                              │
┌────────────────────────────────────────────────────────────┘
│
│
└─────────────────────────────────────────────────────────────────┐
│                       SERVER (NODE.JS)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Port: 5000 (Express Server)                              │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │ server.js (Main Server)                         │   │  │
│  │  │  - Express app initialization                  │   │  │
│  │  │  - Middleware (CORS, express.json)             │   │  │
│  │  │  - Route registration                          │   │  │
│  │  │  - Server listen                               │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                        │                                 │  │
│  │                        ▼                                 │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │ authRoutes.js                                   │   │  │
│  │  │  Route: POST /api/auth/login                   │   │  │
│  │  │                                                │   │  │
│  │  │  1. Extract username & password                │   │  │
│  │  │  2. Validate input                             │   │  │
│  │  │  3. Query database                             │   │  │
│  │  │  4. Compare credentials                        │   │  │
│  │  │  5. Return response (200 or 401)              │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                        │                                 │  │
│  │                        │ db.get()                        │  │
│  │                        ▼                                 │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │ db.js (SQLite Connection)                       │   │  │
│  │  │  - Database initialization                     │   │  │
│  │  │  - Create users table                          │   │  │
│  │  │  - Insert admin user                           │   │  │
│  │  │  - Export db instance                          │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                        │                                 │  │
│  │                        ▼                                 │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │ app.db (SQLite Database File)                   │   │  │
│  │  │                                                │   │  │
│  │  │  Table: users                                  │   │  │
│  │  │  ┌──────┬──────────┬──────────┬──────────┐   │   │  │
│  │  │  │ id   │ username │ password │ created  │   │   │  │
│  │  │  ├──────┼──────────┼──────────┼──────────┤   │   │  │
│  │  │  │ 1    │ admin    │ admin    │ 2026-... │   │   │  │
│  │  │  └──────┴──────────┴──────────┴──────────┘   │   │  │
│  │  │                                                │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────┘  │  │
│                                                             │  │
└─────────────────────────────────────────────────────────────┘


```

## Data Flow Diagram

```
USER ACTION                HTTP REQUEST              SERVER PROCESSING
─────────────────────────────────────────────────────────────────────

User opens app
    │
    ├─► Check localStorage for username
    │
    └─► Display Login Page
        (username field prefilled if found)

User enters credentials
   (admin / admin)
    │
    └─► Click Login Button
        │
        ├─► Validate form (HTML5)
        │
        └─► handleSubmit() called
            │
            └─► POST /api/auth/login  ────────────► authRoutes.js
                  {                                     │
                    username: "admin",      ┌──────────┘
                    password: "admin"       │
                  }                         └─► db.get() on users table
                                                │
                                                ├─► Check if username exists
                                                │
                                                ├─► Validate password
                                                │
                                                └─► Response:
                                                    - Success: HTTP 200
                                                      {message: "Login Successful",
                                                       user: {id: 1, username: "admin"}}
                                                    - Failure: HTTP 401
                                                      {message: "Invalid credentials"}
                
                ◄──────────────────────────────────────────────────────
                Response received
                │
                ├─ Success (200)?
                │   │
                │   ├─► localStorage.setItem('username', 'admin')
                │   │
                │   └─► navigate('/welcome')
                │       │
                │       └─► Display: "Welcome, admin!"
                │
                └─ Failure (401)?
                    │
                    └─► Display: "Invalid credentials"
                        Stay on Login Page

User clicks Logout
    │
    └─► logout() called
        │
        ├─► localStorage.removeItem('username')
        │
        └─► navigate('/login')
```

## Technology Stack

```
Frontend Layer
├── React 18 (UI Framework)
├── React Router v6 (Navigation)
├── Axios (HTTP Client)
├── React Hooks (State Management)
│   ├── useState
│   ├── useEffect
│   ├── useContext
│   └── useNavigate
└── localStorage API (Browser Storage)

Backend Layer
├── Node.js (Runtime)
├── Express.js (Server Framework)
├── CORS Middleware (Cross-Origin)
└── dotenv (Configuration)

Database Layer
└── SQLite3 (Lightweight SQL Database)
    └── users table
```

## API Contract

```
Request:
├── Method: POST
├── URL: http://localhost:5000/api/auth/login
├── Headers: {
│   "Content-Type": "application/json"
│ }
├── Body: {
│   "username": "string",
│   "password": "string"
│ }
└── Timeout: Default (axios)

Response - Success (200):
├── Status: 200 OK
├── Headers: {"Content-Type": "application/json"}
└── Body: {
    "message": "Login Successful",
    "user": {
      "id": 1,
      "username": "admin"
    }
  }

Response - Failure (401):
├── Status: 401 Unauthorized
├── Headers: {"Content-Type": "application/json"}
└── Body: {
    "message": "Invalid credentials"
  }
```

## Security Model

```
Request Validation
└── Input Validation (HTML5 browser-level)
    
Response Security
├── HTTP Status Codes (200, 401)
├── CORS Enabled (Access-Control headers)
└── No sensitive data in response

Session Management
└── localStorage persistence
    ├── Username stored (not password)
    ├── Persists across page refresh
    └── Cleared on logout

Database Security
├── Plain text passwords (demo only)
└── INSERT OR IGNORE to prevent duplicates
```

## Component Hierarchy

```
App (Router, AuthProvider, CartProvider)
  │
  ├─► AuthContext.Provider
  │     │
  │     ├─► ProtectedRoute for /welcome
  │     │     └─► Welcome.jsx
  │     │
  │     ├─► PublicRoute for /login
  │     │     └─► Login.jsx
  │     │
  │     └─► ProtectedRoute for other pages
  │           ├─► Home.jsx
  │           ├─► Cart.jsx
  │           └─► Dashboard.jsx
  │
  └─► Navbar
        └─► Navigation links
```

## State Management

```
AuthContext
├── State Variables:
│   ├── user
│   │   └── {username: "admin"} / null
│   └── loading
│       └── true / false
│
├── Functions:
│   ├── login(username, password)
│   │   └── Makes API call, stores username, updates state
│   └── logout()
│       └── Clears storage, updates state
│
└── Persistence:
    └── localStorage
        └── Key: 'username'
            Value: username string
```

## Error Handling Flow

```
login() function
  │
  ├─► Try Block
  │     │
  │     └─► axios.post('/api/auth/login')
  │         │
  │         ├─ Success?
  │         │   └─► localStorage.setItem('username')
  │         │
  │         └─ Error?
  │             └─► Throw error with response data
  │
  ├─► Catch Block
  │     │
  │     └─► Extract error message
  │         │
  │         └─► setError(message)
  │
  └─► Finally Block
      │
      └─► setLoading(false)
```

This comprehensive architecture ensures a clean separation of concerns with proper data flow, error handling, and user experience.
