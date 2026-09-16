import './StudentGroupProjects.css';

import {
  ArrowLeft,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder data until the backend exposes a real group-projects endpoint.
const projects = [
  {
    id: 1,
    title: 'Weather Prediction Mini-App',
    team: ['Aarav', 'Diya', 'You'],
    status: 'In progress',
    statusClass: 'portal-badge--amber',
  },
  {
    id: 2,
    title: 'School Library Chatbot',
    team: ['Ishaan', 'Meera', 'You', 'Kabir'],
    status: 'Awaiting review',
    statusClass: 'portal-badge--blue',
  },
  {
    id: 3,
    title: 'Recycling Sorter Robot Concept',
    team: ['You', 'Ananya'],
    status: 'Completed',
    statusClass: 'portal-badge--green',
  },
];

export default function GroupProjects() {
  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/student/dashboard" className="portal-back">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <div className="portal-header">
          <div>
            <h1 className="portal-title">Group Projects</h1>
            <p className="portal-sub">Team up and build something together</p>
          </div>
        </div>

        <div className="portal-grid">
          {projects.map((p) => (
            <div key={p.id} className="portal-card">
              <div className="portal-card__top">
                <div className="portal-card__icon">
                  <Users size={20} />
                </div>
                <span className={`portal-badge ${p.statusClass}`}>{p.status}</span>
              </div>
              <div className="portal-card__title">{p.title}</div>
              <div className="portal-card__meta">Team: {p.team.join(', ')}</div>
              <div className="portal-card__footer">
                <button type="button" className="portal-btn">Open workspace</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}