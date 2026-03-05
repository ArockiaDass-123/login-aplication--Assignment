# Vercel Deployment Guide

## Deployment Steps

### 1. Frontend Deployment (React)

#### Option A: Deploy from GitHub (Recommended)
1. Go to https://vercel.com
2. Sign in with GitHub account
3. Click "New Project"
4. Select your repository: `login-aplication--Assignment`
5. Configure settings:
   - **Root Directory:** `client`
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add Environment Variable:
   - **Name:** `VITE_API_URL`
   - **Value:** (Will be your backend URL - set after backend deployment)
7. Click "Deploy"

#### Option B: Deploy from Command Line
```powershell
npm install -g vercel
cd c:\Users\arock\Downloads\MERN-Stack-Hero4\client
vercel
```

### 2. Backend Deployment (Node.js/Express)

**Important:** SQLite requires file storage. For Vercel serverless (ephemeral filesystem), we recommend:

#### Option A: Deploy Backend to Vercel (Simple)
```powershell
cd c:\Users\arock\Downloads\MERN-Stack-Hero4\server
vercel
```

Configuration:
- **Framework:** Node.js
- **Build Command:** (leave empty)
- **Output Directory:** (leave empty)

#### Option B: Deploy Backend to Railway (Better for Databases)
1. Go to https://railway.app
2. Sign in with GitHub
3. Create new project → GitHub Repo
4. Select your repository
5. Deploy backend folder
6. Set environment variables

#### Option C: Deploy Backend to Render (Free Option)
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `server`

### 3. Update Frontend API URL

After deploying backend, update your frontend:

**File:** `client/src/context/AuthContext.jsx`

Replace:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

With your deployed backend URL:
```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

### Environment Variables

#### Frontend (.env.local in Vercel)
```
VITE_API_URL=https://your-backend-url.com/api
```

#### Backend (.env in Vercel)
```
PORT=5000
NODE_ENV=production
```

---

## Quick Deployment Summary

### For Frontend Only (Static):
```powershell
cd client
npm run build
vercel --prod
```

### For Full Stack (Recommended):

1. **Deploy Frontend to Vercel:**
   - Push code to GitHub
   - Connect on Vercel.com
   - Deploy automatically

2. **Deploy Backend to Railway/Render:**
   - Choose hosting provider
   - Connect GitHub repo
   - Deploy backend separately

3. **Connect them:**
   - Get backend URL from Railway/Render
   - Update `VITE_API_URL` in frontend
   - Redeploy frontend

---

## Current GitHub URL
```
https://github.com/ArockiaDass-123/login-aplication--Assignment
```

This is already set up for Vercel deployment with:
- ✅ vercel.json in both client and server
- ✅ Proper build scripts
- ✅ Clean folder structure
