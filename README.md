# Password Reset Application

A full-stack MERN application (MongoDB, Express, React, Node) illustrating a secure password reset flow using tokens and email notifications.

## Features
- User Registration & Login
- Password Reset Request (Email-based)
- Secure Password Reset with Token
- Responsive UI using React & Bootstrap

## Prerequisites
- **Node.js**: v18+ recommended
- **pnpm**: Used for package management
- **MongoDB**: Local or Atlas connection

## Setup

### Backend
1. Go to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file based on `.env.example` (or configure your own):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/password-reset
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret
   # SMTP configuration (optional, defaults to Ethereal)
   # SMTP_HOST=
   # SMTP_PORT=
   # SMTP_EMAIL=
   # SMTP_PASSWORD=
   ```
4. Start the server:
   ```bash
   pnpm start
   # or for development (auto-restart)
   pnpm dev
   ```

### Frontend
1. Go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```

## Tech Stack
- **Frontend**: React, Vite, Axios, Bootstrap, React Icons
- **Backend**: Node.js, Express, Mongoose, Bcryptjs, Nodemailer, JWT
