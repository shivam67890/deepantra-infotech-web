import './StudentQuiz.css';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  AlertCircle,
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
  Zap,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import {
  DIFFICULTIES,
  generateRandomQuiz,
  TOPICS,
} from '../data/quizQuestions.js';

export default function StudentQuiz() {
  const { user, token, updateUser } = useAuth();
  const location = useLocation();

  // Auto-select initial difficulty from user's grade
  const initialDifficulty = useMemo(() => {
    if (!user?.grade) return 'all';
    if (user.grade <= 5) return 'beginner';
    if (user.grade <= 8) return 'intermediate';
    return 'advanced';
  }, [user?.grade]);

  // Quiz setup states
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDifficulty);
  const [selectedGrade, setSelectedGrade] = useState(user?.grade || 'all');
  const [questionCount, setQuestionCount] = useState(5);
  const [quizMode, setQuizMode] = useState('practice'); // 'practice' (instant feedback) or 'timed'

  // Quiz active states
  const [stage, setStage] = useState('setup'); // 'setup' | 'playing' | 'results'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Timing
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const timerRef = useRef(null);

  // Points & sync
  const [pointsAwarded, setPointsAwarded] = useState(0);
  const [syncStatus, setSyncStatus] = useState(''); // 'saving', 'saved', 'error'
  const [quizStats, setQuizStats] = useState(() => {
    try {
      const saved = localStorage.getItem('fm-quiz-stats');
      return saved ? JSON.parse(saved) : { totalQuizzes: 0, highAccuracy: 0, totalXp: 0 };
    } catch {
      return { totalQuizzes: 0, highAccuracy: 0, totalXp: 0 };
    }
  });

  // Support quick-launch via query params or navigation state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const autoTopic = params.get('topic');
    if (autoTopic && TOPICS.some((t) => t.id === autoTopic)) {
      setSelectedTopic(autoTopic);
    }
  }, [location.search]);

  // Active question
  const currentQuestion = questions[currentIndex] || null;

  // Start generating quiz
  function handleStartQuiz() {
    const generated = generateRandomQuiz({
      topic: selectedTopic,
      difficulty: selectedDifficulty,
      grade: selectedGrade === 'all' ? null : Number(selectedGrade),
      count: questionCount,
    });

    if (!generated || generated.length === 0) {
      alert('No questions found for this combination. Try selecting All Topics or Mixed Difficulty.');
      return;
    }

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setUserAnswers([]);
    setStreak(0);
    setMaxStreak(0);
    setPointsAwarded(0);
    setSyncStatus('');
    setTotalTimeElapsed(0);
    setTimeLeft(quizMode === 'timed' ? 25 : 0);
    setStage('playing');
  }

  // Timer countdown for Timed mode
  useEffect(() => {
    if (stage !== 'playing') return;

    const interval = setInterval(() => {
      setTotalTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'playing' || quizMode !== 'timed' || isAnswerRevealed) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [stage, currentIndex, quizMode, isAnswerRevealed]);

  function handleTimeExpired() {
    if (selectedOption === null) {
      // Auto-submit unanswered
      handleSelectOption(-1, true);
    }
  }

  // Select an option
  function handleSelectOption(optionIndex, timedOut = false) {
    if (isAnswerRevealed) return;

    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOption(optionIndex);
    setIsAnswerRevealed(true);

    const isCorrect = optionIndex === currentQuestion.correctIndex;

    const answerRecord = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      code: currentQuestion.code,
      options: currentQuestion.options,
      correctIndex: currentQuestion.correctIndex,
      selectedIndex: optionIndex,
      isCorrect,
      explanation: currentQuestion.explanation,
      timedOut,
    };

    setUserAnswers((prev) => [...prev, answerRecord]);

    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
    } else {
      setStreak(0);
    }

    // In timed mode, automatically advance after a short pause (1.2s)
    if (quizMode === 'timed') {
      setTimeout(() => {
        advanceNext(currentIndex + 1, [...userAnswers, answerRecord]);
      }, 1200);
    }
  }

  // Move to next question or complete
  function advanceNext(nextIdx, currentAnswers = userAnswers) {
    if (nextIdx < questions.length) {
      setCurrentIndex(nextIdx);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setTimeLeft(25);
    } else {
      finishQuiz(currentAnswers);
    }
  }

  // Finish quiz & calculate points
  async function finishQuiz(finalAnswers) {
    setStage('results');

    const correctCount = finalAnswers.filter((a) => a.isCorrect).length;
    const accuracy = Math.round((correctCount / questions.length) * 100);

    // Points logic: +10 XP per correct, +15 XP for completing, +5 bonus if accuracy >= 80%
    const baseXP = correctCount * 10;
    const completionBonus = 15;
    const masteryBonus = accuracy >= 80 ? 10 : 0;
    const totalXP = baseXP + completionBonus + masteryBonus;

    setPointsAwarded(totalXP);

    // Update local stats
    const updatedStats = {
      totalQuizzes: quizStats.totalQuizzes + 1,
      highAccuracy: Math.max(quizStats.highAccuracy, accuracy),
      totalXp: quizStats.totalXp + totalXP,
    };
    setQuizStats(updatedStats);
    localStorage.setItem('fm-quiz-stats', JSON.stringify(updatedStats));

    // Award points to backend & update auth context
    if (token && totalXP > 0) {
      setSyncStatus('saving');
      try {
        const res = await api.addPoints(totalXP, token);
        if (res?.user) {
          updateUser(res.user);
        }
        setSyncStatus('saved');
      } catch (err) {
        console.error('Failed to sync quiz points:', err);
        setSyncStatus('error');
      }
    }
  }

  // Format seconds mm:ss
  function formatDuration(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  return (
    <section className="portal-page quiz-page">
      <div className="container">
        {/* Back Link */}
        <Link to="/student/dashboard" className="portal-back">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        {/* ============================================================ */}
        {/* STAGE 1: QUIZ GENERATOR SETUP                                */}
        {/* ============================================================ */}
        {stage === 'setup' && (
          <div className="quiz-setup">
            <div className="portal-header">
              <div>
                <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>
                  <Sparkles size={13} style={{ marginRight: '4px' }} /> Smart Quiz Generator
                </span>
                <h1 className="portal-title">Random AI &amp; Code Quiz</h1>
                <p className="portal-sub">
                  Generate on-demand randomized quizzes to master AI, Python, Robotics, and Computational Logic.
                </p>
              </div>

              {/* Stats Bar */}
              <div className="quiz-stats-badge-wrap">
                <div className="quiz-stat-pill">
                  <Trophy size={16} className="text-amber" />
                  <span>{quizStats.totalQuizzes} Quizzes Taken</span>
                </div>
                <div className="quiz-stat-pill">
                  <Zap size={16} className="text-amber" />
                  <span>{quizStats.totalXp} XP Earned</span>
                </div>
              </div>
            </div>

            <div className="quiz-setup__card">
              {/* 1. SELECT TOPIC */}
              <div className="quiz-setup__section">
                <h2 className="quiz-setup__label">
                  <span className="quiz-setup__step">1</span> Choose a Topic
                </h2>
                <div className="quiz-topic-grid">
                  {TOPICS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`quiz-topic-btn ${selectedTopic === t.id ? 'is-active' : ''}`}
                      onClick={() => setSelectedTopic(t.id)}
                    >
                      <span className="quiz-topic-icon">{t.icon}</span>
                      <span className="quiz-topic-text">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. SELECT GRADE LEVEL / CURRICULUM */}
              <div className="quiz-setup__section">
                <div className="quiz-setup__header-row">
                  <h2 className="quiz-setup__label">
                    <span className="quiz-setup__step">2</span> Grade Level &amp; Difficulty
                  </h2>
                  {user?.grade && (
                    <span className="portal-badge portal-badge--blue">
                      Enrolled: Grade {user.grade}
                    </span>
                  )}
                </div>

                <div className="quiz-pills">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className={`quiz-pill-btn ${
                        selectedDifficulty === d.id && selectedGrade === 'all' ? 'is-active' : ''
                      }`}
                      onClick={() => {
                        setSelectedDifficulty(d.id);
                        setSelectedGrade('all');
                      }}
                    >
                      <strong>{d.label}</strong>
                      <span className="quiz-pill-sub">{d.gradeRange}</span>
                    </button>
                  ))}
                </div>

                {/* Specific Grade Selector Chips */}
                <div className="quiz-specific-grades">
                  <span className="quiz-specific-grades__label">Or target your exact grade:</span>
                  <div className="quiz-grade-chips">
                    <button
                      type="button"
                      className={`quiz-grade-chip ${selectedGrade === 'all' ? 'is-active' : ''}`}
                      onClick={() => setSelectedGrade('all')}
                    >
                      All Grades
                    </button>
                    {[3, 4, 5, 6, 7, 8, 9].map((g) => {
                      const isUserGrade = user?.grade === g;
                      const isSelected = selectedGrade !== 'all' && Number(selectedGrade) === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          className={`quiz-grade-chip ${isSelected ? 'is-active' : ''} ${
                            isUserGrade ? 'is-enrolled-grade' : ''
                          }`}
                          onClick={() => {
                            setSelectedGrade(g);
                            if (g <= 5) setSelectedDifficulty('beginner');
                            else if (g <= 8) setSelectedDifficulty('intermediate');
                            else setSelectedDifficulty('advanced');
                          }}
                        >
                          Grade {g}
                          {isUserGrade && <span className="quiz-user-badge">You</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. QUESTION COUNT & MODE */}
              <div className="quiz-setup__row">
                <div className="quiz-setup__col">
                  <h2 className="quiz-setup__label">
                    <span className="quiz-setup__step">3</span> Question Count
                  </h2>
                  <div className="quiz-counts">
                    {[5, 10, 15].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        className={`quiz-count-btn ${questionCount === cnt ? 'is-active' : ''}`}
                        onClick={() => setQuestionCount(cnt)}
                      >
                        {cnt} Questions
                      </button>
                    ))}
                  </div>
                </div>

                <div className="quiz-setup__col">
                  <h2 className="quiz-setup__label">
                    <span className="quiz-setup__step">4</span> Quiz Mode
                  </h2>
                  <div className="quiz-counts">
                    <button
                      type="button"
                      className={`quiz-count-btn ${quizMode === 'practice' ? 'is-active' : ''}`}
                      onClick={() => setQuizMode('practice')}
                    >
                      💡 Practice (Instant Explanations)
                    </button>
                    <button
                      type="button"
                      className={`quiz-count-btn ${quizMode === 'timed' ? 'is-active' : ''}`}
                      onClick={() => setQuizMode('timed')}
                    >
                      ⏱️ Timed Sprint (25s per question)
                    </button>
                  </div>
                </div>
              </div>

              {/* ACTION CTA */}
              <div className="quiz-setup__actions">
                <button
                  type="button"
                  className="btn btn--primary btn--shadow quiz-start-btn"
                  onClick={handleStartQuiz}
                >
                  <Sparkles size={18} /> Generate Random Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 2: ACTIVE QUIZ PLAYER                                  */}
        {/* ============================================================ */}
        {stage === 'playing' && currentQuestion && (
          <div className="quiz-player">
            {/* Top Info Bar */}
            <div className="quiz-player__header">
              <div className="quiz-player__meta">
                <span className="portal-badge portal-badge--amber">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="portal-badge portal-badge--blue">
                  {TOPICS.find((t) => t.id === currentQuestion.topic)?.label || 'General'}
                </span>
                <span className="portal-badge portal-badge--muted">
                  {currentQuestion.difficulty.toUpperCase()}
                </span>
              </div>

              <div className="quiz-player__controls">
                {streak > 1 && (
                  <span className="quiz-streak">
                    <Flame size={16} className="text-amber animate-pulse-glow" />
                    {streak} in a row!
                  </span>
                )}
                {quizMode === 'timed' && (
                  <div className={`quiz-timer ${timeLeft <= 5 ? 'is-urgent' : ''}`}>
                    <Clock size={16} />
                    <span>{timeLeft}s</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="quiz-progress-track">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="quiz-card">
              <h2 className="quiz-card__question">{currentQuestion.question}</h2>

              {/* Code Snippet if applicable */}
              {currentQuestion.code && (
                <div className="quiz-code-box">
                  <div className="quiz-code-header">
                    <span>Python Code</span>
                  </div>
                  <pre>
                    <code>{currentQuestion.code}</code>
                  </pre>
                </div>
              )}

              {/* Options Grid */}
              <div className="quiz-options-list">
                {currentQuestion.options.map((optionText, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === currentQuestion.correctIndex;

                  let optClass = 'quiz-option';
                  if (isAnswerRevealed) {
                    if (isCorrect) optClass += ' is-correct';
                    else if (isSelected) optClass += ' is-wrong';
                    else optClass += ' is-faded';
                  } else if (isSelected) {
                    optClass += ' is-selected';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      className={optClass}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isAnswerRevealed}
                    >
                      <span className="quiz-option__letter">{letter}</span>
                      <span className="quiz-option__text">{optionText}</span>
                      {isAnswerRevealed && isCorrect && (
                        <CheckCircle2 size={18} className="quiz-option__icon text-green" />
                      )}
                      {isAnswerRevealed && isSelected && !isCorrect && (
                        <XCircle size={18} className="quiz-option__icon text-red" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Step Banner (Practice Mode) */}
              {isAnswerRevealed && (
                <div
                  className={`quiz-feedback-banner ${
                    selectedOption === currentQuestion.correctIndex ? 'is-correct' : 'is-wrong'
                  }`}
                >
                  <div className="quiz-feedback-header">
                    {selectedOption === currentQuestion.correctIndex ? (
                      <>
                        <CheckCircle2 size={20} className="text-green" />
                        <strong>Spot on! Correct answer (+10 XP)</strong>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={20} className="text-red" />
                        <strong>Not quite! Let's learn why:</strong>
                      </>
                    )}
                  </div>
                  <p className="quiz-feedback-text">{currentQuestion.explanation}</p>

                  <button
                    type="button"
                    className="btn btn--primary quiz-next-btn"
                    onClick={() => advanceNext(currentIndex + 1)}
                  >
                    {currentIndex === questions.length - 1 ? 'View Final Results' : 'Next Question'}{' '}
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 3: RESULTS & REVIEW                                    */}
        {/* ============================================================ */}
        {stage === 'results' && (
          <div className="quiz-results">
            {/* Celebration Header */}
            <div className="quiz-results__hero">
              <div className="quiz-trophy-circle">
                <Trophy size={48} className="text-amber" />
              </div>
              <h1 className="quiz-results__title">Quiz Completed!</h1>
              <p className="quiz-results__sub">
                {(() => {
                  const correct = userAnswers.filter((a) => a.isCorrect).length;
                  const pct = Math.round((correct / questions.length) * 100);
                  if (pct === 100) return '🏆 Perfect Score! You are an AI & Tech Master!';
                  if (pct >= 80) return '🌟 Outstanding performance! Keep up the brilliant momentum!';
                  if (pct >= 60) return '👏 Great effort! You are making steady progress!';
                  return '💪 Good practice session! Review the explanations below and try again!';
                })()}
              </p>

              {/* Points Earned Banner */}
              <div className="quiz-xp-badge">
                <Sparkles size={20} className="text-amber" />
                <span>+{pointsAwarded} XP Earned</span>
                {syncStatus === 'saved' && (
                  <span className="quiz-xp-status">✓ Added to your profile</span>
                )}
                {syncStatus === 'saving' && (
                  <span className="quiz-xp-status">Saving to profile…</span>
                )}
              </div>
            </div>

            {/* Score Metrics Grid */}
            <div className="quiz-metrics-grid">
              <div className="quiz-metric-card">
                <span className="quiz-metric-val">
                  {userAnswers.filter((a) => a.isCorrect).length} / {questions.length}
                </span>
                <span className="quiz-metric-label">Correct Answers</span>
              </div>
              <div className="quiz-metric-card">
                <span className="quiz-metric-val">
                  {Math.round(
                    (userAnswers.filter((a) => a.isCorrect).length / questions.length) * 100
                  )}
                  %
                </span>
                <span className="quiz-metric-label">Accuracy</span>
              </div>
              <div className="quiz-metric-card">
                <span className="quiz-metric-val">{maxStreak}</span>
                <span className="quiz-metric-label">Best Streak</span>
              </div>
              <div className="quiz-metric-card">
                <span className="quiz-metric-val">{formatDuration(totalTimeElapsed)}</span>
                <span className="quiz-metric-label">Time Spent</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="quiz-results__actions">
              <button
                type="button"
                className="btn btn--primary btn--shadow"
                onClick={() => setStage('setup')}
              >
                <Sparkles size={16} /> Generate New Quiz
              </button>
              <button
                type="button"
                className="btn btn--outline"
                onClick={handleStartQuiz}
              >
                <RotateCcw size={16} /> Retake Same Quiz
              </button>
              <Link to="/student/dashboard" className="btn btn--outline">
                Dashboard
              </Link>
            </div>

            {/* Detailed Question Review */}
            <div className="quiz-review">
              <h2 className="quiz-review__title">Question by Question Review</h2>
              <div className="quiz-review-list">
                {userAnswers.map((item, idx) => (
                  <div
                    key={idx}
                    className={`quiz-review-item ${item.isCorrect ? 'is-correct' : 'is-wrong'}`}
                  >
                    <div className="quiz-review-top">
                      <span className="quiz-review-number">#{idx + 1}</span>
                      <span className="quiz-review-status">
                        {item.isCorrect ? (
                          <>
                            <CheckCircle2 size={16} /> Correct
                          </>
                        ) : (
                          <>
                            <XCircle size={16} /> Incorrect
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="quiz-review-question">{item.question}</h3>

                    {item.code && (
                      <pre className="quiz-review-code">
                        <code>{item.code}</code>
                      </pre>
                    )}

                    <div className="quiz-review-answers">
                      <div className="quiz-review-answer-row">
                        <span className="quiz-review-tag">Your Answer:</span>
                        <span className={item.isCorrect ? 'text-green' : 'text-red'}>
                          {item.selectedIndex >= 0
                            ? item.options[item.selectedIndex]
                            : 'Timed out / Unanswered'}
                        </span>
                      </div>
                      {!item.isCorrect && (
                        <div className="quiz-review-answer-row">
                          <span className="quiz-review-tag">Correct Answer:</span>
                          <span className="text-green font-semibold">
                            {item.options[item.correctIndex]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="quiz-review-explanation">
                      <strong>Explanation: </strong> {item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
