import { useEffect, useState } from 'react'
import { MessageCircle, Send, Shield } from 'lucide-react'
import { api } from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'
import './DiscussionPanel.css'

export default function DiscussionPanel({ courseId, session }) {
  const { token, user } = useAuth()
  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [replyBodies, setReplyBodies] = useState({}) // threadId → text
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadThreads()
  }, [courseId, session, token]) // eslint-disable-line

  async function loadThreads() {
    if (!token || !courseId || !session) return
    try {
      const res = await api.getDiscussions(courseId, session, token)
      setThreads(res.threads || [])
    } catch { /* silent */ }
    finally { setLoading(false) }
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!newTitle.trim() || !newBody.trim()) return
    try {
      await api.createThread(courseId, session, { title: newTitle, body: newBody }, token)
      setNewTitle(''); setNewBody(''); setShowForm(false)
      loadThreads()
    } catch (err) { alert(err.message) }
  }

  async function handleReply(threadId) {
    const body = replyBodies[threadId]?.trim()
    if (!body) return
    try {
      await api.replyToThread(threadId, body, token)
      setReplyBodies((prev) => ({ ...prev, [threadId]: '' }))
      loadThreads()
    } catch (err) { alert(err.message) }
  }

  if (!token) return null

  return (
    <div className="disc-panel">
      <div className="disc-panel__header">
        <MessageCircle size={18} />
        <h3>Discussion</h3>
        <button className="disc-panel__new-btn" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Cancel' : '+ New Question'}
        </button>
      </div>

      {showForm && (
        <form className="disc-panel__form" onSubmit={handleCreate}>
          <input placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
          <textarea placeholder="Your question…" value={newBody} onChange={(e) => setNewBody(e.target.value)} required rows={3} />
          <button type="submit" className="btn btn--primary" style={{ alignSelf: 'flex-start', padding: '0.5rem 1.2rem' }}>Post</button>
        </form>
      )}

      {loading ? <p className="disc-panel__empty">Loading…</p> :
        threads.length === 0 ? <p className="disc-panel__empty">No questions yet for this session.</p> : (
          <div className="disc-panel__threads">
            {threads.map((t) => (
              <div key={t._id} className="disc-thread">
                <div className="disc-thread__head">
                  <strong>{t.author?.name || 'Student'}</strong>
                  <span className="disc-thread__title">{t.title}</span>
                </div>
                <p className="disc-thread__body">{t.body}</p>

                {t.replies?.map((r, ri) => (
                  <div key={ri} className={`disc-reply ${r.isInstructorReply ? 'disc-reply--instructor' : ''}`}>
                    {r.isInstructorReply && <Shield size={12} className="disc-reply__badge" />}
                    <strong>{r.author?.name || 'User'}</strong>
                    <p>{r.body}</p>
                  </div>
                ))}

                <div className="disc-reply-form">
                  <input
                    placeholder="Reply…"
                    value={replyBodies[t._id] || ''}
                    onChange={(e) => setReplyBodies((prev) => ({ ...prev, [t._id]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleReply(t._id) }}
                  />
                  <button type="button" onClick={() => handleReply(t._id)} aria-label="Send reply"><Send size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}
