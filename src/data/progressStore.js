/**
 * Lightweight, localStorage-based progress store.
 *
 * Identity: name-entry only — same name resumes saved progress.
 * Scoring: each session is worth up to 3 pts (1 per question). Best score per
 *          session is kept; retakes never penalise.
 * Leaderboard: all tracked students, ranked by total best score.
 */

const STORAGE_KEY = 'fm-course-progress'
const LEADERBOARD_KEY = 'fm-leaderboard'

// ─── Helpers ───────────────────────────────────────────────

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function writeStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function readLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || {}
  } catch {
    return {}
  }
}

function writeLeaderboard(data) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(data))
}

// ─── Public API ────────────────────────────────────────────

/** Get or create a student profile by name (case-insensitive key). */
export function getStudent(name) {
  const store = readStore()
  const key = name.trim().toLowerCase()
  if (!store[key]) {
    store[key] = { name: name.trim(), scores: {} }
    writeStore(store)
  }
  return store[key]
}

/** List all known student names. */
export function listStudentNames() {
  return Object.values(readStore()).map(s => s.name)
}

/**
 * Save a session score. Only the best score per session is kept.
 * @param {string} name       Student name
 * @param {string} courseId   e.g. "ai-explorer"
 * @param {number} sessionId  1-indexed
 * @param {number} score      0–3
 * @returns {{ saved: boolean, best: number }} whether it was a new best, and the current best
 */
export function saveScore(name, courseId, sessionId, score) {
  const store = readStore()
  const key = name.trim().toLowerCase()
  if (!store[key]) {
    store[key] = { name: name.trim(), scores: {} }
  }

  const scoreKey = `${courseId}__${sessionId}`
  const prev = store[key].scores[scoreKey] ?? -1
  const isBest = score > prev
  if (isBest) {
    store[key].scores[scoreKey] = score
  }

  writeStore(store)

  // Update leaderboard cache
  syncLeaderboard(key, store[key])

  return { saved: isBest, best: Math.max(prev, score) }
}

/**
 * Get a student's best score for a specific session.
 * Returns null if not attempted.
 */
export function getSessionBest(name, courseId, sessionId) {
  const store = readStore()
  const key = name.trim().toLowerCase()
  const student = store[key]
  if (!student) return null
  const scoreKey = `${courseId}__${sessionId}`
  return student.scores[scoreKey] ?? null
}

/**
 * Get all completed session IDs for a course.
 * @returns {number[]} array of session IDs (1-indexed)
 */
export function getCompletedSessions(name, courseId) {
  const store = readStore()
  const key = name.trim().toLowerCase()
  const student = store[key]
  if (!student) return []
  const prefix = `${courseId}__`
  return Object.keys(student.scores)
    .filter(k => k.startsWith(prefix))
    .map(k => parseInt(k.replace(prefix, ''), 10))
}

/**
 * Calculate total best score across ALL courses.
 */
export function getTotalScore(name) {
  const store = readStore()
  const key = name.trim().toLowerCase()
  const student = store[key]
  if (!student) return 0
  return Object.values(student.scores).reduce((sum, s) => sum + s, 0)
}

/**
 * Get total sessions completed across all courses.
 */
export function getTotalSessionsCompleted(name) {
  const store = readStore()
  const key = name.trim().toLowerCase()
  const student = store[key]
  if (!student) return 0
  return Object.keys(student.scores).length
}

// ─── Leaderboard ───────────────────────────────────────────

function syncLeaderboard(key, student) {
  const lb = readLeaderboard()
  const total = Object.values(student.scores).reduce((sum, s) => sum + s, 0)
  const sessions = Object.keys(student.scores).length
  lb[key] = { name: student.name, total, sessions }
  writeLeaderboard(lb)
}

/**
 * Get sorted leaderboard entries.
 * @param {number} [limit] optional cap
 * @returns {{ name: string, total: number, sessions: number }[]}
 */
export function getLeaderboard(limit) {
  const lb = readLeaderboard()
  const sorted = Object.values(lb).sort((a, b) => b.total - a.total || b.sessions - a.sessions)
  return limit ? sorted.slice(0, limit) : sorted
}

/**
 * Rebuild leaderboard from raw progress store (repair utility).
 */
export function rebuildLeaderboard() {
  const store = readStore()
  const lb = {}
  for (const [key, student] of Object.entries(store)) {
    const total = Object.values(student.scores).reduce((sum, s) => sum + s, 0)
    const sessions = Object.keys(student.scores).length
    lb[key] = { name: student.name, total, sessions }
  }
  writeLeaderboard(lb)
  return lb
}
