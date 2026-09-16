import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, Rocket, Clock, MapPin, Check, BookOpen, Trophy, ArrowRight } from 'lucide-react'
import GradeLadder from '../components/GradeLadder.jsx'
import LeaderboardPreview from '../components/LeaderboardPreview.jsx'
import ImageCarousel from '../components/ImageCarousel.jsx'
import './Home.css'
import './Programs.css'

// ─── Course card data ──────────────────────────────────────
const courseCards = [
  {
    id: 'ai-explorer',
    grade: 'Grades 3 – 5',
    name: 'AI Explorer Program',
    tagline: 'Where Curiosity Meets Technology',
    text: 'Fun and interactive sessions introducing foundational computing and AI concepts through games, stories, logic puzzles, and hands-on activities.',
    badge: 'Beginner',
    Icon: Gamepad2,
    duration: '12 Sessions',
    format: 'In-School',
    accent: 'amber',
    features: [
      'Foundational Computer Skills',
      'Digital Art & Scratch Coding',
      'Discovering AI & Responsible Use',
      'Capstone Showcase Project',
    ],
  },
  {
    id: 'young-innovators',
    grade: 'Grades 6 – 8',
    name: 'Young Innovators AI',
    tagline: 'Build Real Solutions with AI',
    text: 'Dive deeper into hardware, algorithms, Python, web development, and AI — building innovative solutions using modern tools and platforms.',
    badge: 'Intermediate',
    Icon: Rocket,
    duration: '16 Sessions',
    format: 'In-School',
    accent: 'indigo',
    features: [
      'Python Programming & Algorithms',
      'Web Development with HTML5',
      'AI, Machine Learning & Cybersecurity',
      'Young Innovators Showcase',
    ],
  },
]

// ─── "How each session works" ──────────────────────────────
const sessionSteps = [
  {
    n: '01',
    emoji: '📖',
    title: 'Learn',
    text: 'A short lesson with 2–4 topics, plain-language bullets, and a "Did you know?" fact that ties it to the real world.',
  },
  {
    n: '02',
    emoji: '✏️',
    title: 'Do the Assignment',
    text: '3 multiple-choice questions at the end of every session. Instant feedback with explanations for every answer.',
  },
  {
    n: '03',
    emoji: '🏆',
    title: 'Climb the Leaderboard',
    text: 'Your score saves immediately. Retakes only improve your best — you can never lose points by trying again.',
  },
]

// ─── Stats ─────────────────────────────────────────────────
const stats = [
  { value: '500+', label: 'Students Trained', icon: '🎓' },
  { value: '20+', label: 'School Workshops', icon: '🏫' },
  { value: '100%', label: 'Practical Hands-on', icon: '⚡' },
  { value: '100%', label: 'School Satisfaction', icon: '⭐' },
]

const trustPoints = [
  'Age-Appropriate Content',
  'Activity-Based Learning',
  'Ethical AI Education',
  'Customized School Modules',
]

// ─── Hero code tabs (existing concept, updated copy) ───────
const heroTabs = [
  {
    id: 'logic',
    label: 'AI Logic & Games',
    code: "// AI Explorer Module (Grades 3-5)\nconst aiBot = new AIStudent();\naiBot.learn(\"Machine Learning Logic\");\naiBot.play(\"Pattern Match Game\");\nconsole.log(\"Status: Interactive Session Ready!\");",
    level: 'Grades 3 – 5',
  },
  {
    id: 'code',
    label: 'Python & Web Dev',
    code: "# Young Innovators Module (Grades 6-8)\nimport tensorflow as tf\nmodel = tf.keras.models.Sequential()\nmodel.add(tf.keras.layers.Dense(128, activation=\"relu\"))\nprint(\"Status: Model Compiled\")",
    level: 'Grades 6 – 8',
  },
  {
    id: 'faculty',
    label: 'Educator Tools',
    code: "<!-- AI Educator Toolkit -->\n<LessonPlanner topic=\"AI Ethics & Safety\" />\n<AutoQuizGenerator difficulty=\"adaptive\" />\n<StudentAnalytics liveTracking={true} />",
    level: 'Faculty Workshops',
  },
]

export default function Home() {
  const [activeTabIdx, setActiveTabIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % heroTabs.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.anim').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const currentTab = heroTabs[activeTabIdx]

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero__glow-orb hero__glow-orb--amber" />
        <div className="hero__glow-orb hero__glow-orb--indigo" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <div className="hero__badge">
              <span className="hero__badge-pulse" />
              <span>Grade 1 – 9 Computing & AI Curriculum</span>
            </div>
            <h1 className="hero__heading">
              One Connected Curriculum, <span className="gradient-text">Grade 1 to 9</span>
            </h1>
            <p className="hero__sub">
              A complete K-9 learning ladder in computing, programming, and AI — from playful beginners to confident young innovators.
            </p>
            <ul className="hero__checks">
              <li><span className="check-icon">✓</span> Real Lessons & Quizzes</li>
              <li><span className="check-icon">✓</span> Live Leaderboard</li>
              <li><span className="check-icon">✓</span> Try Before You Commit</li>
            </ul>
            <div className="hero__ctas">
              <Link to="/preview/ai-explorer" className="btn btn--primary btn--shadow">
                Try AI Explorer (3–5) →
              </Link>
              <Link to="/preview/young-innovators" className="btn btn--outline">
                Try Young Innovators (6–8)
              </Link>
            </div>
          </div>
          <div className="hero__media">
            <div className="hero__dashboard hero__dashboard--large">
              <div className="hero__dashboard-header">
                <div className="hero__dashboard-dots">
                  <span className="dot dot--red" />
                  <span className="dot dot--yellow" />
                  <span className="dot dot--green" />
                </div>
                <div className="hero__dashboard-tabs">
                  {heroTabs.map((t, idx) => (
                    <button
                      key={t.id}
                      className={`hero__tab ${idx === activeTabIdx ? 'hero__tab--active' : ''}`}
                      onClick={() => setActiveTabIdx(idx)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hero__dashboard-body">
                <div className="hero__dashboard-top-row">
                  <span className="hero__dashboard-badge">{currentTab.level}</span>
                  <span className="hero__live-tag">● Live Session Active</span>
                </div>
                <pre className="hero__code-block hero__code-block--large">
                  <code>{currentTab.code}</code>
                </pre>
              </div>
              <div className="hero__dashboard-footer">
                <div className="hero__stat-pill"><span className="stat-dot" /><span>500+ Active Students</span></div>
                <div className="hero__stat-pill hero__stat-pill--amber"><span>⚡ 28 Interactive Sessions</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. GRADE LADDER
      ═══════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section__header anim">
            <span className="eyebrow">The Learning Ladder</span>
            <h2 className="section__title">From Grade 1 to Grade 9</h2>
            <p className="section__sub">
              Nine rungs, one continuous path. Your child levels up in computing, programming, and AI as they grow.
            </p>
          </div>
          <div className="anim anim--delay-1">
            <GradeLadder />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. COURSE CARDS
      ═══════════════════════════════════════════════════════ */}
      <section className="section section--soft" id="courses">
        <div className="container">
          <div className="section__header anim">
            <span className="eyebrow">Available Courses</span>
            <h2 className="section__title">Start Learning Today</h2>
            <p className="section__sub">
              Two built-out courses with real lessons, graded assignments, and a live leaderboard — try them now.
            </p>
          </div>
          <div className="home-courses-grid">
            {courseCards.map((p, index) => (
              <div
                className={`prog-grid-card anim anim--delay-${index % 3}`}
                key={p.id}
              >
                <div className="prog-grid-card__header">
                  <div className={`prog-grid-card__icon-wrap prog-grid-card__icon-wrap--${p.accent}`}>
                    <p.Icon strokeWidth={2.5} size={22} />
                  </div>
                  <div className="prog-grid-card__badges">
                    <span className="prog-grid-card__grade">{p.grade}</span>
                    <span className="prog-grid-card__badge">{p.badge}</span>
                  </div>
                </div>
                <div className="prog-grid-card__content">
                  <h2 className="prog-grid-card__name">{p.name}</h2>
                  <p className="prog-grid-card__tagline">{p.tagline}</p>
                  <p className="prog-grid-card__text">{p.text}</p>
                  <div className="prog-grid-card__meta-pills">
                    <span className="meta-pill"><Clock size={13} strokeWidth={2.5} /> {p.duration}</span>
                    <span className="meta-pill"><MapPin size={13} strokeWidth={2.5} /> {p.format}</span>
                  </div>
                </div>
                <hr className="prog-grid-card__divider" />
                <div className="prog-grid-card__features-wrap">
                  <h3 className="prog-grid-card__features-title">What you'll learn</h3>
                  <ul className="prog-grid-card__features">
                    {p.features.map((f, i) => (
                      <li key={i} className="prog-grid-card__feature-item">
                        <Check className="prog-grid-card__check" size={16} strokeWidth={3} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="prog-grid-card__actions prog-grid-card__actions--two">
                  <Link to={`/preview/${p.id}`} className="btn btn--primary btn--full">
                    <BookOpen size={16} /> Preview Course
                  </Link>
                  <Link to="/contact" className="btn btn--outline btn--full">
                    Book Demo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. HOW EACH SESSION WORKS
      ═══════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section__header anim">
            <span className="eyebrow">Every Session, Same Rhythm</span>
            <h2 className="section__title">How Each Session Works</h2>
            <p className="section__sub">
              15–25 minutes of learning + a 5-minute graded assignment, matching a single class period.
            </p>
          </div>
          <div className="process-track">
            {sessionSteps.map((s, i) => (
              <div className={`process-step anim anim--delay-${i}`} key={s.n}>
                <div className="process-step__circle">{s.emoji}</div>
                <div className="process-step__content">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. LEADERBOARD PREVIEW
      ═══════════════════════════════════════════════════════ */}
      <section className="section section--soft">
        <div className="container">
          <div className="section__header anim">
            <span className="eyebrow">Live Rankings</span>
            <h2 className="section__title">Top Students</h2>
            <p className="section__sub">
              Scores update the moment a student submits an assignment — no page reload needed.
            </p>
          </div>
          <div className="home-lb-wrap anim anim--delay-1">
            <LeaderboardPreview />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SESSIONS CAROUSEL (existing)
      ═══════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section__header anim">
            <span className="eyebrow">Interactive Modules</span>
            <h2 className="section__title">A Glimpse Into Our Sessions</h2>
            <p className="section__sub">Live, structured sessions designed to make AI tangible, exciting, and relevant.</p>
          </div>
          <div className="anim anim--delay-1"><ImageCarousel /></div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section__header anim">
            <span className="eyebrow">Track Record</span>
            <h2 className="section__title">Why Schools Partner With Us</h2>
          </div>
          <div className="stats-section-inner anim anim--delay-1">
            <div className="stats-row">
              {stats.map((s, i) => (
                <div className={`stat-block anim anim--delay-${i}`} key={s.label}>
                  <span className="stat-block__icon">{s.icon}</span>
                  <span className="stat-block__value">{s.value}</span>
                  <span className="stat-block__label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="trust-bar anim anim--delay-1">
              {trustPoints.map((t) => (
                <span className="trust-pill" key={t}><span className="trust-check">✓</span>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-section__glow cta-section__glow--left" />
        <div className="cta-section__glow cta-section__glow--right" />
        <div className="container cta-section__inner anim">
          <span className="eyebrow">Get Started Today</span>
          <h2>Ready to Introduce AI Education in Your School?</h2>
          <p>Join forward-thinking schools preparing students for the digital future.</p>
          <Link to="/contact" className="btn btn--primary btn--shadow">Book a Free Demo Session →</Link>
        </div>
      </section>
    </>
  )
}
