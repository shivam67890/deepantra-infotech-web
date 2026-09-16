import Course from '../models/Course.js';
import Grade from '../models/Grade.js';
import StudentProgress from '../models/StudentProgress.js';
import User from '../models/User.js';

/**
 * GET /api/admin/users
 * Searchable list of all users with role info.
 */
export const getUsers = async (req, res) => {
  try {
    const { search, role } = req.query;
    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    const users = await User.find(query)
      .select('name email phone role grade school points isVerified createdAt')
      .sort({ createdAt: -1 })
      .limit(200);
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

/**
 * PATCH /api/admin/users/:id/role
 * Change a user's role.
 */
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['student', 'faculty', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('name email role');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error: error.message });
  }
};

/**
 * GET /api/admin/analytics
 * Platform-wide: enrollment trend, pass rate per course, popular courses.
 */
export const getAnalytics = async (req, res) => {
  try {
    // Enrollment per month (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    const enrollments = await StudentProgress.aggregate([
      { $match: { enrolledAt: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$enrolledAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Per-course stats
    const courses = await Course.find({ isActive: true }).select('title studentsEnrolled');
    const courseStats = await Promise.all(
      courses.map(async (c) => {
        const grades = await Grade.find({ course: c._id });
        const total = grades.length;
        const passed = grades.filter((g) =>
          ['A+', 'A', 'B', 'C'].includes(g.finalGrade)
        ).length;
        return {
          courseId: c._id,
          title: c.title,
          enrolled: c.studentsEnrolled || 0,
          passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
        };
      })
    );

    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalFaculty = await User.countDocuments({ role: 'faculty' });

    res.json({
      success: true,
      totalUsers,
      totalStudents,
      totalFaculty,
      enrollmentTrend: enrollments.map((e) => ({ month: e._id, count: e.count })),
      courseStats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
};

export default { getUsers, updateUserRole, getAnalytics };
