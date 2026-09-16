import './TeacherGradingQueue.css'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ClipboardList, Check } from 'lucide-react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function TeacherGradingQueue() {
  const { token } = useAuth()
  const [queue, setQueue] = useState([])
  const [loading, setLoading] = useState(true)
  const [gradingStates, setGradingStates] = useState({}) // { gradeId__qIdx: { points, correct } }

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getGradingQueue(token)
        setQueue(res.queue || [])
      } catch { /* silent */ }
      finally { setLoading(false) }
    }
    if (token) load()
  }, [token])

  async function handleGrade(gradeId, questionId, pointsEarned, isCorrect) {
    try {
      await api.gradeQuestion(gradeId, { questionId, pointsEarned, isCorrect }, token)
      // Optimistic removal of that answer from the queue
      setQueue((prev) =>
        prev.map((q) => {
          if (q.gradeId !== gradeId) return q
          return {
            ...q,
            answers: q.answers.filter((a) => a.questionId?.toString() !== questionId),
          }
        }).filter((q) => q.answers.length > 0)
      )
    } catch (err) {
      alert(err.message || 'Failed to grade question.')
    }
  }

  if (loading) {
    return (
      <section className="portal-page">
        <div className="container"><p className="portal-empty">Loading grading queue…</p></div>
      </section>
    )
  }

  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/teacher/dashboard" className="portal-back">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <div className="tgq-header">
          <ClipboardList size={22} />
          <div>
            <h1>Grading Queue</h1>
            <p>{queue.length} submission{queue.length !== 1 ? 's' : ''} awaiting review</p>
          </div>
        </div>

        {queue.length === 0 ? (
          <p className="portal-empty">All caught up — nothing to grade right now.</p>
        ) : (
          queue.map((item) => (
            <div key={item.gradeId} className="tgq-card">
              <div className="tgq-card__header">
                <strong>{item.studentName}</strong>
                <span className="tgq-card__course">{item.courseName}</span>
                <span className="tgq-card__date">
                  {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : '—'}
                </span>
              </div>

              {item.answers.map((a, ai) => (
                <div key={ai} className="tgq-answer">
                  <div className="tgq-answer__response">
                    <span className="tgq-answer__q">Q{ai + 1}:</span>
                    <span>{typeof a.response === 'object' ? JSON.stringify(a.response) : String(a.response ?? '—')}</span>
                  </div>
                  <div className="tgq-answer__actions">
                    <button
                      className="tgq-btn tgq-btn--correct"
                      onClick={() => handleGrade(item.gradeId, a.questionId, 1, true)}
                      title="Mark correct (1 pt)"
                    >
                      <Check size={14} /> Correct
                    </button>
                    <button
                      className="tgq-btn tgq-btn--wrong"
                      onClick={() => handleGrade(item.gradeId, a.questionId, 0, false)}
                      title="Mark incorrect (0 pt)"
                    >
                      ✗ Incorrect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
