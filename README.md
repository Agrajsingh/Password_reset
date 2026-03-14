# Password Reset Application

A full-stack authentication utility that provides a secure "Forgot Password" workflow. This application allows users to request a password reset via email and securely update their credentials using a time-limited token.

## 🚀 Features

- **Forgot Password Flow**: Users can enter their email to receive a reset link.
- **Secure Tokens**: Generated using Node.js `crypto` with a 1-hour expiration.
- **Email Notifications**: Integrated with `nodemailer` (configured for Ethereal SMTP in development).
- **Secure Password Hashing**: Uses `bcryptjs` for protecting user credentials.
- **Responsive UI**: Built with React and Bootstrap for a seamless experience across devices.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Bootstrap 5 & React-Bootstrap
- **Routing**: React Router 7
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (Mongoose)
- **Email**: Nodemailer
- **Security**: Bcryptjs, Crypto

## 📁 Project Structure

```text
password-reset-app/
├── Backend/            # Express server and API
│   ├── controllers/    # Business logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
├── Frontend/           # React client
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # Route pages
│   │   └── App.jsx     # Main application logic
└── README.md           # This file
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- pnpm (recommended) or npm

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file in the `Backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Access the app at `http://localhost:5173`.

## 🛡️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/forgot-password` | Sends reset link to user email |
| POST | `/api/auth/reset-password` | Updates password using valid token |

## 📝 License
This project is open-source.
