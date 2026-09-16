import mongoose from 'mongoose';

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    submissionContent: {
      type: String,
      required: true
    },
    codeSubmission: {
      type: String // For coding assignments
    },
    attachments: [{
      type: String // URLs to submitted files
    }],
    attemptNumber: {
      type: Number,
      default: 1
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'graded', 'returned'],
      default: 'submitted'
    },
    grade: {
      type: Number,
      min: 0,
      max: 100
    },
    feedback: {
      type: String
    },
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    gradedAt: {
      type: Date
    },
    autoGraded: {
      type: Boolean,
      default: false
    },
    testResults: [{
      testName: String,
      passed: Boolean,
      output: String,
      expectedOutput: String
    }]
  },
  { timestamps: true }
);

// Create compound index for unique student-assignment-attempt combination
assignmentSubmissionSchema.index({ student: 1, assignment: 1, attemptNumber: 1 }, { unique: true });

export default mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);