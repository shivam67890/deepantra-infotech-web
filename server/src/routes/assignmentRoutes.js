import express from 'express';
import assignmentController from '../controllers/assignmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Student routes (protected)
router.get('/student', protect, assignmentController.getStudentAssignments);
router.get('/:id', protect, assignmentController.getAssignmentById);
router.post('/submit', protect, assignmentController.submitAssignment);
router.get('/:assignmentId/submissions', protect, assignmentController.getSubmissionHistory);

// Admin routes (protected - would add admin middleware later)
router.post('/', protect, assignmentController.createAssignment);
router.put('/:id', protect, assignmentController.updateAssignment);
router.delete('/:id', protect, assignmentController.deleteAssignment);
router.put('/submissions/:id/grade', protect, assignmentController.gradeSubmission);

export default router;