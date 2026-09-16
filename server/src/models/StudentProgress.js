import mongoose from 'mongoose';

const studentProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    completedLevels: {
      type: Number,
      default: 0
    },
    currentLevel: {
      type: Number,
      default: 1
    },
    // exact lessons completed, drives real progress (not just a count)
    completedLessonIds: [{
      type: mongoose.Schema.Types.ObjectId
    }],
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now
    },
    totalTimeSpentMinutes: {
      type: Number,
      default: 0,
    },
    averageScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedAt: {
      type: Date
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'B', 'C', 'D', 'F']
    },
    finalScore: {
      type: Number,
      min: 0,
      max: 100
    },
    certificateIssued: {
      type: Boolean,
      default: false
    },
    certificateId: {
      type: String
    }
  },
  { timestamps: true }
);

// Create compound index for unique student-course combination
studentProgressSchema.index({ student: 1, course: 1 }, { unique: true });

export default mongoose.model('StudentProgress', studentProgressSchema);