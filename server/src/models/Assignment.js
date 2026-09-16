import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    dueTime: {
      type: String, // e.g., "23:59"
      default: '23:59'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    points: {
      type: Number,
      default: 100
    },
    maxAttempts: {
      type: Number,
      default: 3
    },
    type: {
      type: String,
      enum: ['quiz', 'coding', 'project', 'robotics'],
      default: 'quiz'
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    instructions: {
      type: String,
      default: ''
    },
    // Rich per-question structure for graded assignments
    questions: [{
      text: { type: String, required: true },
      type: { type: String, enum: ['mcq', 'multi-select', 'short-answer', 'code'], default: 'mcq' },
      options: [String],
      correctAnswer: { type: mongoose.Schema.Types.Mixed }, // index for mcq, array for multi-select, string/regex for short-answer, test cases for code
      skillTag: { type: String, enum: ['quiz', 'code', 'capstone'], default: 'quiz' },
      difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
      points: { type: Number, default: 1 },
      explanation: { type: String, default: '' },
    }],
    totalPoints: {
      type: Number,
      default: 0,
    },
    passingScore: {
      type: Number,
      default: 0,
    },
    session: {
      type: Number, // session number within the course (1-indexed)
      default: null,
    },
    attachments: [{
      type: String // URLs to files
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Assignment', assignmentSchema);