import express from 'express';
import { protect } from '../middleware/auth.js';
import ctrl from '../controllers/studentExtrasController.js';

const router = express.Router();

router.use(protect);

router.get('/score-history', ctrl.getScoreHistory);
router.get('/skills', ctrl.getSkillBreakdown);
router.get('/leaderboard', ctrl.getLeaderboard);

export default router;
