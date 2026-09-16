import './StudentAssignments.css';

import {
  ArrowLeft,
  ClipboardList,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder data until the backend exposes a real assignments endpoint.
const assignments = [
  {
    id: 1,
    title: 'Build a chatbot with if/else logic',
    course: 'Python for Young Coders',
    due: 'Aug 18, 2026',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Quiz: Neural network basics',
    course: 'AI Foundations for Beginners',
    due: 'Aug 15, 2026',
    status: 'submitted',
  },
  {
    id: 3,
    title: 'Design a maze-solving robot on paper',
    course: 'Intro to Robotics',
    due: 'Aug 5, 2026',
    status: 'graded',
    grade: '9/10',
  },
];

const statusMap = {
  pending: { label: 'Pending', className: 'portal-badge--amber' },
  submitted: { label: 'Submitted', className: 'portal-badge--blue' },
  graded: { label: 'Graded', className: 'portal-badge--green' },
};

export default function StudentAssignments() {
  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/student/dashboard" className="portal-back">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <div className="portal-header">
          <div>
            <h1 className="portal-title">Assignments</h1>
            <p className="portal-sub">{assignments.length} assignments across your courses</p>
          </div>
        </div>

        {assignments.length === 0 ? (
          <p className="portal-empty">No assignments right now &mdash; check back soon.</p>
        ) : (
          <div className="portal-grid">
            {assignments.map((a) => {
              const status = statusMap[a.status];
              return (
                <div key={a.id} className="portal-card">
                  <div className="portal-card__top">
                    <div className="portal-card__icon">
                      <ClipboardList size={20} />
                    </div>
                    <span className={`portal-badge ${status.className}`}>{status.label}</span>
                  </div>
                  <div className="portal-card__title">{a.title}</div>
                  <div className="portal-card__meta">{a.course}</div>
                  <div className="portal-card__text">
                    <Clock size={14} style={{ verticalAlign: '-2px', marginRight: '4px' }} />
                    Due {a.due}
                    {a.grade && <> &middot; Grade: {a.grade}</>}
                  </div>
                  <div className="portal-card__footer">
                    <button type="button" className="portal-btn">
                      {a.status === 'pending' ? 'Start' : 'View details'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}