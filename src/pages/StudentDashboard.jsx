import './StudentDashboard.css';

import {
  Award,
  BookOpen,
  ClipboardList,
  Code2,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import MyGradesPanel from '../components/MyGradesPanel.jsx';

const navItems = [
  {
    to: '/student/quiz',
    label: 'Quiz Generator',
    sub: 'AI & code challenges',
    icon: Sparkles,
    badge: 'NEW',
    featured: true,
  },
  {
    to: '/student/courses',
    label: 'Courses',
    sub: 'Continue learning',
    icon: BookOpen,
  },
  {
    to: '/student/assignments',
    label: 'Assignments',
    sub: 'Track what\u2019s due',
    icon: ClipboardList,
  },
  {
    to: '/student/code-portal',
    label: 'Code Portal',
    sub: 'Practice & challenges',
    icon: Code2,
  },
  {
    to: '/student/group-projects',
    label: 'Group Projects',
    sub: 'Team workspaces',
    icon: Users,
  },
  {
    to: '/student/leaderboard',
    label: 'Leaderboard',
    sub: 'See where you rank',
    icon: Trophy,
  },
  {
    to: '/student/certifications',
    label: 'Certifications',
    sub: 'Earned & available',
    icon: Award,
  },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const initials = (user?.name || '?')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <section className="portal-page">
      <div className="container">
        <div className="sd-profile">
          {user?.profilePicture ? (
            <img src={user.profilePicture} alt="" className="sd-avatar" />
          ) : (
            <div className="sd-avatar sd-avatar--fallback">{initials}</div>
          )}
          <div>
            <h1 className="sd-name">{user?.name}</h1>
            <div className="sd-meta-row">
              {user?.grade && <span className="portal-badge portal-badge--blue">Grade {user.grade}</span>}
              <span className="portal-badge portal-badge--amber">{user?.points ?? 0} points</span>
            </div>
          </div>
        </div>

        {/* Featured Quiz Challenge Hero Banner */}
        <div className="sd-challenge-banner">
          <div className="sd-challenge-banner__content">
            <div className="sd-challenge-tag">
              <Sparkles size={14} /> Quick AI Challenge
            </div>
            <h2 className="sd-challenge-title">Random Quiz Generator</h2>
            <p className="sd-challenge-desc">
              Generate on-demand quizzes tailored to your grade across AI, Python, Robotics, and Logic. Earn XP with every correct answer!
            </p>
            <div className="sd-challenge-actions">
              <Link to="/student/quiz" className="btn btn--primary btn--shadow">
                <Sparkles size={16} /> Start Random Quiz →
              </Link>
              <Link to="/student/quiz?topic=python" className="btn btn--outline">
                🐍 Python Sprint
              </Link>
            </div>
          </div>
          <div className="sd-challenge-banner__visual">
            <div className="sd-challenge-badge-orbit">
              <span className="sd-orbit-icon">🎯</span>
              <div className="sd-orbit-pill">
                <strong>+10 XP</strong>
                <span>per correct</span>
              </div>
            </div>
          </div>
        </div>

        <div className="portal-header">
          <div>
            <h2 className="portal-title">Your dashboard</h2>
            <p className="portal-sub">Jump back into your courses, quizzes, and progress.</p>
          </div>
        </div>

        <div className="sd-nav-grid">
          {navItems.map(({ to, label, sub, icon: Icon, badge, featured }) => (
            <Link
              key={to}
              to={to}
              className={`sd-nav-card ${featured ? 'sd-nav-card--featured' : ''}`}
            >
              <div className="sd-nav-card__top-row">
                <div className="sd-nav-card__icon">
                  <Icon size={20} />
                </div>
                {badge && (
                  <span className="portal-badge portal-badge--amber sd-nav-card__badge">
                    {badge}
                  </span>
                )}
              </div>
              <div>
                <div className="sd-nav-card__label">{label}</div>
                <div className="sd-nav-card__sub">{sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Academic Grades & Assessment Report */}
        <MyGradesPanel />
      </div>
    </section>
  );
}