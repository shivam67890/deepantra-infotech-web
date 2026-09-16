import express from 'express';

import {
  bookDemo,
  listDemoBookings,
} from '../controllers/demoController.js';
import {
  adminOnly,
  protect,
} from '../middleware/auth.js';

const router = express.Router()

router.post('/', bookDemo)
router.get('/', protect, adminOnly, listDemoBookings)

export default router