import './StudentCourseDetail.css';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  Code2,
  Gamepad2,
  PlayCircle,
  Star,
} from 'lucide-react';
import {
  Link,
  useParams,
} from 'react-router-dom';

import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { getGameLevelsForCourse } from '../utils/courseGameMapper';

export default function StudentCourseDetail() {
  const { courseId } = useParams();
  const { token, user } = useAuth();

  const [course, setCourse] = useState(null);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [codeValue, setCodeValue] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchCourse() {
      try {
        setLoading(true);
        setError(null);

        const data = await api.getCourseById(courseId, token);
        if (isMounted) setCourse(data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Could not load this course. Please try again.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (token) fetchCourse();
    return () => {
      isMounted = false;
    };
  }, [courseId, token]);

  const lessons = course?.lessons ?? [];
  const activeLesson = lessons[activeLessonIndex];

  useEffect(() => {
    setSlideIndex(0);
    setCodeValue(activeLesson?.codeTask?.starterCode ?? '');
  }, [activeLessonIndex, activeLesson]);

  const progressPercent = useMemo(() => {
    if (!lessons.length) return 0;
    return Math.round((completedLessonIds.length / lessons.length) * 100);
  }, [completedLessonIds, lessons]);

  async function markLessonComplete(lessonId) {
    try {
      const data = await api.completeLesson(courseId, lessonId, token);
      setCompletedLessonIds(data.completedLessonIds ?? [...completedLessonIds, lessonId]);
    } catch (err) {
      setError(err.message || 'Could not save your progress. Please try again.');
    }
  }

  function goToLesson(index) {
    if (index < 0 || index >= lessons.length) return;
    setActiveLessonIndex(index);
  }

  if (loading) {
    return (
      <section className="portal-page">
        <div className="container">
          <p className="portal-empty">Loading course...</p>
        </div>
      </section>
    );
  }

  if (error || !course) {
    return (
      <section className="portal-page">
        <div className="container">
          <p className="portal-empty">{error ?? 'Course not found.'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/student/courses" className="portal-back">
          <ArrowLeft size={16} /> Back to your courses
        </Link>

        <div className="course-detail__header">
          <h1 className="portal-title">{course.title}</h1>
          <div className="course-detail__progress">
            <div className="portal-progress">
              <div className="portal-progress__bar" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="portal-card__meta">
              {completedLessonIds.length} / {lessons.length} lessons &middot; {progressPercent}%
            </span>
          </div>
        </div>

        <div className="course-detail__layout">
          {/* Lesson list sidebar */}
          <aside className="course-detail__sidebar">
            {lessons.map((lesson, index) => {
              const isDone = completedLessonIds.includes(lesson._id);
              const isActive = index === activeLessonIndex;
              return (
                <button
                  key={lesson._id ?? index}
                  type="button"
                  className={`course-detail__lesson-btn ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                  onClick={() => goToLesson(index)}
                >
                  <span className="course-detail__lesson-icon">
                    {isDone ? <Check size={14} /> : lesson.type === 'code' ? <Code2 size={14} /> : <PlayCircle size={14} />}
                  </span>
                  <span>{lesson.title}</span>
                </button>
              );
            })}
          </aside>

          {/* Active lesson content */}
          <div className="course-detail__content">
            {activeLesson?.type === 'code' ? (
              <CodeLesson
                lesson={activeLesson}
                codeValue={codeValue}
                setCodeValue={setCodeValue}
                isDone={completedLessonIds.includes(activeLesson._id)}
                onComplete={() => markLessonComplete(activeLesson._id)}
              />
            ) : (
              <SlideLesson
                lesson={activeLesson}
                slideIndex={slideIndex}
                setSlideIndex={setSlideIndex}
                isDone={activeLesson ? completedLessonIds.includes(activeLesson._id) : false}
                onComplete={() => activeLesson && markLessonComplete(activeLesson._id)}
              />
            )}

            <div className="course-detail__nav">
              <button
                type="button"
                className="portal-btn"
                onClick={() => goToLesson(activeLessonIndex - 1)}
                disabled={activeLessonIndex === 0}
              >
                <ChevronLeft size={16} /> Previous lesson
              </button>
              <button
                type="button"
                className="portal-btn portal-btn--primary"
                onClick={() => goToLesson(activeLessonIndex + 1)}
                disabled={activeLessonIndex === lessons.length - 1}
              >
                Next lesson <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Practice with Games — levels matched to this course's grade band */}
        <GameLevelsSection course={course} studentGrade={user?.grade} />
      </div>
    </section>
  );
}

// Grade-appropriate game levels panel
function GameLevelsSection({ course, studentGrade }) {
  const levels = getGameLevelsForCourse(course, studentGrade);

  if (!levels.length) return null;

  return (
    <div className="course-games">
      <div className="course-games__header">
        <Gamepad2 size={20} />
        <div>
          <h2 className="course-games__title">Practice with Games</h2>
          <p className="course-games__sub">
            {levels.length} interactive levels for {course?.gradeBand ?? 'your grade'}
          </p>
        </div>
      </div>

      <div className="course-games__grid">
        {levels.map((level) => (
          <Link
            key={level.id}
            to={`/student/game-engine/${level.id}`}
            className="course-games__card"
          >
            <div className="course-games__card-top">
              <span className="course-games__level-num">Level {level.id}</span>
              <span className={`course-games__diff course-games__diff--${level.difficulty}`}>
                {level.difficulty}
              </span>
            </div>
            <div className="course-games__card-name">{level.name}</div>
            <p className="course-games__card-desc">{level.description}</p>
            <div className="course-games__card-meta">
              <span><Star size={12} /> {level.maxScore} pts</span>
              <span>⏱ {Math.floor(level.timeLimit / 60)}:{(level.timeLimit % 60).toString().padStart(2, '0')}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// PPT-style teaching slides: heading + bullets, next/prev within the lesson
function SlideLesson({ lesson, slideIndex, setSlideIndex, isDone, onComplete }) {
  const slides = lesson?.slides ?? [];
  const slide = slides[slideIndex];
  const isLastSlide = slideIndex === slides.length - 1;

  if (!slide) {
    return <p className="portal-empty">This lesson has no content yet.</p>;
  }

  return (
    <div className="slide-lesson">
      <div className="slide-lesson__deck">
        {slide.image && <img src={slide.image} alt="" className="slide-lesson__image" />}
        <h2 className="slide-lesson__heading">{slide.heading}</h2>
        <ul className="slide-lesson__bullets">
          {(slide.bullets ?? []).map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>

      <div className="slide-lesson__controls">
        <button
          type="button"
          className="portal-btn"
          onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
          disabled={slideIndex === 0}
        >
          <ChevronLeft size={16} /> Prev slide
        </button>
        <span className="portal-card__meta">
          Slide {slideIndex + 1} / {slides.length}
        </span>
        {isLastSlide ? (
          <button type="button" className="portal-btn portal-btn--primary" onClick={onComplete} disabled={isDone}>
            <Check size={16} /> {isDone ? 'Completed' : 'Mark lesson complete'}
          </button>
        ) : (
          <button
            type="button"
            className="portal-btn portal-btn--primary"
            onClick={() => setSlideIndex((i) => Math.min(slides.length - 1, i + 1))}
          >
            Next slide <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

// Step-by-step Python coding task
function CodeLesson({ lesson, codeValue, setCodeValue, isDone, onComplete }) {
  const task = lesson?.codeTask;

  if (!task) {
    return <p className="portal-empty">This coding step has no content yet.</p>;
  }

  return (
    <div className="code-lesson">
      <div className="code-lesson__instructions">
        <h2 className="slide-lesson__heading">{lesson.title}</h2>
        <p>{task.instructions}</p>
      </div>

      <textarea
        className="code-lesson__editor"
        value={codeValue}
        onChange={(e) => setCodeValue(e.target.value)}
        spellCheck={false}
        rows={12}
      />

      <div className="code-lesson__controls">
        <span className="portal-card__meta">Language: {task.language ?? 'python'}</span>
        <button type="button" className="portal-btn portal-btn--primary" onClick={onComplete} disabled={isDone}>
          <Check size={16} /> {isDone ? 'Completed' : 'Submit & mark complete'}
        </button>
      </div>
    </div>
  );
}