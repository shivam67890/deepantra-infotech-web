import mongoose from 'mongoose';

// Quiz score entry for a student in a course/module
const quizScoreSchema = new mongoose.Schema(
  {
    quizId: {
      type: String,
      default: '',
    },
    moduleId: {
      type: String,
      default: '',
    },
    topic: {
      type: String,
      default: 'python',
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    maxScore: {
      type: Number,
      required: true,
      default: 100,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    takenAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// Code submission score entry
const codeSubmissionScoreSchema = new mongoose.Schema(
  {
    submissionId: {
      type: String,
      default: '',
    },
    moduleId: {
      type: String,
      default: '',
    },
    levelNumber: {
      type: Number,
      min: 1,
      max: 30,
    },
    taskTitle: {
      type: String,
      default: '',
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    maxScore: {
      type: Number,
      default: 100,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    language: {
      type: String,
      default: 'python',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

// Per-module breakdown entry
const moduleGradeSchema = new mongoose.Schema(
  {
    moduleNumber: {
      type: Number,
      required: true,
    },
    moduleTitle: {
      type: String,
      required: true,
    },
    quizScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    codeScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    moduleAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedLevels: [
      {
        type: Number,
      },
    ],
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    },
  },
  { _id: false }
);

// Capstone AI Project schema
const capstoneProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Capstone AI Mini-Project',
    },
    submissionUrl: {
      type: String,
      default: '',
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    feedback: {
      type: String,
      default: '',
    },
    submittedAt: {
      type: Date,
    },
    gradedAt: {
      type: Date,
    },
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { _id: false }
);

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      alias: 'studentId',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      alias: 'courseId',
    },
    moduleId: {
      type: String,
      default: '',
    },
    // Per-question results for detailed review (Phase 1 addition)
    assignmentRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
    },
    answers: [{
      questionId: { type: mongoose.Schema.Types.ObjectId },
      response: { type: mongoose.Schema.Types.Mixed },
      isCorrect: { type: Boolean, default: false },
      pointsEarned: { type: Number, default: 0 },
      timeTakenSeconds: { type: Number, default: 0 },
    }],
    score: { type: Number, default: 0 },
    maxScore: { type: Number, default: 0 },
    attemptNumber: { type: Number, default: 1 },
    submittedAt: { type: Date, default: Date.now },
    // Detailed assessment logs
    quizScores: [quizScoreSchema],
    codeSubmissionScores: [codeSubmissionScoreSchema],
    moduleGrades: [moduleGradeSchema],
    capstoneProject: {
      type: capstoneProjectSchema,
      default: () => ({}),
    },
    // Weighted breakdown: 40% quizzes, 40% coding, 20% capstone
    quizWeightScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    codeWeightScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    capstoneWeightScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    // Overall numeric score out of 100
    finalPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    // Letter grade
    finalGrade: {
      type: String,
      enum: ['A+', 'A', 'B', 'C', 'D', 'F', 'Incomplete'],
      default: 'Incomplete',
    },
    // 4.0 Scale GPA
    gpa: {
      type: Number,
      default: 0.0,
      min: 0.0,
      max: 4.0,
    },
    completionStatus: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    },
    certificateEligible: {
      type: Boolean,
      default: false,
    },
    teacherOverride: {
      isOverridden: {
        type: Boolean,
        default: false,
      },
      originalGrade: String,
      overrideGrade: String,
      reason: String,
      overriddenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      updatedAt: Date,
    },
  },
  { timestamps: true }
);

// Compound index for unique student-course grade records
gradeSchema.index({ student: 1, course: 1 }, { unique: true });

/**
 * Calculates letter grade and 4.0 GPA from final percentage
 */
gradeSchema.methods.calculateLetterAndGpa = function () {
  const pct = this.finalPercentage;
  if (pct >= 95) {
    this.finalGrade = 'A+';
    this.gpa = 4.0;
  } else if (pct >= 85) {
    this.finalGrade = 'A';
    this.gpa = 3.8;
  } else if (pct >= 75) {
    this.finalGrade = 'B';
    this.gpa = 3.0;
  } else if (pct >= 65) {
    this.finalGrade = 'C';
    this.gpa = 2.0;
  } else if (pct >= 50) {
    this.finalGrade = 'D';
    this.gpa = 1.0;
  } else {
    this.finalGrade = 'F';
    this.gpa = 0.0;
  }

  // 100% completion and passing threshold (>= 65%) qualifies for certificate
  if (this.completionStatus === 'completed' && pct >= 65) {
    this.certificateEligible = true;
  }
};

/**
 * Recalculates weighted grade:
 * 40% Quiz average + 40% Coding submission average + 20% Capstone project
 */
gradeSchema.methods.recalculateGrades = function () {
  // 1. Quizzes average
  if (this.quizScores.length > 0) {
    const sum = this.quizScores.reduce((acc, q) => acc + q.percentage, 0);
    this.quizWeightScore = Math.round(sum / this.quizScores.length);
  } else {
    this.quizWeightScore = 0;
  }

  // 2. Code submissions average
  if (this.codeSubmissionScores.length > 0) {
    const sum = this.codeSubmissionScores.reduce((acc, c) => acc + c.percentage, 0);
    this.codeWeightScore = Math.round(sum / this.codeSubmissionScores.length);
  } else {
    this.codeWeightScore = 0;
  }

  // 3. Capstone project
  this.capstoneWeightScore = this.capstoneProject?.score || 0;

  // 4. Weighted formula: 40% + 40% + 20%
  const weighted =
    this.quizWeightScore * 0.4 +
    this.codeWeightScore * 0.4 +
    this.capstoneWeightScore * 0.2;

  this.finalPercentage = Math.round(weighted);

  if (!this.teacherOverride?.isOverridden) {
    this.calculateLetterAndGpa();
  }
};

/**
 * Records an incoming quiz result and recalculates grades
 */
gradeSchema.methods.recordQuizResult = function ({ quizId, moduleId, topic, score, maxScore = 100 }) {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  this.quizScores.push({
    quizId: quizId || '',
    moduleId: moduleId || '',
    topic: topic || 'Python from Scratch to AI',
    score,
    maxScore,
    percentage,
    takenAt: new Date(),
  });
  this.recalculateGrades();
  return this;
};

/**
 * Records an incoming code runner score and recalculates grades
 */
gradeSchema.methods.recordCodeSubmission = function ({
  submissionId,
  moduleId,
  levelNumber,
  taskTitle,
  score,
  maxScore = 100,
  language = 'python',
}) {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  this.codeSubmissionScores.push({
    submissionId: submissionId || '',
    moduleId: moduleId || '',
    levelNumber,
    taskTitle: taskTitle || `Level ${levelNumber} Code Exercise`,
    score,
    maxScore,
    percentage,
    language,
    submittedAt: new Date(),
  });
  this.recalculateGrades();
  return this;
};

/**
 * Submits / grades the Capstone AI project (20% weight)
 */
gradeSchema.methods.recordCapstoneScore = function ({ title, submissionUrl, score, feedback, gradedBy }) {
  this.capstoneProject = {
    title: title || this.capstoneProject?.title || 'Capstone AI Mini-Project',
    submissionUrl: submissionUrl || this.capstoneProject?.submissionUrl || '',
    score: Math.min(100, Math.max(0, score)),
    feedback: feedback || '',
    submittedAt: this.capstoneProject?.submittedAt || new Date(),
    gradedAt: new Date(),
    gradedBy: gradedBy || null,
  };
  this.recalculateGrades();
  return this;
};

export default mongoose.model('Grade', gradeSchema);
