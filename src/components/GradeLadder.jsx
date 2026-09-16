import { gradeLadder } from '../data/curriculumData'
import './GradeLadder.css'

export default function GradeLadder() {
  return (
    <div className="grade-ladder">
      <div className="grade-ladder__track">
        {gradeLadder.map((rung, i) => {
          const isAvailable = rung.status === 'available'
          const prevAvailable = i > 0 && gradeLadder[i - 1].status === 'available'
          const connectorActive = isAvailable && prevAvailable
          // Group highlight: same track as previous rung
          const sameTrack = i > 0 && gradeLadder[i - 1].track === rung.track

          return (
            <div className="grade-ladder__rung-wrap" key={rung.grade}>
              {i > 0 && (
                <div
                  className={`grade-ladder__connector ${connectorActive ? 'grade-ladder__connector--active' : ''} ${
                    sameTrack && isAvailable ? `grade-ladder__connector--${rung.accent}` : ''
                  }`}
                />
              )}
              <div
                className={`grade-ladder__rung ${
                  isAvailable ? `grade-ladder__rung--${rung.accent}` : 'grade-ladder__rung--muted'
                }`}
              >
                <span className="grade-ladder__grade">Grade {rung.grade}</span>
                <span className="grade-ladder__track-name">{rung.track}</span>
                <span
                  className={`grade-ladder__badge ${
                    isAvailable ? `grade-ladder__badge--${rung.accent}` : ''
                  }`}
                >
                  {isAvailable ? rung.level : 'Coming Soon'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
