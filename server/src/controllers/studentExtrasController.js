import Grade from '../models/Grade.js';
import Notification from '../models/Notification.js';
import ScoreHistory from '../models/ScoreHistory.js';
import User from '../models/User.js';

/**
 * GET /api/student/score-history
 * Returns XP history entries for the logged-in student, sorted by date.
 */
export const getScoreHistory = async (req, res) => {
  try {
    const entries = await ScoreHistory.find({ student: req.user._id })
      .sort({ date: 1 })
      .limit(365);
    res.json({ success: true, entries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching score history', error: error.message });
  }
};

/**
 * GET /api/student/skills
 * Aggregates skillTag scores from Grade.answers[] for the radar chart.
 * Returns: { quiz, code, capstone } — each a 0-100 average percentage.
 */
export const getSkillBreakdown = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.user._id });

    const buckets = { quiz: { earned: 0, max: 0 }, code: { earned: 0, max: 0 }, capstone: { earned: 0, max: 0 } };

    for (const g of grades) {
      // Use the weighted scores already computed in Grade.js
      if (g.quizWeightScore > 0) {
        buckets.quiz.earned += g.quizWeightScore;
        buckets.quiz.max += 100;
      }
      if (g.codeWeightScore > 0) {
        buckets.code.earned += g.codeWeightScore;
        buckets.code.max += 100;
      }
      if (g.capstoneWeightScore > 0) {
        buckets.capstone.earned += g.capstoneWeightScore;
        buckets.capstone.max += 100;
      }
    }

    const pct = (earned, max) => (max > 0 ? Math.round((earned / max) * 100) : 0);

    res.json({
      success: true,
      skills: [
        { skill: 'Quiz', value: pct(buckets.quiz.earned, buckets.quiz.max) },
        { skill: 'Code', value: pct(buckets.code.earned, buckets.code.max) },
        { skill: 'Capstone', value: pct(buckets.capstone.earned, buckets.capstone.max) },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skill breakdown', error: error.message });
  }
};

/**
 * GET /api/notifications
 * Returns recent notifications for the logged-in user.
 */
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    const unreadCount = await Notification.countDocuments({ user: req.user._id, read: false });
    res.json({ success: true, notifications, unreadCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

/**
 * POST /api/notifications/:id/read
 * Marks a single notification as read.
 */
export const markNotificationRead = async (req, res) => {
  try {
    const n = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true },
      { new: true }
    );
    if (!n) return res.status(404).json({ message: 'Notification not found.' });
    res.json({ success: true, notification: n });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification', error: error.message });
  }
};

/**
 * GET /api/student/leaderboard
 * Real leaderboard: ranks all students by points.
 */
export const getLeaderboard = async (req, res) => {
  try {
    const students = await User.find({ role: 'student', isVerified: true })
      .select('name grade points profilePicture')
      .sort({ points: -1 })
      .limit(100);
    res.json({ success: true, rankings: students });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
};

export default {
  getScoreHistory,
  getSkillBreakdown,
  getNotifications,
  markNotificationRead,
  getLeaderboard,
};
