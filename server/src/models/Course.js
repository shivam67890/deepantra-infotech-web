import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    bullets: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const codeTaskSchema = new mongoose.Schema(
  {
    instructions: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: 'python',
    },
    starterCode: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

// Individual Level schema (30 levels per gamified course)
const levelSchema = new mongoose.Schema({
  levelNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    enum: ['slide', 'code', 'quiz', 'project'],
    default: 'slide',
  },
  xpReward: {
    type: Number,
    default: 50,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  unlockXp: {
    type: Number,
    default: 0,
  },
  targetGradeBand: {
    type: String,
    enum: ['Grades 3-5', 'Grades 6-8', 'Grades 9+', 'All Grades'],
    default: 'Grades 6-8',
  },
  slides: [slideSchema],
  codeTask: codeTaskSchema,
  quizTopic: {
    type: String,
    default: '',
  },
});

// Ordered Module schema (grouping levels into sequential educational units)
const moduleSchema = new mongoose.Schema({
  moduleNumber: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  quizTopic: {
    type: String,
    default: '',
  },
  estimatedHours: {
    type: Number,
    default: 2,
  },
  levels: [levelSchema],
});

// Legacy lesson support
const lessonSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['slide', 'code', 'quiz', 'project'],
    default: 'slide',
  },
  slides: [slideSchema],
  codeTask: codeTaskSchema,
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Coding & AI',
    },
    gradeBand: {
      type: String,
      enum: ['Grades 3-5', 'Grades 6-8', 'Grades 9+', 'Grades 3-9'],
      default: 'Grades 6-8',
    },
    gradeLevels: [
      {
        type: Number,
        min: 3,
        max: 9,
      },
    ],
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    duration: {
      type: String,
      required: true,
    },
    totalLevels: {
      type: Number,
      default: 30,
    },
    // Ordered modules grouping the 30 levels
    modules: [moduleSchema],
    // Kept for backward compatibility with existing slide lessons
    lessons: [lessonSchema],
    thumbnail: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    studentsEnrolled: {
      type: Number,
      default: 0,
    },
    instructor: {
      type: mongoose.Schema.Types.Mixed, // ObjectId ref preferred; String kept for backward compat during migration
      ref: 'User',
      required: true,
    },
    // Explicit enrolled student list for roster queries
    enrolledStudents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    totalSessions: {
      type: Number,
      default: 0,
    },
    prerequisites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Module = mongoose.model('Module', moduleSchema);
export const Level = mongoose.model('Level', levelSchema);
export default mongoose.model('Course', courseSchema);