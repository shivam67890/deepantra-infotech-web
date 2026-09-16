import express from 'express';

import courseController from '../controllers/courseController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

// Student routes (protected)
router.post('/enroll', protect, courseController.enrollCourse);
router.get('/student/courses', protect, courseController.getStudentCourses);
router.put('/progress', protect, courseController.updateProgress);
router.post('/complete-lesson', protect, courseController.completeLesson);

// Admin routes (protected - would add admin middleware later)
router.post('/', protect, courseController.createCourse);
router.put('/:id', protect, courseController.updateCourse);
router.delete('/:id', protect, courseController.deleteCourse);

export default router;