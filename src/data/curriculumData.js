/**
 * Full curriculum data for the Grade Ladder Course Platform.
 *
 * Each course contains ordered sessions. Every session follows the same
 * three-part rhythm:
 *   1. Learn  — 2-4 subsections, each with 2-3 bullets + a "Did you know?" callout
 *   2. Assignment — 3 multiple-choice questions (1 correct, explanation shown after)
 *   3. Score & progress — handled by the runtime, not data
 *
 * Grade ladder status:
 *   Grades 1-2  → placeholder (Little Coders)
 *   Grades 3-5  → BUILT — AI Explorer Program, 12 sessions
 *   Grades 6-8  → BUILT — Young Innovators AI, 16 sessions
 *   Grade 9     → placeholder (AI Specialist Track)
 */

// ─── Grade Ladder ──────────────────────────────────────────
export const gradeLadder = [
  { grade: 1, track: 'Little Coders', level: 'Foundational', status: 'coming-soon', accent: 'gray' },
  { grade: 2, track: 'Little Coders', level: 'Foundational', status: 'coming-soon', accent: 'gray' },
  { grade: 3, track: 'AI Explorer Program', level: 'Beginner', status: 'available', accent: 'amber' },
  { grade: 4, track: 'AI Explorer Program', level: 'Beginner', status: 'available', accent: 'amber' },
  { grade: 5, track: 'AI Explorer Program', level: 'Beginner', status: 'available', accent: 'amber' },
  { grade: 6, track: 'Young Innovators AI', level: 'Intermediate', status: 'available', accent: 'indigo' },
  { grade: 7, track: 'Young Innovators AI', level: 'Intermediate', status: 'available', accent: 'indigo' },
  { grade: 8, track: 'Young Innovators AI', level: 'Intermediate', status: 'available', accent: 'indigo' },
  { grade: 9, track: 'AI Specialist Track', level: 'Advanced', status: 'coming-soon', accent: 'gray' },
]

// ─── Courses ───────────────────────────────────────────────
export const courses = [
  {
    id: 'ai-explorer',
    title: 'AI Explorer Program',
    grades: 'Grades 3 – 5',
    level: 'Beginner',
    accent: 'amber',
    icon: '🎮',
    sessions: 12,
    delivery: 'In-School',
    tagline: 'Where Curiosity Meets Technology',
    description: 'Fun and interactive sessions introducing foundational computing and AI concepts through games, stories, logic puzzles, and hands-on activities.',
    features: [
      'Foundational Computer Skills',
      'Digital Art & Creativity',
      'Introduction to Coding with Scratch',
      'Discovering AI & Responsible Use',
    ],
  },
  {
    id: 'young-innovators',
    title: 'Young Innovators AI',
    grades: 'Grades 6 – 8',
    level: 'Intermediate',
    accent: 'indigo',
    icon: '🚀',
    sessions: 16,
    delivery: 'In-School',
    tagline: 'Build Real Solutions with AI',
    description: 'Dive deeper into hardware, algorithms, Python, web development, and AI — building innovative solutions using modern tools and platforms.',
    features: [
      'Advanced Hardware & OS Mastery',
      'Python Programming & Algorithms',
      'Web Development with HTML5',
      'AI, Machine Learning & Cybersecurity',
    ],
  },
]
