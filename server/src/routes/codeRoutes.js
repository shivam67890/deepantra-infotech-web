import express from 'express';
import { runCode } from '../controllers/codeController.js';

const router = express.Router();

// Public code execution sandbox route
router.post('/run', runCode);
router.post('/code/run', runCode);

export default router;
