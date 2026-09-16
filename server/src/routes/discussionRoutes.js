import express from 'express';
import { protect } from '../middleware/auth.js';
import ctrl from '../controllers/discussionController.js';

const router = express.Router();

router.use(protect);

router.get('/:courseId/:session', ctrl.getThreads);
router.post('/:courseId/:session', ctrl.createThread);
router.post('/reply/:threadId', ctrl.replyToThread);

export default router;
