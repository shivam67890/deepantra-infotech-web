import './CourseLeaderboard.css'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Trophy } from 'lucide-react'
import { getLeaderboard } from '../data/progressStore'

export default function CourseLeaderboard() {
  const [entries, setEntries] = useState([])
  const currentName = (() => {
    try { return localStorage.getItem('fm-demo-name') || '' } catch { return '' }
  })()
  const lowerName = currentName.trim().toLowerCase()

  useEffect(() => {
    const refresh = () => setEntries(getLeaderboard())
    refresh()
    const id = setInterval(refresh, 5_000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/" className="portal-back">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="cl-header">
          <Trophy size={24} />
          <div>
            <h1>Course Leaderboard</h1>
            <p>All students ranked by total points across both courses</p>
          </div>
        </div>

        {entries.length === 0 ? (
          <p className="portal-empty">No scores yet. Be the first to complete a session!</p>
        ) : (
          <div className="cl-table-wrap">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student</th>
                  <th>Sessions</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => {
                  const isYou = lowerName && e.name.trim().toLowerCase() === lowerName
                  return (
                    <tr key={e.name} className={isYou ? 'cl-row--you' : ''}>
                      <td className="cl-rank">
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                      </td>
                      <td className="cl-name">
                        {e.name}{isYou ? ' (You)' : ''}
                      </td>
                      <td>{e.sessions}</td>
                      <td className="cl-pts">{e.total}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
