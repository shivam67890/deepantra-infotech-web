import express from 'express';
import { protect } from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';
import ctrl from '../controllers/challengeController.js';

const router = express.Router();

// Teacher creates challenges
router.post('/teacher/challenges', protect, requireRole('faculty', 'admin'), ctrl.createChallenge);

// Any authenticated user can view and submit
router.get('/challenges/:courseId', protect, ctrl.getChallenges);
router.post('/challenges/:id/submit', protect, ctrl.submitChallengeScore);

// Hint endpoint — accessible by students
router.post('/assignments/:id/hint', protect, ctrl.getHint);

export default router;
