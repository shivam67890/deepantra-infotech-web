import {
  Route,
  Routes,
} from 'react-router-dom';

import Chatbot from './components/Chatbot.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import AboutUs from './pages/AboutUs.jsx';
import AdminBookings from './pages/AdminBookings.jsx';
import AuthPage from './pages/AuthPage.jsx';
import Contact from './pages/Contact.jsx';
import CourseLeaderboard from './pages/CourseLeaderboard.jsx';
import CoursePreview from './pages/CoursePreview.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import GameEnginePage from './pages/GameEnginePage.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Programs from './pages/Programs.jsx';
import StudentAssignments from './pages/StudentAssignments.jsx';
import StudentCertifications from './pages/StudentCertifications.jsx';
import StudentCodePortal from './pages/StudentCodePortal.jsx';
import StudentCourseDetail from './pages/StudentCourseDetail.jsx';
import StudentCourses from './pages/StudentCourses.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import StudentGroupProjects from './pages/StudentGroupProjects.jsx';
import StudentLeaderboard from './pages/StudentLeaderboard.jsx';
import StudentQuiz from './pages/StudentQuiz.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import TeacherCourseRoster from './pages/TeacherCourseRoster.jsx';
import TeacherStudentDetail from './pages/TeacherStudentDetail.jsx';
import TeacherGradingQueue from './pages/TeacherGradingQueue.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminAnalytics from './pages/AdminAnalytics.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />

            {/* Interactive course preview & leaderboard (public, name-gated) */}
            <Route path="/preview/:courseId" element={<CoursePreview />} />
            <Route path="/course-leaderboard" element={<CourseLeaderboard />} />

            {/* ── Teacher / Faculty routes ── */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/courses/:courseId"
              element={
                <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                  <TeacherCourseRoster />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/courses/:courseId/students/:studentId"
              element={
                <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                  <TeacherStudentDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/assignments"
              element={
                <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                  <TeacherGradingQueue />
                </ProtectedRoute>
              }
            />

            {/* ── Student routes ── */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute role="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/quiz"
              element={
                <ProtectedRoute role="student">
                  <StudentQuiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/courses"
              element={
                <ProtectedRoute role="student">
                  <StudentCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/courses/:courseId"
              element={
                <ProtectedRoute role="student">
                  <StudentCourseDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/assignments"
              element={
                <ProtectedRoute role="student">
                  <StudentAssignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/code-portal"
              element={
                <ProtectedRoute role="student">
                  <StudentCodePortal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/group-projects"
              element={
                <ProtectedRoute role="student">
                  <StudentGroupProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/leaderboard"
              element={
                <ProtectedRoute role="student">
                  <StudentLeaderboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/certifications"
              element={
                <ProtectedRoute role="student">
                  <StudentCertifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/game-engine/:levelId"
              element={
                <ProtectedRoute role="student">
                  <GameEnginePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
        <WhatsAppButton />
      </AuthProvider>
    </ThemeProvider>
  )
}
