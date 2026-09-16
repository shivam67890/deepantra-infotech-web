import { getLevelsByGrade } from '../components/GameEngine/levelData.js';

/**
 * Parse a course gradeBand string (e.g. "Grades 3-5", "Grades 6-8", "Grades 9+")
 * into a representative numeric grade that maps to the game engine's level buckets.
 *
 * Game engine buckets:
 *   grades_3_4  → grade ≤ 4  → levels 1–10
 *   grades_5_6  → grade ≤ 6  → levels 11–20
 *   grades_7_9  → grade ≥ 7  → levels 21–30
 */
export function gradeFromBand(gradeBand) {
  if (!gradeBand) return null;
  const lower = gradeBand.toLowerCase();

  if (lower.includes('3-5') || lower.includes('3–5')) return 4;
  if (lower.includes('6-8') || lower.includes('6–8')) return 6;
  if (lower.includes('9+') || lower.includes('9-') || lower.includes('9–')) return 9;
  if (lower.includes('3-9') || lower.includes('3–9')) return 6; // default to middle band

  // Try to extract any number
  const match = gradeBand.match(/(\d+)/);
  if (match) return parseInt(match[1], 10);

  return null;
}

/**
 * Get the game levels that match a course's grade band.
 * Falls back to the student's own grade if the course has no gradeBand.
 */
export function getGameLevelsForCourse(course, studentGrade) {
  const grade = gradeFromBand(course?.gradeBand) ?? studentGrade ?? 5;
  return getLevelsByGrade(grade);
}

/**
 * Get the first game level ID for a course (used by the "Play Game" button).
 */
export function getFirstLevelIdForCourse(course, studentGrade) {
  const levels = getGameLevelsForCourse(course, studentGrade);
  return levels.length > 0 ? levels[0].id : 1;
}
