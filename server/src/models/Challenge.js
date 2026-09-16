import mongoose from 'mongoose';

const challengeLeaderboardEntrySchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const challengeSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    opensAt: { type: Date, required: true },
    closesAt: { type: Date, required: true },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    bonusXp: { type: Number, default: 25 },
    leaderboard: [challengeLeaderboardEntrySchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

challengeSchema.index({ course: 1, closesAt: -1 });

export default mongoose.model('Challenge', challengeSchema);
