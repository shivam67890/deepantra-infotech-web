import express from 'express';

import gradeController from '../controllers/gradeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All grade endpoints require authentication
router.use(protect);

// 1. Get all grade records for a student (with cumulative GPA)
router.get('/:studentId', gradeController.getStudentGrades);

// 2. Get specific course grade breakdown for a student
router.get('/:studentId/:courseId', gradeController.getStudentCourseGrade);

// 3. Post auto-update from Quiz engine, Code runner, or Capstone submission
router.post('/update', gradeController.updateGrade);

// 4. Teacher/Admin: Override a student's grade with feedback/reason
router.post('/override', gradeController.overrideGrade);

// 5. Teacher/Admin: Get class-wide grade distribution and analytics
router.get('/course/:courseId/analytics', gradeController.getCourseGradeDistribution);

export default router;
