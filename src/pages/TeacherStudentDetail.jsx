import './TeacherStudentDetail.css'

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, X, User as UserIcon } from 'lucide-react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function TeacherStudentDetail() {
  const { courseId, studentId } = useParams()
  const { token } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getTeacherStudentDetail(courseId, studentId, token)
        setData(res)
      } catch { /* silent */ }
      finally { setLoading(false) }
    }
    if (token) load()
  }, [courseId, studentId, token])

  if (loading) {
    return (
      <section className="portal-page">
        <div className="container"><p className="portal-empty">Loading student detail…</p></div>
      </section>
    )
  }

  if (!data?.student) {
    return (
      <section className="portal-page">
        <div className="container"><p className="portal-empty">Student not found.</p></div>
      </section>
    )
  }

  const { student, courseTitle, progress, grades } = data

  return (
    <section className="portal-page">
      <div className="container">
        <Link to={`/teacher/courses/${courseId}`} className="portal-back">
          <ArrowLeft size={16} /> Back to roster
        </Link>

        {/* Student header */}
        <div className="tsd-header">
          <div className="tsd-avatar">
            {student.profilePicture
              ? <img src={student.profilePicture} alt="" />
              : <UserIcon size={24} />
            }
          </div>
          <div>
            <h1 className="tsd-name">{student.name}</h1>
            <p className="tsd-meta">
              {student.email} · Grade {student.grade || '—'} · {student.school || '—'} · {student.points || 0} XP
            </p>
          </div>
        </div>

        <h2 className="tsd-course-title">{courseTitle}</h2>

        {/* Progress summary */}
        {progress && (
          <div className="tsd-progress-row">
            <div className="tsd-stat"><strong>{progress.progressPercentage || 0}%</strong><span>Complete</span></div>
            <div className="tsd-stat"><strong>{progress.completedLessonIds?.length || progress.completedLevels || 0}</strong><span>Sessions Done</span></div>
            <div className="tsd-stat"><strong>{progress.totalTimeSpentMinutes || 0}</strong><span>Minutes Spent</span></div>
            <div className="tsd-stat"><strong>{progress.averageScore || 0}%</strong><span>Avg Score</span></div>
          </div>
        )}

        {/* Grade records with per-question answers */}
        <h3 className="tsd-section-title">Assessment History</h3>
        {grades.length === 0 ? (
          <p className="portal-empty">No assessment records yet.</p>
        ) : (
          grades.map((g, gi) => (
            <div key={g._id || gi} className="tsd-grade-card">
              <div className="tsd-grade-card__header">
                <span>Score: <strong>{g.score ?? g.finalPercentage ?? 0}</strong> / {g.maxScore || 100}</span>
                <span className="tsd-grade-card__date">
                  {g.submittedAt ? new Date(g.submittedAt).toLocaleString() : '—'}
                </span>
              </div>

              {g.answers && g.answers.length > 0 && (
                <div className="tsd-answers">
                  {g.answers.map((a, ai) => (
                    <div key={ai} className={`tsd-answer ${a.isCorrect ? 'tsd-answer--correct' : 'tsd-answer--wrong'}`}>
                      <span className="tsd-answer__icon">
                        {a.isCorrect ? <Check size={14} /> : <X size={14} />}
                      </span>
                      <span className="tsd-answer__q">Q{ai + 1}</span>
                      <span className="tsd-answer__response">
                        {typeof a.response === 'object' ? JSON.stringify(a.response) : String(a.response ?? '—')}
                      </span>
                      <span className="tsd-answer__pts">{a.pointsEarned || 0} pts</span>
                      {a.timeTakenSeconds > 0 && (
                        <span className="tsd-answer__time">{a.timeTakenSeconds}s</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
