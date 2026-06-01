# OctoFit Tracker - Modern Multi-Tier Application

A modern multi-tier application built with GitHub Copilot Agent Mode featuring:

- **Frontend (React 19):** Dynamic presentation tier with React Router
- **Backend (Node.js + Express):** RESTful API with TypeScript
- **Database (MongoDB):** NoSQL data persistence with Mongoose

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite presentation tier
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── backend/           # Express + TypeScript logic tier
    ├── src/
    │   ├── config/
    │   ├── models/
    │   ├── routes/
    │   ├── scripts/
    │   └── server.ts
    └── package.json
```

## Architecture

- **Port 5173:** Frontend (Vite dev server)
- **Port 8000:** Backend API
- **Port 27017:** MongoDB

## Features

✅ Codespaces-aware API URL configuration
✅ Comprehensive API routing (Users, Teams, Activities, Workouts, Leaderboard)
✅ MongoDB seed data with realistic test data
✅ React components with real-time API integration
✅ TypeScript throughout the stack

## Getting Started

### Frontend
```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

### Backend
```bash
cd octofit-tracker/backend
npm install
npm run dev
```

### Database Seed
```bash
cd octofit-tracker/backend
npm run seed
```

---

Built with ❤️ using GitHub Copilot Agent Mode