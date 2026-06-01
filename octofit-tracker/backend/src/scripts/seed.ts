import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Workout } from '../models/Workout';
import { Leaderboard } from '../models/Leaderboard';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});
    await Leaderboard.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const users = await User.insertMany([
      {
        username: 'john_fitness',
        email: 'john@example.com',
        password: 'hashed_password_1',
        bio: 'Fitness enthusiast',
      },
      {
        username: 'jane_active',
        email: 'jane@example.com',
        password: 'hashed_password_2',
        bio: 'Marathon runner',
      },
      {
        username: 'mike_gym',
        email: 'mike@example.com',
        password: 'hashed_password_3',
        bio: 'Gym lover',
      },
      {
        username: 'sarah_yoga',
        email: 'sarah@example.com',
        password: 'hashed_password_4',
        bio: 'Yoga instructor',
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create sample teams
    const teams = await Team.insertMany([
      {
        name: 'Fitness Warriors',
        description: 'A team dedicated to fitness',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Active Runners',
        description: 'Running enthusiasts',
        leader: users[1]._id,
        members: [users[1]._id, users[2]._id],
      },
    ]);
    console.log(`Created ${teams.length} teams`);

    // Create sample activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 60,
        calories: 600,
        distance: 10,
        intensity: 'high',
        description: 'Morning run',
        date: new Date(),
      },
      {
        userId: users[0]._id,
        type: 'gym',
        duration: 90,
        calories: 500,
        intensity: 'medium',
        description: 'Upper body workout',
        date: new Date(Date.now() - 86400000),
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 120,
        calories: 800,
        distance: 40,
        intensity: 'high',
        description: 'Long cycling session',
        date: new Date(),
      },
      {
        userId: users[2]._id,
        type: 'gym',
        duration: 60,
        calories: 400,
        intensity: 'medium',
        description: 'Strength training',
        date: new Date(),
      },
      {
        userId: users[3]._id,
        type: 'yoga',
        duration: 60,
        calories: 250,
        intensity: 'low',
        description: 'Relaxing yoga session',
        date: new Date(),
      },
    ]);
    console.log(`Created ${activities.length} activities`);

    // Create sample workouts
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Upper Body Strength',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 100 },
          { name: 'Rows', sets: 4, reps: 8, weight: 90 },
          { name: 'Shoulder Press', sets: 3, reps: 10, weight: 60 },
        ],
        duration: 90,
        notes: 'Great session, felt strong',
        date: new Date(),
      },
      {
        userId: users[1]._id,
        name: 'Cardio Blast',
        exercises: [
          { name: 'Treadmill', sets: 1, reps: 30, weight: 0 },
          { name: 'Elliptical', sets: 1, reps: 20, weight: 0 },
        ],
        duration: 60,
        notes: 'High intensity cardio',
        date: new Date(),
      },
      {
        userId: users[2]._id,
        name: 'Leg Day',
        exercises: [
          { name: 'Squats', sets: 4, reps: 6, weight: 150 },
          { name: 'Leg Press', sets: 3, reps: 8, weight: 200 },
          { name: 'Lunges', sets: 3, reps: 10, weight: 50 },
        ],
        duration: 90,
        date: new Date(),
      },
    ]);
    console.log(`Created ${workouts.length} workouts`);

    // Create leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        totalCalories: 1100,
        totalActivities: 2,
        totalDistance: 10,
        rank: 1,
        weeklyCalories: 1100,
        monthlyCalories: 5000,
      },
      {
        userId: users[1]._id,
        totalCalories: 800,
        totalActivities: 1,
        totalDistance: 40,
        rank: 2,
        weeklyCalories: 800,
        monthlyCalories: 3500,
      },
      {
        userId: users[2]._id,
        totalCalories: 400,
        totalActivities: 1,
        totalDistance: 0,
        rank: 3,
        weeklyCalories: 400,
        monthlyCalories: 2000,
      },
      {
        userId: users[3]._id,
        totalCalories: 250,
        totalActivities: 1,
        totalDistance: 0,
        rank: 4,
        weeklyCalories: 250,
        monthlyCalories: 1500,
      },
    ]);
    console.log(`Created ${leaderboardEntries.length} leaderboard entries`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`Total Users: ${users.length}`);
    console.log(`Total Teams: ${teams.length}`);
    console.log(`Total Activities: ${activities.length}`);
    console.log(`Total Workouts: ${workouts.length}`);
    console.log(`Total Leaderboard Entries: ${leaderboardEntries.length}`);

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
