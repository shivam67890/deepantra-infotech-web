import './StudentLeaderboard.css';

import { useEffect, useState } from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Leaderboard() {
  const { user, token } = useAuth();
  const [rankings, setRankings] = useState([]);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [lbRes, histRes, skillRes] = await Promise.all([
          api.getRealLeaderboard(token).catch(() => ({ rankings: [] })),
          api.getScoreHistory(token).catch(() => ({ entries: [] })),
          api.getSkillBreakdown(token).catch(() => ({ skills: [] })),
        ]);
        setRankings(lbRes.rankings || []);
        setScoreHistory(histRes.entries || []);
        setSkills(skillRes.skills || []);
      } catch { /* silent */ }
      finally { setLoading(false); }
    }
    if (token) load();
  }, [token]);

  // Top 10 bar chart data
  const top10 = rankings.slice(0, 10).map((r, i) => ({
    name: r.name?.split(' ')[0] || `#${i + 1}`,
    xp: r.points || 0,
  }));

  // Score over time line chart
  const lineData = scoreHistory.map((e) => ({
    date: e.date,
    score: e.totalXpAtDate || 0,
  }));

  // Calendar heatmap values — aggregate by date
  const heatmapValues = scoreHistory.reduce((acc, e) => {
    const existing = acc.find((a) => a.date === e.date);
    if (existing) existing.count += 1;
    else acc.push({ date: e.date, count: 1 });
    return acc;
  }, []);

  // Date range for heatmap (last 6 months)
  const today = new Date();
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  // Find current user rank
  const myRank = rankings.findIndex((r) => r._id === user?.id) + 1;

  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/student/dashboard" className="portal-back">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <div className="portal-header">
          <div>
            <h1 className="portal-title">Leaderboard</h1>
            <p className="portal-sub">
              {myRank > 0 ? `You're ranked #${myRank}` : 'Top students by XP'}
            </p>
          </div>
        </div>

        {loading ? (
          <p className="portal-empty">Loading…</p>
        ) : (
          <>
            {/* ── Charts Row ── */}
            <div className="lb-charts-grid">
              {/* Top 10 Bar */}
              {top10.length > 0 && (
                <div className="lb-chart-card">
                  <h3 className="lb-chart-title">Top 10 by XP</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={top10} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="xp" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Score Over Time */}
              {lineData.length > 1 && (
                <div className="lb-chart-card">
                  <h3 className="lb-chart-title">Your Score Over Time</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={lineData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.15)" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Skill Radar */}
              {skills.length > 0 && (
                <div className="lb-chart-card">
                  <h3 className="lb-chart-title">Skill Breakdown</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <RadarChart outerRadius={75} data={skills}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar name="Score" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* ── Activity Heatmap ── */}
            {heatmapValues.length > 0 && (
              <div className="lb-heatmap-card">
                <h3 className="lb-chart-title">Activity Heatmap</h3>
                <CalendarHeatmap
                  startDate={sixMonthsAgo}
                  endDate={today}
                  values={heatmapValues}
                  classForValue={(value) => {
                    if (!value || value.count === 0) return 'color-empty';
                    if (value.count <= 1) return 'color-scale-1';
                    if (value.count <= 3) return 'color-scale-2';
                    if (value.count <= 5) return 'color-scale-3';
                    return 'color-scale-4';
                  }}
                  tooltipDataAttrs={(value) => ({
                    'data-tooltip': value?.date
                      ? `${value.date}: ${value.count} activit${value.count === 1 ? 'y' : 'ies'}`
                      : 'No activity',
                  })}
                  showWeekdayLabels
                />
              </div>
            )}

            {/* ── Rankings Table ── */}
            <div className="portal-table-wrap">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Student</th>
                    <th>Grade</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.length === 0 ? (
                    <tr><td colSpan={4} style={{ textAlign: 'center' }}>No rankings yet.</td></tr>
                  ) : (
                    rankings.map((r, i) => {
                      const isYou = r._id === user?.id;
                      return (
                        <tr key={r._id} className={isYou ? 'is-you' : ''}>
                          <td className="portal-rank">
                            {i === 0 && <Trophy size={14} style={{ verticalAlign: '-2px', marginRight: '4px' }} />}
                            #{i + 1}
                          </td>
                          <td>{r.name}{isYou ? ' (You)' : ''}</td>
                          <td>{r.grade ?? '—'}</td>
                          <td>{r.points ?? 0}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
