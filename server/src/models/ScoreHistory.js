import mongoose from 'mongoose';

const scoreHistorySchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD for easy aggregation
      required: true,
    },
    xpEarned: {
      type: Number,
      required: true,
      min: 0,
    },
    totalXpAtDate: {
      type: Number,
      default: 0,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    reason: {
      type: String,  // e.g. 'assignment_graded', 'badge_earned', 'streak_bonus'
      default: 'assignment_graded',
    },
  },
  { timestamps: true }
);

scoreHistorySchema.index({ student: 1, date: 1 });

export default mongoose.model('ScoreHistory', scoreHistorySchema);
