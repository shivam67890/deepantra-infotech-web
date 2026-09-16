import './TeacherCourseRoster.css'

import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Search, ChevronDown, ChevronUp, Eye } from 'lucide-react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function TeacherCourseRoster() {
  const { courseId } = useParams()
  const { token } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortAsc, setSortAsc] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getTeacherRoster(courseId, token)
        setData(res)
      } catch { /* silent */ }
      finally { setLoading(false) }
    }
    if (token) load()
  }, [courseId, token])

  function handleSort(key) {
    if (sortKey === key) setSortAsc((v) => !v)
    else { setSortKey(key); setSortAsc(true) }
  }

  const roster = useMemo(() => {
    if (!data?.roster) return []
    let filtered = data.roster
    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter((r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q))
    }
    return [...filtered].sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey]
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      if (av < bv) return sortAsc ? -1 : 1
      if (av > bv) return sortAsc ? 1 : -1
      return 0
    })
  }, [data, search, sortKey, sortAsc])

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return null
    return sortAsc ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }

  if (loading) {
    return (
      <section className="portal-page">
        <div className="container"><p className="portal-empty">Loading roster…</p></div>
      </section>
    )
  }

  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/teacher/dashboard" className="portal-back">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <h1 className="td-title">{data?.courseTitle || 'Course'} — Student Roster</h1>
        <p className="td-sub">{data?.totalStudents || 0} enrolled students · {data?.totalSessions || 0} sessions</p>

        {/* Search bar */}
        <div className="tcr-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {roster.length === 0 ? (
          <p className="portal-empty">No students enrolled yet.</p>
        ) : (
          <div className="tcr-table-wrap">
            <table className="tcr-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')}>Name <SortIcon col="name" /></th>
                  <th onClick={() => handleSort('percentComplete')}>% Complete <SortIcon col="percentComplete" /></th>
                  <th onClick={() => handleSort('sessionsCompleted')}>Sessions <SortIcon col="sessionsCompleted" /></th>
                  <th onClick={() => handleSort('averageScore')}>Avg Score <SortIcon col="averageScore" /></th>
                  <th onClick={() => handleSort('lastActive')}>Last Active <SortIcon col="lastActive" /></th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((r) => (
                  <tr key={r.studentId}>
                    <td className="tcr-name">
                      <span>{r.name}</span>
                      {r.grade && <span className="tcr-grade-pill">Gr {r.grade}</span>}
                    </td>
                    <td>
                      <div className="tcr-progress-bar">
                        <div className="tcr-progress-fill" style={{ width: `${r.percentComplete}%` }} />
                      </div>
                      <span className="tcr-pct">{r.percentComplete}%</span>
                    </td>
                    <td>{r.sessionsDone}</td>
                    <td className="tcr-score">{r.averageScore}%</td>
                    <td className="tcr-date">
                      {r.lastActive ? new Date(r.lastActive).toLocaleDateString() : '—'}
                    </td>
                    <td>
                      <Link
                        to={`/teacher/courses/${courseId}/students/${r.studentId}`}
                        className="tcr-view-btn"
                      >
                        <Eye size={14} /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
