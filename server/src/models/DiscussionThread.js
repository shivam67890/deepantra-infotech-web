import mongoose from 'mongoose';

const discussionReplySchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true, trim: true },
    isInstructorReply: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const discussionThreadSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    session: { type: Number, required: true }, // 1-indexed session number
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    replies: [discussionReplySchema],
    isResolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

discussionThreadSchema.index({ course: 1, session: 1, createdAt: -1 });

export default mongoose.model('DiscussionThread', discussionThreadSchema);
