import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  distance?: number;
  intensity: 'low' | 'medium' | 'high';
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'gym', 'yoga', 'walking', 'other'],
    },
    duration: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
    },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
