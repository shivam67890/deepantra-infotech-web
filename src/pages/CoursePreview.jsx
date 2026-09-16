import './CoursePreview.css'

import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, Lightbulb, Trophy } from 'lucide-react'

import { courses } from '../data/curriculumData'
import aiExplorerSessions from '../data/aiExplorerSessions'
import youngInnovatorsSessions from '../data/youngInnovatorsSessions'
import {
  getStudent,
  saveScore,
  getSessionBest,
  getCompletedSessions,
  getTotalScore,
} from '../data/progressStore'
import LeaderboardPreview from '../components/LeaderboardPreview'

const sessionMap = {
  'ai-explorer': aiExplorerSessions,
  'young-innovators': youngInnovatorsSessions,
}

export default function CoursePreview() {
  const { courseId } = useParams()
  const course = courses.find(c => c.id === courseId)
  const sessions = sessionMap[courseId] ?? []

  // ── Name gate ──
  const [playerName, setPlayerName] = useState(() => {
    try { return localStorage.getItem('fm-demo-name') || '' } catch { return '' }
  })
  const [nameInput, setNameInput] = useState('')
  const [nameSubmitted, setNameSubmitted] = useState(!!playerName)

  function handleNameSubmit(e) {
    e.preventDefault()
    const trimmed = nameInput.trim()
    if (!trimmed) return
    localStorage.setItem('fm-demo-name', trimmed)
    setPlayerName(trimmed)
    setNameSubmitted(true)
    getStudent(trimmed) // ensure exists in store
  }

  // ── Session navigation ──
  const [activeIdx, setActiveIdx] = useState(0)
  const session = sessions[activeIdx]

  // ── Assignment state ──
  const [answers, setAnswers] = useState({}) // { qIndex: selectedOptionIndex }
  const [submitted, setSubmitted] = useState(false)
  const [showingLearn, setShowingLearn] = useState(true) // true = Learn tab, false = Assignment tab

  // Reset when session changes
  useEffect(() => {
    setAnswers({})
    setSubmitted(false)
    setShowingLearn(true)
  }, [activeIdx])

  // ── Derived data ──
  const completedIds = useMemo(
    () => (playerName ? getCompletedSessions(playerName, courseId) : []),
    [playerName, courseId, submitted] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const prevBest = playerName && session
    ? getSessionBest(playerName, courseId, session.id)
    : null

  const totalScore = playerName ? getTotalScore(playerName) : 0

  const progressPercent = sessions.length > 0
    ? Math.round((completedIds.length / sessions.length) * 100)
    : 0

  // ── Assignment logic ──
  function selectAnswer(qIdx, optIdx) {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }))
  }

  function submitAssignment() {
    if (!session || !playerName) return
    const qs = session.assignment
    let correct = 0
    qs.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++
    })
    saveScore(playerName, courseId, session.id, correct)
    setSubmitted(true)
  }

  const allAnswered = session
    ? session.assignment.every((_, i) => answers[i] !== undefined)
    : false

  const scoreThisAttempt = submitted
    ? session.assignment.reduce((sum, q, i) => sum + (answers[i] === q.correctIndex ? 1 : 0), 0)
    : null

  // ── Not found ──
  if (!course) {
    return (
      <section className="portal-page">
        <div className="container">
          <p className="portal-empty">Course not found.</p>
          <Link to="/" className="btn btn--outline">← Back to Home</Link>
        </div>
      </section>
    )
  }

  // ── Name gate screen ──
  if (!nameSubmitted) {
    return (
      <section className="portal-page">
        <div className="container">
          <Link to="/" className="portal-back"><ArrowLeft size={16} /> Back to Home</Link>
          <div className="cp-name-gate">
            <div className={`cp-name-gate__icon cp-name-gate__icon--${course.accent}`}>
              <span>{course.icon}</span>
            </div>
            <h1>{course.title}</h1>
            <p className="cp-name-gate__sub">
              Enter your name to start. If you've been here before, use the same name to resume your progress.
            </p>
            <form className="cp-name-gate__form" onSubmit={handleNameSubmit}>
              <input
                type="text"
                placeholder="Your name"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                autoFocus
                maxLength={40}
              />
              <button type="submit" className="btn btn--primary" disabled={!nameInput.trim()}>
                Start Learning →
              </button>
            </form>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/" className="portal-back"><ArrowLeft size={16} /> Back to Home</Link>

        {/* Header */}
        <div className="cp-header">
          <div>
            <h1 className="cp-header__title">{course.title}</h1>
            <p className="cp-header__meta">
              {course.grades} · {sessions.length} sessions · Playing as <strong>{playerName}</strong>
              <span className="cp-header__pts"><Trophy size={14} /> {totalScore} pts</span>
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="cp-progress">
          <div className="cp-progress__bar">
            <div
              className={`cp-progress__fill cp-progress__fill--${course.accent}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="cp-progress__text">
            {completedIds.length} / {sessions.length} sessions · {progressPercent}%
          </span>
        </div>

        <div className="cp-layout">
          {/* Sidebar — session list */}
          <aside className="cp-sidebar">
            {sessions.map((s, i) => {
              const done = completedIds.includes(s.id)
              const active = i === activeIdx
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`cp-sidebar__btn ${active ? 'is-active' : ''} ${done ? 'is-done' : ''}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <span className={`cp-sidebar__num ${done ? 'cp-sidebar__num--done' : ''}`}>
                    {done ? <Check size={12} /> : s.id}
                  </span>
                  <span className="cp-sidebar__label">{s.title}</span>
                </button>
              )
            })}
          </aside>

          {/* Main content */}
          <div className="cp-main">
            {session && (
              <>
                {/* Tabs */}
                <div className="cp-tabs">
                  <button
                    className={`cp-tabs__btn ${showingLearn ? 'cp-tabs__btn--active' : ''}`}
                    onClick={() => setShowingLearn(true)}
                  >
                    <BookOpen size={15} /> Learn
                  </button>
                  <button
                    className={`cp-tabs__btn ${!showingLearn ? 'cp-tabs__btn--active' : ''}`}
                    onClick={() => setShowingLearn(false)}
                  >
                    <Check size={15} /> Assignment
                    {prevBest !== null && (
                      <span className="cp-tabs__score-pill">{prevBest}/3</span>
                    )}
                  </button>
                </div>

                {showingLearn ? (
                  /* ── LEARN TAB ── */
                  <div className="cp-learn">
                    <h2 className="cp-learn__title">
                      Session {session.id}: {session.title}
                    </h2>
                    <p className="cp-learn__objective">
                      <strong>Objective:</strong> {session.objective}
                    </p>

                    {session.learn.map((sub, si) => (
                      <div key={si} className="cp-learn__subsection">
                        <h3>{sub.heading}</h3>
                        <ul>
                          {sub.bullets.map((b, bi) => (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div className="cp-learn__dyk">
                      <Lightbulb size={18} />
                      <div>
                        <strong>Did you know?</strong>
                        <p>{session.didYouKnow}</p>
                      </div>
                    </div>

                    <button
                      className="btn btn--primary cp-learn__cta"
                      onClick={() => setShowingLearn(false)}
                    >
                      Take the Assignment →
                    </button>
                  </div>
                ) : (
                  /* ── ASSIGNMENT TAB ── */
                  <div className="cp-quiz">
                    <h2 className="cp-quiz__title">
                      Assignment — Session {session.id}
                    </h2>
                    <p className="cp-quiz__intro">
                      Answer all 3 questions. Each correct answer earns 1 point.
                      {prevBest !== null && (
                        <span className="cp-quiz__prev-best"> Your best score: {prevBest}/3</span>
                      )}
                    </p>

                    {session.assignment.map((q, qi) => {
                      const chosen = answers[qi]
                      const isCorrect = chosen === q.correctIndex
                      return (
                        <div key={qi} className="cp-quiz__question">
                          <p className="cp-quiz__q-text">
                            <span className="cp-quiz__q-num">Q{qi + 1}.</span> {q.question}
                          </p>
                          <div className="cp-quiz__options">
                            {q.options.map((opt, oi) => {
                              let cls = 'cp-quiz__option'
                              if (submitted) {
                                if (oi === q.correctIndex) cls += ' cp-quiz__option--correct'
                                else if (oi === chosen && !isCorrect) cls += ' cp-quiz__option--wrong'
                              } else if (oi === chosen) {
                                cls += ' cp-quiz__option--selected'
                              }
                              return (
                                <button
                                  key={oi}
                                  type="button"
                                  className={cls}
                                  onClick={() => selectAnswer(qi, oi)}
                                  disabled={submitted}
                                >
                                  <span className="cp-quiz__option-letter">
                                    {String.fromCharCode(65 + oi)}
                                  </span>
                                  {opt}
                                </button>
                              )
                            })}
                          </div>
                          {submitted && (
                            <p className={`cp-quiz__explanation ${isCorrect ? 'cp-quiz__explanation--correct' : 'cp-quiz__explanation--wrong'}`}>
                              {isCorrect ? '✓ Correct!' : '✗ Not quite.'} {q.explanation}
                            </p>
                          )}
                        </div>
                      )
                    })}

                    {!submitted ? (
                      <button
                        className="btn btn--primary cp-quiz__submit"
                        disabled={!allAnswered}
                        onClick={submitAssignment}
                      >
                        Submit Assignment
                      </button>
                    ) : (
                      <div className="cp-quiz__result">
                        <div className="cp-quiz__result-score">
                          You scored <strong>{scoreThisAttempt}/3</strong>
                        </div>
                        <div className="cp-quiz__result-actions">
                          <button
                            className="btn btn--outline"
                            onClick={() => {
                              setAnswers({})
                              setSubmitted(false)
                            }}
                          >
                            Retry
                          </button>
                          {activeIdx < sessions.length - 1 && (
                            <button
                              className="btn btn--primary"
                              onClick={() => setActiveIdx(prev => prev + 1)}
                            >
                              Next Session <ArrowRight size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Nav arrows */}
                <div className="cp-nav">
                  <button
                    className="btn btn--outline"
                    onClick={() => setActiveIdx(prev => prev - 1)}
                    disabled={activeIdx === 0}
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button
                    className="btn btn--outline"
                    onClick={() => setActiveIdx(prev => prev + 1)}
                    disabled={activeIdx === sessions.length - 1}
                  >
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Leaderboard sidebar below on mobile, inline on desktop */}
        <div className="cp-leaderboard-section">
          <LeaderboardPreview currentName={playerName} />
        </div>
      </div>
    </section>
  )
}
