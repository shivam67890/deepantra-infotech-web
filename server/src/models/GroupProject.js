import mongoose from 'mongoose';

const groupProjectSchema = new mongoose.Schema(
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
    requiredSkills: [{
      type: String
    }],
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate'
    },
    maxMembers: {
      type: Number,
      default: 4,
      min: 2,
      max: 6
    },
    currentMembers: {
      type: Number,
      default: 0
    },
    deadline: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['recruiting', 'active', 'completed', 'cancelled'],
      default: 'recruiting'
    },
    members: [{
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['Team Lead', 'Developer', 'Designer', 'Tester', 'Researcher'],
        default: 'Developer'
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }],
    teamLead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    workspaceLink: {
      type: String
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    tasks: [{
      title: String,
      description: String,
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
      },
      dueDate: Date,
      completedAt: Date
    }],
    finalSubmission: {
      type: String
    },
    submittedAt: {
      type: Date
    },
    grade: {
      type: Number,
      min: 0,
      max: 100
    },
    feedback: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('GroupProject', groupProjectSchema);