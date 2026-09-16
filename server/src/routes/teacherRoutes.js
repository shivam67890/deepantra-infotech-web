import express from 'express';
import { protect } from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';
import teacherController from '../controllers/teacherController.js';

const router = express.Router();

// All teacher routes require authentication + faculty or admin role
router.use(protect, requireRole('faculty', 'admin'));

router.get('/courses', teacherController.getTeacherCourses);
router.get('/courses/:courseId/roster', teacherController.getCourseRoster);
router.get('/courses/:courseId/students/:studentId', teacherController.getStudentDetail);
router.get('/courses/:courseId/analytics', teacherController.getCourseAnalytics);
router.get('/grading-queue', teacherController.getGradingQueue);
router.post('/grading-queue/:gradeId', teacherController.gradeQuestion);

export default router;
