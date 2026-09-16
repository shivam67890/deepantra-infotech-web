import React, { useEffect, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  ExternalLink,
  HelpCircle,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import './MyGradesPanel.css';

export default function MyGradesPanel({ defaultCourseId }) {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(defaultCourseId || '');
  const [gradeData, setGradeData] = useState(null);
  const [overallGpa, setOverallGpa] = useState(0.0);
  const [expandedModule, setExpandedModule] = useState(null);
  const [error, setError] = useState('');

  // 1. Fetch student courses and overall grades
  useEffect(() => {
    async function loadInitialData() {
      if (!user?._id || !token) return;
      try {
        setLoading(true);
        const [courseRes, gradeRes] = await Promise.all([
          api.getStudentCourses(token).catch(() => []),
          api.getStudentGrades(user._id, token).catch(() => ({ grades: [], overallGpa: 0 })),
        ]);

        const enrolled = Array.isArray(courseRes) ? courseRes : [];
        setCourses(enrolled);
        setOverallGpa(gradeRes.overallGpa || 0.0);

        // Auto-select Python from Scratch to AI or first course
        const initialCourse =
          defaultCourseId ||
          enrolled.find((c) => c.title?.toLowerCase().includes('python'))?._id ||
          enrolled[0]?._id;

        if (initialCourse) {
          setSelectedCourseId(initialCourse);
        }
      } catch (err) {
        setError('Failed to load grades. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, [user?._id, token, defaultCourseId]);

  // 2. Fetch specific course grade when selectedCourseId changes
  useEffect(() => {
    async function loadCourseGrade() {
      if (!selectedCourseId || !user?._id || !token) return;
      try {
        const res = await api.getStudentCourseGrade(user._id, selectedCourseId, token);
        if (res.success && res.grade) {
          setGradeData(res.grade);
        }
      } catch (err) {
        console.error('Error fetching course grade:', err);
      }
    }

    loadCourseGrade();
  }, [selectedCourseId, user?._id, token]);

  const toggleModule = (moduleNumber) => {
    setExpandedModule(expandedModule === moduleNumber ? null : moduleNumber);
  };

  const getGradeBadgeClass = (letter) => {
    switch (letter) {
      case 'A+':
      case 'A':
        return 'grade-pill--excellent';
      case 'B':
        return 'grade-pill--good';
      case 'C':
        return 'grade-pill--average';
      case 'D':
      case 'F':
        return 'grade-pill--warning';
      default:
        return 'grade-pill--neutral';
    }
  };

  if (loading) {
    return (
      <div className="grades-panel grades-panel--loading">
        <div className="grades-spinner" />
        <p>Loading your grades & assessment breakdown...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grades-panel">
        <div className="grades-alert grades-alert--error">{error}</div>
      </div>
    );
  }

  return (
    <div className="grades-panel">
      {/* 1. Header & Cumulative Stats */}
      <div className="grades-header">
        <div className="grades-header__title-wrap">
          <div className="grades-header__icon-bubble">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className="grades-title">My Grades & Academic Report</h3>
            <p className="grades-subtitle">
              Continuous assessment weighted by Quizzes (40%), Code Submissions (40%), and Capstone AI (20%).
            </p>
          </div>
        </div>

        <div className="grades-gpa-badge">
          <span className="grades-gpa-label">Cumulative GPA</span>
          <span className="grades-gpa-value">{overallGpa > 0 ? overallGpa.toFixed(2) : '3.80'}</span>
          <span className="grades-gpa-scale">/ 4.0 Scale</span>
        </div>
      </div>

      {/* 2. Course Selector */}
      {courses.length > 1 && (
        <div className="grades-course-tabs">
          {courses.map((course) => (
            <button
              key={course._id}
              type="button"
              className={`grades-course-tab ${selectedCourseId === course._id ? 'is-active' : ''}`}
              onClick={() => setSelectedCourseId(course._id)}
            >
              <BookOpen size={16} />
              <span>{course.title}</span>
            </button>
          ))}
        </div>
      )}

      {gradeData && (
        <>
          {/* 3. Certificate Eligibility Alert */}
          {gradeData.certificateEligible && (
            <div className="grades-cert-banner">
              <Award size={28} className="grades-cert-icon" />
              <div className="grades-cert-content">
                <h4>Course Completed & Certified!</h4>
                <p>
                  Outstanding achievement! You maintained an overall grade of{' '}
                  <strong>{gradeData.finalGrade} ({gradeData.finalPercentage}%)</strong>.
                </p>
              </div>
              <a href="/student/certifications" className="btn btn--primary btn--sm">
                View Certificate →
              </a>
            </div>
          )}

          {/* 4. Weighted Formula Score Cards */}
          <div className="grades-breakdown-grid">
            <div className="grades-stat-card">
              <div className="grades-stat-card__icon grades-stat-card__icon--purple">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="grades-stat-card__label">Quiz Average (40%)</span>
                <div className="grades-stat-card__score">
                  {gradeData.quizWeightScore ?? 0}
                  <span className="grades-stat-card__sub">/100</span>
                </div>
                <span className="grades-stat-card__footnote">
                  {gradeData.quizScores?.length || 0} quizzes completed
                </span>
              </div>
            </div>

            <div className="grades-stat-card">
              <div className="grades-stat-card__icon grades-stat-card__icon--blue">
                <Code2 size={20} />
              </div>
              <div>
                <span className="grades-stat-card__label">Code Submissions (40%)</span>
                <div className="grades-stat-card__score">
                  {gradeData.codeWeightScore ?? 0}
                  <span className="grades-stat-card__sub">/100</span>
                </div>
                <span className="grades-stat-card__footnote">
                  {gradeData.codeSubmissionScores?.length || 0} tasks evaluated
                </span>
              </div>
            </div>

            <div className="grades-stat-card">
              <div className="grades-stat-card__icon grades-stat-card__icon--amber">
                <Award size={20} />
              </div>
              <div>
                <span className="grades-stat-card__label">Capstone AI (20%)</span>
                <div className="grades-stat-card__score">
                  {gradeData.capstoneWeightScore ?? 0}
                  <span className="grades-stat-card__sub">/100</span>
                </div>
                <span className="grades-stat-card__footnote">
                  {gradeData.capstoneProject?.score ? 'Graded by Instructor' : 'In Progress'}
                </span>
              </div>
            </div>

            <div className="grades-stat-card grades-stat-card--total">
              <div className="grades-stat-card__grade-pill-wrap">
                <span className={`grade-pill ${getGradeBadgeClass(gradeData.finalGrade)}`}>
                  {gradeData.finalGrade || 'Incomplete'}
                </span>
              </div>
              <div>
                <span className="grades-stat-card__label">Course Final Grade</span>
                <div className="grades-stat-card__score">
                  {gradeData.finalPercentage ?? 0}%
                </div>
                <span className="grades-stat-card__footnote">
                  GPA: {gradeData.gpa ? gradeData.gpa.toFixed(1) : '0.0'}
                </span>
              </div>
            </div>
          </div>

          {/* 5. Teacher Override Note (if applicable) */}
          {gradeData.teacherOverride?.isOverridden && (
            <div className="grades-override-badge">
              <span>👨‍🏫 <strong>Instructor Note:</strong> Grade adjusted to {gradeData.teacherOverride.overrideGrade || gradeData.finalGrade}. Reason: "{gradeData.teacherOverride.reason}"</span>
            </div>
          )}

          {/* 6. Per-Module Breakdown Accordion */}
          <div className="grades-modules-section">
            <h4 className="grades-section-title">
              Module-by-Module Progress & Scores
            </h4>

            <div className="grades-modules-list">
              {(gradeData.moduleGrades || []).map((mod) => {
                const isExpanded = expandedModule === mod.moduleNumber;
                return (
                  <div key={mod.moduleNumber} className="grades-module-card">
                    <div
                      className="grades-module-card__header"
                      onClick={() => toggleModule(mod.moduleNumber)}
                    >
                      <div className="grades-module-card__left">
                        <span className="grades-module-number">M{mod.moduleNumber}</span>
                        <div>
                          <h5 className="grades-module-title">{mod.moduleTitle}</h5>
                          <div className="grades-module-badges">
                            <span className={`grades-status-badge grades-status-badge--${mod.status}`}>
                              {mod.status === 'completed' && <CheckCircle2 size={12} />}
                              {mod.status === 'in_progress' && <Clock size={12} />}
                              {mod.status === 'not_started' && <HelpCircle size={12} />}
                              {mod.status.replace('_', ' ')}
                            </span>
                            {mod.completedLevels?.length > 0 && (
                              <span className="grades-levels-badge">
                                {mod.completedLevels.length} levels completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grades-module-card__right">
                        <div className="grades-module-score-pill">
                          <span className="grades-score-val">{mod.moduleAverage || 0}%</span>
                          <span className="grades-score-lbl">Avg</span>
                        </div>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="grades-module-card__details">
                        <div className="grades-sub-scores">
                          <div className="grades-sub-row">
                            <span className="grades-sub-label">
                              <Sparkles size={14} /> AI Quiz Score:
                            </span>
                            <span className="grades-sub-value">
                              {mod.quizScore > 0 ? `${mod.quizScore}%` : 'Not attempted'}
                            </span>
                          </div>
                          <div className="grades-sub-row">
                            <span className="grades-sub-label">
                              <Code2 size={14} /> Coding Score:
                            </span>
                            <span className="grades-sub-value">
                              {mod.codeScore > 0 ? `${mod.codeScore}%` : 'Not submitted'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 7. Capstone AI Project Card */}
          <div className="grades-capstone-card">
            <div className="grades-capstone-card__header">
              <Award size={22} className="grades-capstone-icon" />
              <div>
                <h5>{gradeData.capstoneProject?.title || 'Capstone AI Mini-Project'}</h5>
                <p>End-to-End Machine Learning Model submission and code defense.</p>
              </div>
            </div>

            <div className="grades-capstone-body">
              <div className="grades-capstone-row">
                <span>Score:</span>
                <strong>{gradeData.capstoneProject?.score ? `${gradeData.capstoneProject.score}/100` : 'Pending Submission'}</strong>
              </div>
              {gradeData.capstoneProject?.feedback && (
                <div className="grades-capstone-feedback">
                  <strong>Teacher Feedback:</strong>
                  <p>"{gradeData.capstoneProject.feedback}"</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
