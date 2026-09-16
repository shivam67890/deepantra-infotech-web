import mongoose from 'mongoose';

/**
 * Badge definitions — awarded server-side and stored on User.badges[].
 * This model holds the canonical badge catalog; User.badges[] holds earned instances.
 */
const badgeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,  // emoji or URL
      default: '🏅',
    },
    // Conditions under which this badge is auto-awarded (informational, logic lives in services)
    trigger: {
      type: String,
      enum: ['perfect_score', 'course_finisher', 'streak_master', 'first_assignment', 'custom'],
      default: 'custom',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Badge', badgeSchema);
