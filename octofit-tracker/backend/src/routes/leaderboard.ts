import express, { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router: Router = express.Router();

// GET all leaderboard entries
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ totalCalories: -1 })
      .populate('userId');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET leaderboard entry by user ID
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findOne({ userId: req.params.userId }).populate('userId');
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

// POST create leaderboard entry
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const leaderboard = new Leaderboard({ userId });
    await leaderboard.save();
    await leaderboard.populate('userId');
    res.status(201).json(leaderboard);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

// PUT update leaderboard entry
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId');
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard entry' });
  }
});

// GET weekly leaderboard
router.get('/stats/weekly', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ weeklyCalories: -1 })
      .populate('userId')
      .limit(10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weekly leaderboard' });
  }
});

// GET monthly leaderboard
router.get('/stats/monthly', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ monthlyCalories: -1 })
      .populate('userId')
      .limit(10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch monthly leaderboard' });
  }
});

export default router;
