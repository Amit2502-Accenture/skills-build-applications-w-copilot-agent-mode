import express, { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router: Router = express.Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET activities by user ID
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId }).populate('userId');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST create activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, calories, distance, intensity, description } = req.body;
    const activity = new Activity({
      userId,
      type,
      duration,
      calories,
      distance,
      intensity,
      description,
    });
    await activity.save();
    await activity.populate('userId');
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
