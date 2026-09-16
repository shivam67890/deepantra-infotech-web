import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import { getLeaderboard } from '../data/progressStore'
import './LeaderboardPreview.css'

/**
 * Shows top 5 leaderboard entries on the homepage.
 * Refreshes every 10 seconds so scores feel "live."
 */
export default function LeaderboardPreview({ currentName }) {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const refresh = () => setEntries(getLeaderboard(5))
    refresh()
    const id = setInterval(refresh, 10_000)
    return () => clearInterval(id)
  }, [])

  if (entries.length === 0) {
    return (
      <div className="lb-preview lb-preview--empty">
        <Trophy size={20} />
        <p>No scores yet — be the first to take a quiz!</p>
      </div>
    )
  }

  const lowerName = currentName?.trim().toLowerCase()

  return (
    <div className="lb-preview">
      <div className="lb-preview__header">
        <Trophy size={18} />
        <h3>Leaderboard</h3>
        <Link to="/course-leaderboard" className="lb-preview__link">View All →</Link>
      </div>
      <div className="lb-preview__list">
        {entries.map((e, i) => {
          const isYou = lowerName && e.name.trim().toLowerCase() === lowerName
          return (
            <div
              key={e.name}
              className={`lb-preview__row ${isYou ? 'lb-preview__row--you' : ''}`}
            >
              <span className="lb-preview__rank">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
              </span>
              <span className="lb-preview__name">
                {e.name}{isYou ? ' (You)' : ''}
              </span>
              <span className="lb-preview__sessions">{e.sessions} sessions</span>
              <span className="lb-preview__score">{e.total} pts</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
