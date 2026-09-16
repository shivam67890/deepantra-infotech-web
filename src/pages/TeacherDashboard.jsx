import './TeacherDashboard.css'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, ClipboardList, BarChart3 } from 'lucide-react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function TeacherDashboard() {
  const { user, token } = useAuth()
  const [courses, setCourses] = useState([])
  const [queue, setQueue] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [cData, qData] = await Promise.all([
          api.getTeacherCourses(token),
          api.getGradingQueue(token),
        ])
        setCourses(cData.courses || [])
        setQueue(qData.queue || [])
      } catch { /* silent */ }
      finally { setLoading(false) }
    }
    if (token) load()
  }, [token])

  const totalStudents = courses.reduce((sum, c) => sum + (c.liveEnrolledCount || 0), 0)
  const avgCompletion = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + (c.studentsEnrolled || 0), 0) / courses.length)
    : 0

  if (loading) {
    return (
      <section className="portal-page">
        <div className="container"><p className="portal-empty">Loading teacher dashboard…</p></div>
      </section>
    )
  }

  return (
    <section className="portal-page">
      <div className="container">
        <h1 className="td-title">Teacher Dashboard</h1>
        <p className="td-sub">Welcome back, {user?.name}. Here's your overview.</p>

        {/* Stats cards */}
        <div className="td-stats">
          <div className="td-stat-card">
            <BookOpen size={20} />
            <div className="td-stat-card__value">{courses.length}</div>
            <div className="td-stat-card__label">Courses</div>
          </div>
          <div className="td-stat-card">
            <Users size={20} />
            <div className="td-stat-card__value">{totalStudents}</div>
            <div className="td-stat-card__label">Total Students</div>
          </div>
          <div className="td-stat-card">
            <ClipboardList size={20} />
            <div className="td-stat-card__value">{queue.length}</div>
            <div className="td-stat-card__label">Grading Queue</div>
          </div>
        </div>

        {/* Course list */}
        <h2 className="td-section-title">Your Courses</h2>
        {courses.length === 0 ? (
          <p className="portal-empty">No courses assigned yet.</p>
        ) : (
          <div className="td-course-grid">
            {courses.map((c) => (
              <Link
                key={c._id}
                to={`/teacher/courses/${c._id}`}
                className="td-course-card"
              >
                <div className="td-course-card__header">
                  <BookOpen size={18} />
                  <span className="td-course-card__badge">{c.gradeBand || c.level}</span>
                </div>
                <h3 className="td-course-card__title">{c.title}</h3>
                <div className="td-course-card__meta">
                  <span><Users size={14} /> {c.liveEnrolledCount} students</span>
                  <span><BarChart3 size={14} /> {c.totalSessions || c.totalLevels || '—'} sessions</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Quick link to grading */}
        {queue.length > 0 && (
          <div className="td-grading-banner">
            <ClipboardList size={20} />
            <div>
              <strong>{queue.length} submissions</strong> waiting for your review
            </div>
            <Link to="/teacher/assignments" className="btn btn--primary">
              Open Grading Queue →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
