import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  totalCalories: number;
  totalActivities: number;
  totalDistance: number;
  rank: number;
  weeklyCalories: number;
  monthlyCalories: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
    totalActivities: {
      type: Number,
      default: 0,
    },
    totalDistance: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
    weeklyCalories: {
      type: Number,
      default: 0,
    },
    monthlyCalories: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
