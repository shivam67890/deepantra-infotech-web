import express from 'express';
import { protect } from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';
import ctrl from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, requireRole('admin'));

router.get('/users', ctrl.getUsers);
router.patch('/users/:id/role', ctrl.updateUserRole);
router.get('/analytics', ctrl.getAnalytics);

export default router;
