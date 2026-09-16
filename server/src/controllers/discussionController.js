import DiscussionThread from '../models/DiscussionThread.js';

/**
 * GET /api/discussions/:courseId/:session
 */
export const getThreads = async (req, res) => {
  try {
    const { courseId, session } = req.params;
    const threads = await DiscussionThread.find({ course: courseId, session: Number(session) })
      .populate('author', 'name role profilePicture')
      .populate('replies.author', 'name role profilePicture')
      .sort({ createdAt: -1 });
    res.json({ success: true, threads });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discussions', error: error.message });
  }
};

/**
 * POST /api/discussions/:courseId/:session
 * Creates a new thread.
 */
export const createThread = async (req, res) => {
  try {
    const { courseId, session } = req.params;
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ message: 'Title and body required.' });

    const thread = await DiscussionThread.create({
      course: courseId,
      session: Number(session),
      author: req.user._id,
      title,
      body,
    });

    await thread.populate('author', 'name role profilePicture');
    res.status(201).json({ success: true, thread });
  } catch (error) {
    res.status(500).json({ message: 'Error creating thread', error: error.message });
  }
};

/**
 * POST /api/discussions/reply/:threadId
 */
export const replyToThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { body } = req.body;
    if (!body) return res.status(400).json({ message: 'Reply body required.' });

    const thread = await DiscussionThread.findById(threadId);
    if (!thread) return res.status(404).json({ message: 'Thread not found.' });

    const isInstructor = req.user.role === 'faculty' || req.user.role === 'admin';

    thread.replies.push({
      author: req.user._id,
      body,
      isInstructorReply: isInstructor,
    });

    await thread.save();
    await thread.populate('replies.author', 'name role profilePicture');

    res.status(201).json({ success: true, thread });
  } catch (error) {
    res.status(500).json({ message: 'Error replying to thread', error: error.message });
  }
};

export default { getThreads, createThread, replyToThread };
