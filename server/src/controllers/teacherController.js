import Course from '../models/Course.js';
import Grade from '../models/Grade.js';
import StudentProgress from '../models/StudentProgress.js';
import User from '../models/User.js';

/**
 * GET /api/teacher/courses
 * Returns courses owned by the logged-in faculty/admin user.
 */
export const getTeacherCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    // Match by ObjectId instructor field OR by teachingCourses on user
    const byInstructor = await Course.find({ instructor: userId, isActive: true })
      .select('title slug gradeBand level totalSessions studentsEnrolled enrolledStudents thumbnail createdAt')
      .sort({ createdAt: -1 });

    // Also include any courses in user.teachingCourses that weren't caught above
    const user = await User.findById(userId).select('teachingCourses');
    const extraIds = (user?.teachingCourses || [])
      .filter((id) => !byInstructor.some((c) => c._id.toString() === id.toString()));

    let extra = [];
    if (extraIds.length) {
      extra = await Course.find({ _id: { $in: extraIds }, isActive: true })
        .select('title slug gradeBand level totalSessions studentsEnrolled enrolledStudents thumbnail createdAt')
        .sort({ createdAt: -1 });
    }

    const courses = [...byInstructor, ...extra];

    // Enrich with live student counts from StudentProgress
    const enriched = await Promise.all(
      courses.map(async (c) => {
        const enrolled = await StudentProgress.countDocuments({ course: c._id });
        return { ...c.toObject(), liveEnrolledCount: enrolled };
      })
    );

    res.json({ success: true, courses: enriched });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher courses', error: error.message });
  }
};

/**
 * GET /api/teacher/courses/:courseId/roster
 * Returns per-student: name, % complete, sessions done, average score, last active.
 */
export const getCourseRoster = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).select('title totalSessions totalLevels lessons modules');
    if (!course) return res.status(404).json({ message: 'Course not found.' });

    const totalSessions = course.totalSessions
      || course.lessons?.length
      || course.modules?.reduce((sum, m) => sum + (m.levels?.length || 0), 0)
      || course.totalLevels
      || 1;

    const progressRecords = await StudentProgress.find({ course: courseId })
      .populate('student', 'name email grade profilePicture')
      .sort({ lastAccessedAt: -1 });

    const roster = await Promise.all(
      progressRecords.map(async (p) => {
        // Get average score from Grade records
        const grades = await Grade.find({ student: p.student._id, course: courseId });
        const avgScore = grades.length > 0
          ? Math.round(grades.reduce((sum, g) => sum + (g.finalPercentage || 0), 0) / grades.length)
          : 0;

        const sessionsCompleted = p.completedLessonIds?.length || p.completedLevels || 0;

        return {
          studentId: p.student._id,
          name: p.student.name,
          email: p.student.email,
          grade: p.student.grade,
          profilePicture: p.student.profilePicture || '',
          percentComplete: p.progressPercentage || 0,
          sessionsDone: `${sessionsCompleted}/${totalSessions}`,
          sessionsCompleted,
          averageScore: avgScore,
          lastActive: p.lastAccessedAt,
          enrolledAt: p.enrolledAt,
        };
      })
    );

    res.json({
      success: true,
      courseTitle: course.title,
      totalSessions,
      totalStudents: roster.length,
      roster,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roster', error: error.message });
  }
};

/**
 * GET /api/teacher/courses/:courseId/students/:studentId
 * Full session-by-session status plus every Grade.answers[] entry for review.
 */
export const getStudentDetail = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    const [student, course, progress, grades] = await Promise.all([
      User.findById(studentId).select('name email grade school points profilePicture'),
      Course.findById(courseId).select('title lessons modules totalLevels totalSessions'),
      StudentProgress.findOne({ student: studentId, course: courseId }),
      Grade.find({ student: studentId, course: courseId }).sort({ submittedAt: -1 }),
    ]);

    if (!student) return res.status(404).json({ message: 'Student not found.' });
    if (!course) return res.status(404).json({ message: 'Course not found.' });

    res.json({
      success: true,
      student: student.toObject(),
      courseTitle: course.title,
      progress: progress ? progress.toObject() : null,
      grades: grades.map((g) => g.toObject()),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student detail', error: error.message });
  }
};

/**
 * GET /api/teacher/courses/:courseId/analytics
 * Course-level analytics: completion rate, average score, grade distribution.
 */
export const getCourseAnalytics = async (req, res) => {
  try {
    const { courseId } = req.params;

    const [progressRecords, grades] = await Promise.all([
      StudentProgress.find({ course: courseId }),
      Grade.find({ course: courseId }),
    ]);

    const totalStudents = progressRecords.length;
    const completedCount = progressRecords.filter((p) => p.completedAt).length;
    const avgCompletion = totalStudents > 0
      ? Math.round(progressRecords.reduce((sum, p) => sum + (p.progressPercentage || 0), 0) / totalStudents)
      : 0;

    const avgScore = grades.length > 0
      ? Math.round(grades.reduce((sum, g) => sum + (g.finalPercentage || 0), 0) / grades.length)
      : 0;

    const distribution = { 'A+': 0, A: 0, B: 0, C: 0, D: 0, F: 0, Incomplete: 0 };
    grades.forEach((g) => {
      const letter = g.finalGrade || 'Incomplete';
      if (distribution[letter] !== undefined) distribution[letter]++;
    });

    res.json({
      success: true,
      totalStudents,
      completedCount,
      avgCompletion,
      avgScore,
      distribution,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
};

/**
 * GET /api/teacher/grading-queue
 * Returns only short-answer submissions pending grading.
 * Code questions are auto-graded and never appear here.
 */
export const getGradingQueue = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get courses this teacher owns
    const courses = await Course.find({
      $or: [{ instructor: userId }, { _id: { $in: req.user.teachingCourses || [] } }],
      isActive: true,
    }).select('_id title');

    const courseIds = courses.map((c) => c._id);
    const courseMap = Object.fromEntries(courses.map((c) => [c._id.toString(), c.title]));

    // Find Grade entries with answers that have short-answer responses awaiting review
    // We look for grades that have answers but haven't been fully reviewed
    const pending = await Grade.find({
      course: { $in: courseIds },
      'answers.0': { $exists: true }, // has at least one answer
    })
      .populate('student', 'name email grade')
      .sort({ submittedAt: -1 })
      .limit(100);

    // Filter to only grades with short-answer questions needing manual review
    const queue = pending
      .filter((g) => g.answers.some((a) => a.pointsEarned === 0 && !a.isCorrect))
      .map((g) => ({
        gradeId: g._id,
        studentName: g.student?.name,
        studentEmail: g.student?.email,
        courseName: courseMap[g.course.toString()] || 'Unknown',
        courseId: g.course,
        answers: g.answers,
        score: g.score,
        maxScore: g.maxScore,
        submittedAt: g.submittedAt,
      }));

    res.json({ success: true, queue });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grading queue', error: error.message });
  }
};

/**
 * POST /api/teacher/grading-queue/:gradeId
 * Teacher grades a short-answer question within a Grade record.
 * Body: { questionId, pointsEarned, isCorrect, feedback }
 */
export const gradeQuestion = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const { questionId, pointsEarned, isCorrect, feedback } = req.body;

    const grade = await Grade.findById(gradeId);
    if (!grade) return res.status(404).json({ message: 'Grade record not found.' });

    const answer = grade.answers.find(
      (a) => a.questionId?.toString() === questionId
    );
    if (!answer) return res.status(404).json({ message: 'Question answer not found in this grade.' });

    answer.pointsEarned = pointsEarned ?? answer.pointsEarned;
    answer.isCorrect = isCorrect ?? answer.isCorrect;

    // Recalculate score
    grade.score = grade.answers.reduce((sum, a) => sum + (a.pointsEarned || 0), 0);

    await grade.save();

    res.json({ success: true, message: 'Question graded.', grade });
  } catch (error) {
    res.status(500).json({ message: 'Error grading question', error: error.message });
  }
};

export default {
  getTeacherCourses,
  getCourseRoster,
  getStudentDetail,
  getCourseAnalytics,
  getGradingQueue,
  gradeQuestion,
};
