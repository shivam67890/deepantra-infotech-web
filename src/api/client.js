// Central place for the backend base URL.
// Set VITE_API_URL in a .env file at the project root (see .env.example).
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.')
  }
  return data
}

export const api = {
  checkEmail: (payload) => request('/auth/check-email', { method: 'POST', body: payload }),
  signup: (payload) => request('/auth/signup', { method: 'POST', body: payload }),
  verifyOtp: (payload) => request('/auth/verify-otp', { method: 'POST', body: payload }),
  resendOtp: (payload) => request('/auth/resend-otp', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  forgotPassword: (payload) => request('/auth/forgot-password', { method: 'POST', body: payload }),
  resetPassword: (payload) => request('/auth/reset-password', { method: 'POST', body: payload }),
  updateProfilePicture: (profilePicture, token) =>
    request('/auth/profile-picture', { method: 'PUT', body: { profilePicture }, token }),
  bookDemo: (payload) => request('/demo', { method: 'POST', body: payload }),
  getDemoBookings: (token) => request('/demo', { token }),

  // Courses
  getAllCourses: (token) => request('/courses', { token }),
  getCourseById: (courseId, token) => request(`/courses/${courseId}`, { token }),
  getStudentCourses: (token) => request('/courses/student/courses', { token }),
  enrollCourse: (courseId, token) =>
    request('/courses/enroll', { method: 'POST', body: { courseId }, token }),
  updateProgress: (payload, token) =>
    request('/courses/progress', { method: 'PUT', body: payload, token }),
  completeLesson: (courseId, lessonId, token) =>
    request('/courses/complete-lesson', {
      method: 'POST',
      body: { courseId, lessonId },
      token,
    }),
  addPoints: (points, token) =>
    request('/auth/points', {
      method: 'POST',
      body: { points },
      token,
    }),
  runCode: (payload) =>
    request('/run', {
      method: 'POST',
      body: payload,
    }),

  // Grades
  getStudentGrades: (studentId, token) => request(`/grades/${studentId}`, { token }),
  getStudentCourseGrade: (studentId, courseId, token) =>
    request(`/grades/${studentId}/${courseId}`, { token }),
  updateGrade: (payload, token) =>
    request('/grades/update', { method: 'POST', body: payload, token }),
  overrideGrade: (payload, token) =>
    request('/grades/override', { method: 'POST', body: payload, token }),
  getCourseGradeDistribution: (courseId, token) =>
    request(`/grades/course/${courseId}/analytics`, { token }),

  // Teacher Portal
  getTeacherCourses: (token) => request('/teacher/courses', { token }),
  getTeacherRoster: (courseId, token) => request(`/teacher/courses/${courseId}/roster`, { token }),
  getTeacherStudentDetail: (courseId, studentId, token) =>
    request(`/teacher/courses/${courseId}/students/${studentId}`, { token }),
  getTeacherCourseAnalytics: (courseId, token) =>
    request(`/teacher/courses/${courseId}/analytics`, { token }),
  getGradingQueue: (token) => request('/teacher/grading-queue', { token }),
  gradeQuestion: (gradeId, payload, token) =>
    request(`/teacher/grading-queue/${gradeId}`, { method: 'POST', body: payload, token }),

  // Student Extras (Phase 2)
  getScoreHistory: (token) => request('/student/score-history', { token }),
  getSkillBreakdown: (token) => request('/student/skills', { token }),
  getRealLeaderboard: (token) => request('/student/leaderboard', { token }),

  // Notifications
  getNotifications: (token) => request('/notifications', { token }),
  markNotificationRead: (id, token) =>
    request(`/notifications/${id}/read`, { method: 'POST', token }),

  // Admin (Phase 3)
  getAdminUsers: (params, token) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/admin/users${qs ? '?' + qs : ''}`, { token });
  },
  updateUserRole: (userId, role, token) =>
    request(`/admin/users/${userId}/role`, { method: 'PATCH', body: { role }, token }),
  getAdminAnalytics: (token) => request('/admin/analytics', { token }),

  // Discussions (Phase 3)
  getDiscussions: (courseId, session, token) =>
    request(`/discussions/${courseId}/${session}`, { token }),
  createThread: (courseId, session, payload, token) =>
    request(`/discussions/${courseId}/${session}`, { method: 'POST', body: payload, token }),
  replyToThread: (threadId, body, token) =>
    request(`/discussions/reply/${threadId}`, { method: 'POST', body: { body }, token }),

  // Challenges (Phase 4)
  createChallenge: (payload, token) =>
    request('/teacher/challenges', { method: 'POST', body: payload, token }),
  getChallenges: (courseId, token) => request(`/challenges/${courseId}`, { token }),
  submitChallengeScore: (challengeId, score, token) =>
    request(`/challenges/${challengeId}/submit`, { method: 'POST', body: { score }, token }),
  getHint: (assignmentId, payload, token) =>
    request(`/assignments/${assignmentId}/hint`, { method: 'POST', body: payload, token }),
}