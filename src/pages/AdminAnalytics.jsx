import './AdminAnalytics.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users, BarChart3, Shield } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function AdminAnalytics() {
  const { token } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try { setData(await api.getAdminAnalytics(token)) }
      catch { /* silent */ }
      finally { setLoading(false) }
    }
    if (token) load()
  }, [token])

  if (loading) return <section className="portal-page"><div className="container"><p className="portal-empty">Loading analytics…</p></div></section>
  if (!data) return <section className="portal-page"><div className="container"><p className="portal-empty">Could not load analytics.</p></div></section>

  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/admin/users" className="portal-back"><ArrowLeft size={16} /> User Management</Link>
        <h1 className="td-title"><BarChart3 size={22} /> Platform Analytics</h1>

        <div className="aa-stats">
          <div className="td-stat-card"><Users size={18} /><div className="td-stat-card__value">{data.totalUsers}</div><div className="td-stat-card__label">Total Users</div></div>
          <div className="td-stat-card"><Users size={18} /><div className="td-stat-card__value">{data.totalStudents}</div><div className="td-stat-card__label">Students</div></div>
          <div className="td-stat-card"><Shield size={18} /><div className="td-stat-card__value">{data.totalFaculty}</div><div className="td-stat-card__label">Faculty</div></div>
        </div>

        {/* Enrollment over time */}
        {data.enrollmentTrend?.length > 0 && (
          <div className="aa-chart-card">
            <h3 className="lb-chart-title">Enrollment Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.enrollmentTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.15)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#6366F1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Pass rate per course */}
        {data.courseStats?.length > 0 && (
          <div className="aa-chart-card">
            <h3 className="lb-chart-title">Pass Rate per Course</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.courseStats} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey="title" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="passRate" fill="#10B981" radius={[4, 4, 0, 0]} name="Pass %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Popular courses table */}
        <div className="aa-chart-card">
          <h3 className="lb-chart-title">Course Enrollment</h3>
          <table className="au-table" style={{ marginTop: '0.75rem' }}>
            <thead><tr><th>Course</th><th>Enrolled</th><th>Pass Rate</th></tr></thead>
            <tbody>
              {(data.courseStats || []).map((c) => (
                <tr key={c.courseId}>
                  <td className="au-name">{c.title}</td>
                  <td>{c.enrolled}</td>
                  <td>{c.passRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
