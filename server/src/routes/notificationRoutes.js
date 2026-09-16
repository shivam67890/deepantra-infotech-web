import express from 'express';
import { protect } from '../middleware/auth.js';
import ctrl from '../controllers/studentExtrasController.js';

const router = express.Router();

router.use(protect);

router.get('/', ctrl.getNotifications);
router.post('/:id/read', ctrl.markNotificationRead);

export default router;
