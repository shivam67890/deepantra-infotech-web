import './StudentCertifications.css';

import {
  ArrowLeft,
  Award,
  Download,
  Lock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder data until the backend exposes a real certifications endpoint.
const certifications = [
  {
    id: 1,
    title: 'Intro to Robotics — Completion',
    earned: true,
    date: 'Aug 2, 2026',
  },
  {
    id: 2,
    title: 'AI Foundations for Beginners',
    earned: false,
    requirement: 'Finish all 18 lessons (72% done)',
  },
  {
    id: 3,
    title: 'Python for Young Coders',
    earned: false,
    requirement: 'Finish all 20 lessons (45% done)',
  },
];

export default function Certifications() {
  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/student/dashboard" className="portal-back">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <div className="portal-header">
          <div>
            <h1 className="portal-title">Certifications</h1>
            <p className="portal-sub">
              {certifications.filter((c) => c.earned).length} earned &middot; {certifications.length} total
            </p>
          </div>
        </div>

        <div className="portal-grid">
          {certifications.map((c) => (
            <div key={c.id} className="portal-card">
              <div className="portal-card__top">
                <div className="portal-card__icon">
                  {c.earned ? <Award size={20} /> : <Lock size={20} />}
                </div>
                <span className={`portal-badge ${c.earned ? 'portal-badge--green' : 'portal-badge--muted'}`}>
                  {c.earned ? 'Earned' : 'Locked'}
                </span>
              </div>
              <div className="portal-card__title">{c.title}</div>
              <div className="portal-card__meta">
                {c.earned ? `Issued ${c.date}` : c.requirement}
              </div>
              <div className="portal-card__footer">
                <button type="button" className="portal-btn" disabled={!c.earned}>
                  <Download size={16} />
                  {c.earned ? 'Download PDF' : 'Not yet available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}