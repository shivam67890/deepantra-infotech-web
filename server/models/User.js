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