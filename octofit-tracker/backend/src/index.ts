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

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Backend is running' });
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
  console.log(`📝 API Documentation:`);
  console.log(`   - Health: GET http://localhost:${PORT}/api/health`);
  console.log(`   - Users: GET/POST http://localhost:${PORT}/api/users`);
  console.log(`   - Teams: GET/POST http://localhost:${PORT}/api/teams`);
  console.log(`   - Activities: GET/POST http://localhost:${PORT}/api/activities`);
  console.log(`   - Workouts: GET/POST http://localhost:${PORT}/api/workouts`);
  console.log(`   - Leaderboard: GET/POST http://localhost:${PORT}/api/leaderboard`);
});
