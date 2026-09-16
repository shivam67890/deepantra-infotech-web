import { useEffect, useState } from 'react'
import { Trophy, Clock, Zap } from 'lucide-react'
import { api } from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'
import './ChallengeBanner.css'

/**
 * Shows active challenges for a given course (or all courses if no courseId).
 * Rendered on the student dashboard.
 */
export default function ChallengeBanner({ courseId }) {
  const { token, user } = useAuth()
  const [challenges, setChallenges] = useState([])

  useEffect(() => {
    if (!token || !courseId) return
    api.getChallenges(courseId, token)
      .then((res) => setChallenges(res.challenges || []))
      .catch(() => {})
  }, [courseId, token])

  if (challenges.length === 0) return null

  return (
    <div className="challenge-banners">
      {challenges.map((ch) => {
        const now = new Date()
        const closes = new Date(ch.closesAt)
        const hoursLeft = Math.max(0, Math.round((closes - now) / 3600000))
        const myEntry = ch.leaderboard?.find(
          (e) => e.student?._id === user?.id || e.student === user?.id
        )

        return (
          <div key={ch._id} className="challenge-card">
            <div className="challenge-card__top">
              <Zap size={18} />
              <h3 className="challenge-card__title">{ch.title}</h3>
              <span className="challenge-card__bonus">+{ch.bonusXp} XP</span>
            </div>
            {ch.description && <p className="challenge-card__desc">{ch.description}</p>}
            <div className="challenge-card__meta">
              <span><Clock size={14} /> {hoursLeft}h remaining</span>
              <span><Trophy size={14} /> {ch.leaderboard?.length || 0} participants</span>
              {myEntry && <span className="challenge-card__my-score">Your score: {myEntry.score}</span>}
            </div>

            {/* Mini leaderboard */}
            {ch.leaderboard?.length > 0 && (
              <div className="challenge-card__lb">
                {ch.leaderboard.slice(0, 5).map((e, i) => (
                  <div key={i} className="challenge-card__lb-row">
                    <span className="challenge-card__lb-rank">
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                    </span>
                    <span className="challenge-card__lb-name">{e.student?.name || 'Student'}</span>
                    <span className="challenge-card__lb-score">{e.score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
