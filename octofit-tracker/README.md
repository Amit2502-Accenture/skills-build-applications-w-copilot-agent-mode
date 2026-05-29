# OctoFit Tracker

A full-stack fitness tracking application built with React 19, Node.js, Express, TypeScript, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── backend/           # Node.js + Express + TypeScript backend
    ├── src/
    ├── package.json
    └── tsconfig.json
```

## Setup Instructions

### Frontend

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend

```bash
cd octofit-tracker/backend
npm install
npm run dev
```

The backend will run on `http://localhost:8000`

### MongoDB

Make sure MongoDB is running on `mongodb://localhost:27017`

## Ports

- **Frontend**: 5173 (Vite dev server)
- **Backend**: 8000 (Express server)
- **MongoDB**: 27017 (MongoDB default port)

## Features

- React 19 frontend with Vite
- Node.js + Express backend with TypeScript
- MongoDB database with Mongoose ODM
- CORS enabled for frontend-backend communication

## Development

Run both frontend and backend development servers in separate terminals:

```bash
# Terminal 1 - Frontend
cd octofit-tracker/frontend && npm run dev

# Terminal 2 - Backend
cd octofit-tracker/backend && npm run dev
```
