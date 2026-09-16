import Course from '../models/Course.js';
import Grade from '../models/Grade.js';
import StudentProgress from '../models/StudentProgress.js';

/**
 * GET /api/grades/:studentId
 * Fetches all grade records for a given student across all courses
 */
export const getStudentGrades = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Authorization: Students can view their own grades; faculty/admins can view any
    if (
      req.user.role === 'student' &&
      req.user._id.toString() !== studentId
    ) {
      return res.status(403).json({ message: 'Access denied to these grade records.' });
    }

    const grades = await Grade.find({ student: studentId })
      .populate('course', 'title slug totalLevels thumbnail gradeBand category')
      .sort({ updatedAt: -1 });

    // Calculate overall GPA across all graded courses
    const gradedCourses = grades.filter((g) => g.finalPercentage > 0);
    const overallGpa =
      gradedCourses.length > 0
        ? Number(
            (
              gradedCourses.reduce((acc, curr) => acc + (curr.gpa || 0), 0) /
              gradedCourses.length
            ).toFixed(2)
          )
        : 0.0;

    res.json({
      success: true,
      overallGpa,
      totalCoursesGraded: gradedCourses.length,
      grades,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student grades', error: error.message });
  }
};

/**
 * GET /api/grades/:studentId/:courseId
 * Fetches detailed grade breakdown for a specific student and course
 */
export const getStudentCourseGrade = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    if (
      req.user.role === 'student' &&
      req.user._id.toString() !== studentId
    ) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    let gradeRecord = await Grade.findOne({ student: studentId, course: courseId })
      .populate('course', 'title slug totalLevels modules thumbnail gradeBand category');

    // If no grade record exists yet, initialize one
    if (!gradeRecord) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found.' });
      }

      gradeRecord = new Grade({
        student: studentId,
        course: courseId,
        quizScores: [],
        codeSubmissionScores: [],
        moduleGrades: (course.modules || []).map((m) => ({
          moduleNumber: m.moduleNumber,
          moduleTitle: m.title,
          quizScore: 0,
          codeScore: 0,
          moduleAverage: 0,
          completedLevels: [],
          status: 'not_started',
        })),
        completionStatus: 'not_started',
      });

      gradeRecord.recalculateGrades();
      await gradeRecord.save();
      await gradeRecord.populate('course', 'title slug totalLevels modules thumbnail gradeBand category');
    }

    res.json({ success: true, grade: gradeRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course grade', error: error.message });
  }
};

/**
 * POST /api/grades/update
 * Universal endpoint invoked when an AI quiz, code runner, or capstone submits a result
 */
export const updateGrade = async (req, res) => {
  try {
    const { studentId, courseId, type, quizData, codeData, capstoneData, completionStatus } = req.body;
    const targetStudentId = studentId || req.user._id;

    let gradeRecord = await Grade.findOne({ student: targetStudentId, course: courseId });
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    if (!gradeRecord) {
      gradeRecord = new Grade({
        student: targetStudentId,
        course: courseId,
        moduleGrades: (course.modules || []).map((m) => ({
          moduleNumber: m.moduleNumber,
          moduleTitle: m.title,
          quizScore: 0,
          codeScore: 0,
          moduleAverage: 0,
          completedLevels: [],
          status: 'not_started',
        })),
      });
    }

    // 1. Process Quiz result
    if (type === 'quiz' && quizData) {
      gradeRecord.recordQuizResult(quizData);

      // Update corresponding module's quiz score
      if (quizData.moduleId) {
        const mod = gradeRecord.moduleGrades.find(
          (m) => m.moduleNumber.toString() === quizData.moduleId.toString()
        );
        if (mod) {
          const pct = Math.round((quizData.score / (quizData.maxScore || 100)) * 100);
          mod.quizScore = pct;
          mod.moduleAverage = Math.round((mod.quizScore + mod.codeScore) / 2);
          mod.status = mod.moduleAverage >= 60 ? 'completed' : 'in_progress';
        }
      }
    }

    // 2. Process Code submission result
    if (type === 'code' && codeData) {
      gradeRecord.recordCodeSubmission(codeData);

      // Update corresponding module's code score
      if (codeData.moduleId) {
        const mod = gradeRecord.moduleGrades.find(
          (m) => m.moduleNumber.toString() === codeData.moduleId.toString()
        );
        if (mod) {
          const pct = Math.round((codeData.score / (codeData.maxScore || 100)) * 100);
          mod.codeScore = pct;
          if (codeData.levelNumber && !mod.completedLevels.includes(codeData.levelNumber)) {
            mod.completedLevels.push(codeData.levelNumber);
          }
          mod.moduleAverage = Math.round((mod.quizScore + mod.codeScore) / 2);
          mod.status = mod.moduleAverage >= 60 ? 'completed' : 'in_progress';
        }
      }
    }

    // 3. Process Capstone score (20% weight)
    if (type === 'capstone' && capstoneData) {
      gradeRecord.recordCapstoneScore({
        ...capstoneData,
        gradedBy: req.user._id,
      });
    }

    // Update status if passed
    if (completionStatus) {
      gradeRecord.completionStatus = completionStatus;
    }

    gradeRecord.recalculateGrades();
    await gradeRecord.save();

    // Check if course progress & certificate flow should synchronize
    if (gradeRecord.certificateEligible) {
      await StudentProgress.findOneAndUpdate(
        { student: targetStudentId, course: courseId },
        {
          certificateIssued: true,
          certificateId: `FM-AI-${course._id.toString().slice(-4).toUpperCase()}-${targetStudentId.toString().slice(-4).toUpperCase()}`,
          completedAt: new Date(),
          grade: gradeRecord.finalGrade,
          finalScore: gradeRecord.finalPercentage,
          progressPercentage: 100,
        },
        { upsert: true }
      );
    }

    res.json({
      success: true,
      message: 'Grade recorded and recalculated successfully',
      grade: gradeRecord,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating grade record', error: error.message });
  }
};

/**
 * POST /api/grades/override
 * Teacher/Admin can override a final letter grade or numeric score with justification
 */
export const overrideGrade = async (req, res) => {
  try {
    const { studentId, courseId, newPercentage, newGrade, reason } = req.body;

    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase());
    const isTeacherOrAdmin =
      req.user.role === 'faculty' ||
      req.user.role === 'admin' ||
      adminEmails.includes(req.user.email.toLowerCase());

    if (!isTeacherOrAdmin) {
      return res.status(403).json({ message: 'Only instructors and admins can override grades.' });
    }

    const gradeRecord = await Grade.findOne({ student: studentId, course: courseId });
    if (!gradeRecord) {
      return res.status(404).json({ message: 'Grade record not found.' });
    }

    const originalGrade = gradeRecord.finalGrade;

    if (newPercentage !== undefined) {
      gradeRecord.finalPercentage = Math.min(100, Math.max(0, Number(newPercentage)));
    }

    if (newGrade) {
      gradeRecord.finalGrade = newGrade;
    }

    gradeRecord.teacherOverride = {
      isOverridden: true,
      originalGrade,
      overrideGrade: newGrade || gradeRecord.finalGrade,
      reason: reason || 'Teacher manual override',
      overriddenBy: req.user._id,
      updatedAt: new Date(),
    };

    if (gradeRecord.completionStatus === 'completed' && gradeRecord.finalPercentage >= 65) {
      gradeRecord.certificateEligible = true;
    }

    await gradeRecord.save();

    res.json({
      success: true,
      message: 'Grade override applied successfully.',
      grade: gradeRecord,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error overriding grade', error: error.message });
  }
};

/**
 * GET /api/grades/course/:courseId/analytics
 * Returns class-wide grade distribution, averages, and pass rate for instructors
 */
export const getCourseGradeDistribution = async (req, res) => {
  try {
    const { courseId } = req.params;

    const grades = await Grade.find({ course: courseId }).populate('student', 'name email grade');

    const totalStudents = grades.length;
    if (totalStudents === 0) {
      return res.json({
        success: true,
        totalStudents: 0,
        distribution: { 'A+': 0, A: 0, B: 0, C: 0, D: 0, F: 0, Incomplete: 0 },
        averageScore: 0,
        passRate: 0,
      });
    }

    const distribution = { 'A+': 0, A: 0, B: 0, C: 0, D: 0, F: 0, Incomplete: 0 };
    let scoreSum = 0;
    let passedCount = 0;

    grades.forEach((g) => {
      const letter = g.finalGrade || 'Incomplete';
      if (distribution[letter] !== undefined) {
        distribution[letter] += 1;
      }
      scoreSum += g.finalPercentage || 0;
      if (['A+', 'A', 'B', 'C'].includes(g.finalGrade)) {
        passedCount += 1;
      }
    });

    const averageScore = Math.round(scoreSum / totalStudents);
    const passRate = Math.round((passedCount / totalStudents) * 100);

    res.json({
      success: true,
      totalStudents,
      averageScore,
      passRate,
      distribution,
      grades,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating course analytics', error: error.message });
  }
};

export default {
  getStudentGrades,
  getStudentCourseGrade,
  updateGrade,
  overrideGrade,
  getCourseGradeDistribution,
};
