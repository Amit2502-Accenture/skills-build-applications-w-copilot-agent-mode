import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import workoutsRouter from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Determine API base URL based on environment
let apiBaseUrl = '';
if (process.env.CODESPACE_NAME) {
  // Running in GitHub Codespaces
  apiBaseUrl = `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
} else {
  // Running locally
  apiBaseUrl = `http://localhost:${PORT}`;
}

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Backend is running',
    apiBaseUrl: apiBaseUrl,
    environment: process.env.CODESPACE_NAME ? 'Codespaces' : 'Local',
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 OctoFit Backend Server is running on port ${PORT}`);
  console.log(`🌐 API Base URL: ${apiBaseUrl}`);
  console.log(`📡 Environment: ${process.env.CODESPACE_NAME ? 'GitHub Codespaces' : 'Local'}`);
  if (process.env.CODESPACE_NAME) {
    console.log(`   Codespace Name: ${process.env.CODESPACE_NAME}`);
  }
  console.log(`\n📚 API Documentation:`);
  console.log(`   - Health: GET ${apiBaseUrl}/api/health`);
  console.log(`   - Users: GET/POST ${apiBaseUrl}/api/users`);
  console.log(`   - Teams: GET/POST ${apiBaseUrl}/api/teams`);
  console.log(`   - Activities: GET/POST ${apiBaseUrl}/api/activities`);
  console.log(`   - Workouts: GET/POST ${apiBaseUrl}/api/workouts`);
  console.log(`   - Leaderboard: GET/POST ${apiBaseUrl}/api/leaderboard`);
  console.log(`\n🧪 Test with curl:`);
  console.log(`   curl ${apiBaseUrl}/api/health`);
  console.log(`   curl ${apiBaseUrl}/api/users`);
  console.log(`   curl ${apiBaseUrl}/api/activities\n`);
});
