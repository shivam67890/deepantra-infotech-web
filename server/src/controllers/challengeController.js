import Challenge from '../models/Challenge.js';

/**
 * POST /api/teacher/challenges
 * Teacher creates a time-boxed challenge.
 */
export const createChallenge = async (req, res) => {
  try {
    const { course, title, description, opensAt, closesAt, assignment, bonusXp } = req.body;
    if (!course || !title || !opensAt || !closesAt) {
      return res.status(400).json({ message: 'course, title, opensAt, and closesAt are required.' });
    }
    const challenge = await Challenge.create({
      course,
      createdBy: req.user._id,
      title,
      description,
      opensAt,
      closesAt,
      assignment,
      bonusXp: bonusXp || 25,
    });
    res.status(201).json({ success: true, challenge });
  } catch (error) {
    res.status(500).json({ message: 'Error creating challenge', error: error.message });
  }
};

/**
 * GET /api/challenges/:courseId
 * List active challenges for a course.
 */
export const getChallenges = async (req, res) => {
  try {
    const { courseId } = req.params;
    const now = new Date();
    const challenges = await Challenge.find({
      course: courseId,
      isActive: true,
      closesAt: { $gte: now },
    })
      .populate('assignment', 'title totalPoints')
      .populate('leaderboard.student', 'name profilePicture')
      .sort({ opensAt: 1 });
    res.json({ success: true, challenges });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching challenges', error: error.message });
  }
};

/**
 * POST /api/challenges/:id/submit
 * Student submits their score to the challenge leaderboard.
 */
export const submitChallengeScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;
    const studentId = req.user._id;

    const challenge = await Challenge.findById(id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found.' });

    const now = new Date();
    if (now < challenge.opensAt) return res.status(400).json({ message: 'Challenge has not opened yet.' });
    if (now > challenge.closesAt) return res.status(400).json({ message: 'Challenge has closed.' });

    // Upsert: keep best score
    const existing = challenge.leaderboard.find(
      (e) => e.student.toString() === studentId.toString()
    );
    if (existing) {
      if (score > existing.score) {
        existing.score = score;
        existing.submittedAt = now;
      }
    } else {
      challenge.leaderboard.push({ student: studentId, score, submittedAt: now });
    }

    // Sort leaderboard descending
    challenge.leaderboard.sort((a, b) => b.score - a.score);
    await challenge.save();

    res.json({ success: true, message: 'Score submitted.', challenge });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting score', error: error.message });
  }
};

/**
 * POST /api/assignments/:id/hint
 * Returns a nudge toward the concept without revealing the answer.
 * Uses a simple rules-based approach (no LLM dependency).
 */
export const getHint = async (req, res) => {
  try {
    const { questionText, wrongAnswer } = req.body;
    if (!questionText) {
      return res.status(400).json({ message: 'questionText is required.' });
    }

    // Simple hint generation — provides concept-level nudge
    const hint = generateHint(questionText, wrongAnswer);
    res.json({ success: true, hint });
  } catch (error) {
    res.status(500).json({ message: 'Error generating hint', error: error.message });
  }
};

function generateHint(questionText, wrongAnswer) {
  const q = questionText.toLowerCase();

  // Pattern-based hint generation
  if (q.includes('python') || q.includes('programming') || q.includes('code')) {
    return 'Think about the fundamental Python syntax rules. Consider what each operator or keyword actually does. Try re-reading the question carefully and ruling out answers that don\'t match Python\'s behavior.';
  }
  if (q.includes('ai') || q.includes('artificial intelligence') || q.includes('machine learning')) {
    return 'Focus on what "learning from data" really means. Think about the difference between rules a human writes and patterns a machine discovers. Which answer aligns with how AI systems actually work?';
  }
  if (q.includes('html') || q.includes('web') || q.includes('tag')) {
    return 'Remember the basics of HTML structure: tags come in pairs, each tag has a specific purpose. Think about which tag is most commonly used for the element described in the question.';
  }
  if (q.includes('cyber') || q.includes('security') || q.includes('password') || q.includes('phishing')) {
    return 'Think about the core principle: protecting data and identity. Which answer describes a genuine security threat or protection mechanism?';
  }
  if (q.includes('network') || q.includes('internet') || q.includes('ip')) {
    return 'Consider how devices communicate — they need addresses, routes, and protocols. Which answer correctly describes a networking concept?';
  }
  if (q.includes('database') || q.includes('table') || q.includes('query')) {
    return 'Databases organize data in structured ways. Think about how you would search for specific information in a large, organized collection.';
  }
  if (q.includes('algorithm') || q.includes('flowchart') || q.includes('loop')) {
    return 'An algorithm is about step-by-step thinking. Consider the logical flow: what comes first, what repeats, and when do you make a decision?';
  }

  return `Look at the question again carefully. Your previous answer might be close but missing a key detail. Try to identify exactly what the question is asking — sometimes re-reading it slowly helps. Think about the core concept being tested.`;
}

export default { createChallenge, getChallenges, submitChallengeScore, getHint };
