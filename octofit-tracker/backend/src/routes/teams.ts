import express, { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router: Router = express.Router();

// GET all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members').populate('leader');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// GET team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('members').populate('leader');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// POST create team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, leader } = req.body;
    const team = new Team({ name, description, leader, members: [leader] });
    await team.save();
    await team.populate('members').populate('leader');
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

// PUT update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('members')
      .populate('leader');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team' });
  }
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
