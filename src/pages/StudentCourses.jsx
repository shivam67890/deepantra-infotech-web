import './StudentCourses.css';

import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowLeft,
  BookOpen,
  PlayCircle,
  Gamepad2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { getFirstLevelIdForCourse } from '../utils/courseGameMapper';

const COLORS = ['amber', 'blue', 'green', 'purple', 'red'];

export default function StudentCourses() {
  const { token, user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCourses() {
      try {
        setLoading(true);
        setError(null);

        const data = await api.getStudentCourses(token);
        if (isMounted) setCourses(data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Could not load your courses. Please try again.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (token) fetchCourses();
  }, [token]);

  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/student/dashboard" className="portal-back">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <div className="portal-header">
          <div>
            <h1 className="portal-title">Your Courses</h1>
            <p className="portal-sub">
              {loading ? 'Loading...' : `${courses.length} courses enrolled`}
            </p>
          </div>
        </div>

        {loading ? (
          <p className="portal-empty">Loading your courses...</p>
        ) : error ? (
          <p className="portal-empty">{error}</p>
        ) : courses.length === 0 ? (
          <p className="portal-empty">You haven&apos;t enrolled in any courses yet.</p>
        ) : (
          <div className="portal-grid">
            {courses.map((course, index) => {
              const lessonsTotal = course.lessons?.length ?? course.totalLevels ?? 0;
              const lessonsDone = course.completedLessonIds?.length ?? course.completedLevels ?? 0;
              const progress = course.progress ?? course.progressPercentage ?? 0;
              const color = COLORS[index % COLORS.length];
              const courseId = course._id ?? course.id;

              return (
                <div key={courseId} className="portal-card">
                  <div className="portal-card__top">
                    <div className={`portal-card__icon portal-card__icon--${color}`}>
                      <BookOpen size={20} />
                    </div>
                    {progress === 100 && (
                      <span className="portal-badge portal-badge--green">Completed</span>
                    )}
                  </div>
                  <div className="portal-card__title">{course.title}</div>
                  <div className="portal-card__meta">
                    Taught by {course.instructor ?? 'TBD'}
                  </div>

                  <div className="portal-progress">
                    <div
                      className="portal-progress__bar"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="portal-card__meta">
                    {lessonsDone} / {lessonsTotal} lessons &middot; {progress}%
                  </div>

                  <div className="portal-card__footer">
                    <Link to={`/student/courses/${courseId}`} className="portal-btn portal-btn--primary">
                      <PlayCircle size={16} />
                      {progress === 100 ? 'Review' : 'Continue'}
                    </Link>
                    <Link to={`/student/game-engine/${getFirstLevelIdForCourse(course, user?.grade)}`} className="portal-btn portal-btn--secondary">
                      <Gamepad2 size={16} />
                      Play Game
                    </Link>
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