import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true }, // stored as bcrypt hash, never plain text

    // Distinguishes student / faculty / admin accounts. Defaults to
    // 'student' since that's the primary signup flow today.
    role: { type: String, enum: ['student', 'faculty', 'admin'], default: 'student' },

    // Student-only fields (ignored for faculty/admin accounts)
    grade: { type: Number, min: 3, max: 9 },
    school: { type: String, trim: true },
    points: { type: Number, default: 0 },

    // Faculty-only: courses this teacher owns
    teachingCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

    // Streak tracking for XP bonuses
    streak: {
      current: { type: Number, default: 0 },
      longest: { type: Number, default: 0 },
      lastActiveDate: { type: String, default: '' }, // YYYY-MM-DD
    },

    // Earned badges
    badges: [{
      slug: { type: String, required: true },           // e.g. 'perfect_score', 'course_finisher', 'streak_master'
      name: { type: String, required: true },
      description: { type: String, default: '' },
      earnedAt: { type: Date, default: Date.now },
      meta: { type: mongoose.Schema.Types.Mixed },       // e.g. { courseId, assignmentId }
    }],

    // Data URI (e.g. "data:image/png;base64,...") of an uploaded photo.
    // Left empty/null when the user hasn't uploaded one — the frontend
    // falls back to an initials avatar in that case.
    profilePicture: { type: String, default: '' },

    isVerified: { type: Boolean, default: false },

    // Signup / login OTP
    otpCode: { type: String },
    otpExpiresAt: { type: Date },

    // Forgot-password OTP (kept separate so an active login OTP can't be reused to reset a password)
    resetOtpCode: { type: String },
    resetOtpExpiresAt: { type: Date },
  },
  { timestamps: true }
)

// Hash the password automatically whenever it's set or changed
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

export default mongoose.model('User', userSchema)
