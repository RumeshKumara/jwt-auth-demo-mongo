# JWT Authentication Demo: Full-Stack App with React, Node.js, and MongoDB 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-blue.svg)](https://reactjs.org/)

## Overview 📖

This is a beginner-friendly full-stack demo application demonstrating **JWT (JSON Web Token) authentication**. Users can register, login, and access a protected dashboard. The backend uses Node.js with Express, MongoDB for data storage, and JWT for secure sessions. The frontend is built with React for a simple, responsive UI. 🎯

Key learning goals:
- User registration/login with password hashing (bcrypt). 🔐
- JWT token generation and verification. 📜
- Protected routes (middleware). 🛡️
- API integration from React (Axios). ⚡
- Database operations with Mongoose (MongoDB ODM). 🗄️

This project started as a SQL (SQLite/Sequelize) version but was updated to MongoDB for flexibility. 🔄

## Features ✨

- **User Registration**: Create accounts with username, email, and password (hashed). ➕
- **User Login**: Authenticate and receive a JWT token (expires in 1 hour). 🔑
- **Protected Dashboard**: Access only with valid token; displays user info. 📊
- **Frontend Persistence**: Token stored in localStorage for session management. 💾
- **Error Handling**: Validation, duplicates, invalid credentials. ⚠️
- **CORS Enabled**: Frontend can call backend seamlessly. 🌉

## Tech Stack 🛠️

- **Backend**: Node.js 🟢, Express.js 🚀, MongoDB (Mongoose) 🐘, JWT 📄, bcryptjs 🔒, dotenv 🌍, CORS 🌐.
- **Frontend**: React ⚛️ (Create React App), Axios 📡 for API calls.
- **Database**: MongoDB (local or Atlas cloud) ☁️.
- **Testing**: Postman 📬 for API.
- **Dev Tools**: Nodemon 🔄 (auto-restart).

## Prerequisites 📋

- [Node.js](https://nodejs.org/) (v18+) 🟢.
- [MongoDB](https://www.mongodb.com/try/download/community) (local install) 🐘 or free [MongoDB Atlas](https://www.mongodb.com/atlas) account for cloud ☁️.
- [Postman](https://www.postman.com/) (optional, for API testing) 📬.
- Git (for cloning, if forking) 🐙.

## Installation 🛠️

### 1. Clone/Setup Project 📥

```bash
git clone <your-repo-url> jwt-auth-demo  # Or create folder manually
cd jwt-auth-demo
```

### 2. Backend Setup 🔧

```bash
cd backend
npm init -y
npm install express mongoose jsonwebtoken bcryptjs dotenv cors
npm install -D nodemon
```

- Copy all backend files (config, controllers, etc.) from the demo. 📂
- Create `.env` in `backend/`:
  ```
  JWT_SECRET=your_super_secret_key_here_change_in_prod 🔑
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/jwtdemo  # Local or Atlas URI 🐘
  ```

### 3. Frontend Setup 🎨

```bash
cd ../frontend
npx create-react-app .  # Initializes React app ⚛️
npm install axios
```

- Copy all frontend files (src/App.js, components, etc.) from the demo. 📁
- Update `package.json` if needed (dependencies listed in demo).

### 4. Database Setup 🗄️

- **Local MongoDB**: Start service (e.g., `brew services start mongodb-community` on Mac). ▶️
- **Atlas Cloud**: Create cluster, whitelist IP (0.0.0.0/0 for dev), get URI, update `.env`. ☁️

## Running the App ▶️

### Backend

```bash
cd backend
npm run dev  # Add "dev": "nodemon server.js" to package.json 🔄
```

- Console: "✅ MongoDB Connected" and "Server running on port 5000". 🟢
- Test: Visit `http://localhost:5000` (should 404, but server alive). 🧪

### Frontend

```bash
cd frontend
npm start
```

- Opens `http://localhost:3000`. 🌐
- Register/login via UI—dashboard on success. 🎉

**Full Flow**:
1. Start backend. ▶️
2. Start frontend. ▶️
3. Register a user. ➕
4. Login → Redirect to dashboard. ➡️
5. Logout → Back to login. ❌

## API Endpoints 📡

Base URL: `http://localhost:5000/api/auth`

| Method | Endpoint     | Description                  | Body/Auth                  | Response                  |
|--------|--------------|------------------------------|----------------------------|---------------------------|
| POST   | `/register`  | Register new user ➕         | `{username, email, password}` | `{message, userId}`       |
| POST   | `/login`     | Login and get JWT 🔑        | `{email, password}`        | `{token, message}`        |
| GET    | `/dashboard` | Protected user dashboard 📊 | `Authorization: Bearer <token>` | `{message, user}`    |

- Errors: `400/401` with `{error: "message"}`. ⚠️

## Testing with Postman 🧪

1. **Register** (`POST /api/auth/register`):
   - Body (JSON): `{"username": "test", "email": "test@example.com", "password": "123"}` 📝
   - Expect: `201` with success message. ✅

2. **Login** (`POST /api/auth/login`):
   - Body (JSON): `{"email": "test@example.com", "password": "123"}` 🔑
   - Expect: `200` with `token`. Copy token. 📋

3. **Dashboard** (`GET /api/auth/dashboard`):
   - Headers: `Authorization: Bearer <token>` 🛡️
   - Expect: `200` with user data. 📊

See detailed Postman guide in project docs (or previous messages). 📖

**Verify DB**: Use MongoDB Compass: Connect to URI, query `db.users.find()`. 🔍

## Folder Structure 📁

```
jwt-auth-demo/
├── backend/                 # Server 🖥️
│   ├── config/              # DB connection (db.js) 🔗
│   ├── controllers/         # Logic (authController.js) ⚙️
│   ├── middleware/          # JWT verify (authMiddleware.js) 🛡️
│   ├── models/              # Schemas (User.js) 📋
│   ├── routes/              # Endpoints (authRoutes.js) 🛤️
│   ├── .env                 # Secrets 🔒
│   ├── server.js            # Main file 🚀
│   └── package.json         # Deps 📦
├── frontend/                # Client 🎨
│   ├── public/              # index.html 🌐
│   ├── src/
│   │   ├── components/      # Login.js, Dashboard.js 🖼️
│   │   ├── App.js           # Main app ⚛️
│   │   ├── index.js         # Entry 🚪
│   │   └── App.css          # Styles 🎨
│   └── package.json         # Deps 📦
├── README.md                # This file 📖
└── .gitignore               # Ignores 🚫
```

## Troubleshooting 🆘

| Issue | Fix |
|-------|-----|
| "MongoDB Connection Error" ❌ | Check `MONGO_URI`; start MongoDB service. ▶️ |
| "No token provided" 🔑 | Add `Bearer <token>` header in requests. 📝 |
| CORS error 🌐 | Ensure `cors()` in `server.js`. ✅ |
| Token expires ⏰ | Regenerate via login (1h expiry). 🔄 |
| React not calling API ⚛️ | Check `API_BASE` in components (`http://localhost:5000`). 🔗 |
| DB empty 🗄️ | Run register endpoint; check Compass. 🔍 |

- Logs: Watch backend console. 👀
- Restart: Kill processes, `rm -rf node_modules`, `npm install`. 🔄

## Contributing / Learning Next 🌱

- **Expand**: Add roles (admin/user) 👑, refresh tokens 🔄, email verification 📧.
- **Deploy**: Backend to Render/Heroku 🚀, Frontend to Vercel/Netlify ☁️, Mongo to Atlas 🐘.
- **Security**: Use HTTPS 🔒, helmet.js 🛡️, rate-limiting ⏱️.
- **Resources**:
  - [JWT Docs](https://jwt.io/introduction) 📜
  - [Mongoose Guide](https://mongoosejs.com/docs/) 🐘
  - [React Auth Tutorial](https://react.dev/learn/managing-state) ⚛️

Fork this repo, star it, and share your improvements! ⭐ Questions? Open an issue. ❓

## License 📄

MIT License. See [LICENSE](LICENSE) for details.

---

*Built with ❤️ for beginners by Grok (xAI). Last updated: October 2025.* 🎉
