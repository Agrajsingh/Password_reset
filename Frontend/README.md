# Password Reset App - Frontend

This is the React frontend for the Password Reset Application. It provides the user interface for requesting password resets and setting new passwords.

## 📦 Key Packages
- **React 19**: Modern UI library.
- **Vite**: Ultra-fast build tool.
- **React Router**: For navigation between Forgot Password and Reset Password views.
- **Axios**: Handling API requests to the backend.
- **Bootstrap**: UI styling and layout.

## 🛠️ Installation

```bash
pnpm install
```

## 🚀 Development

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`.

## 🔗 Connected API
The frontend expects the backend to be running on `http://localhost:5000`. This can be configured in your axios setup/components.

## 📂 Components
- `ForgotPassword`: Form to collect user email.
- `ResetPassword`: Form to input and confirm the new password using a token.
