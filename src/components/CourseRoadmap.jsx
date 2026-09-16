import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Flame,
  Lock,
  Play,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import './CourseRoadmap.css';

export const PYTHON_AI_ROADMAP_DATA = [
  {
    moduleNumber: 1,
    title: 'Python Basics',
    description: 'Variables, loops, conditionals, functions, and algorithmic thinking.',
    estimatedHours: 3,
    levels: [
      {
        levelNumber: 1,
        title: 'Welcome to Python: Variables & Data Types',
        type: 'slide',
        xpReward: 50,
        difficulty: 'Beginner',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/courses',
      },
      {
        levelNumber: 2,
        title: 'Loops & Conditionals: Decision Making',
        type: 'code',
        xpReward: 75,
        difficulty: 'Beginner',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
      {
        levelNumber: 3,
        title: 'Functions & Reusable Logic: Mini Calculator',
        type: 'quiz',
        xpReward: 100,
        difficulty: 'Beginner',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/quiz?topic=python&module=1',
      },
    ],
  },
  {
    moduleNumber: 2,
    title: 'Data Structures',
    description: 'Mastering lists, dictionaries, tuples, sets, and data indexing.',
    estimatedHours: 3,
    levels: [
      {
        levelNumber: 4,
        title: 'Lists & Indexing: Organizing Data Collections',
        type: 'slide',
        xpReward: 60,
        difficulty: 'Beginner',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/courses',
      },
      {
        levelNumber: 5,
        title: 'Dictionaries & Tuples: Key-Value Mapping',
        type: 'code',
        xpReward: 80,
        difficulty: 'Beginner',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
      {
        levelNumber: 6,
        title: 'Sets & Data Filtering Challenge',
        type: 'quiz',
        xpReward: 100,
        difficulty: 'Beginner',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/quiz?topic=python&module=2',
      },
    ],
  },
  {
    moduleNumber: 3,
    title: 'OOP in Python',
    description: 'Object-oriented programming, classes, objects, methods, and inheritance.',
    estimatedHours: 4,
    levels: [
      {
        levelNumber: 7,
        title: 'Blueprints: Classes & Objects Explained',
        type: 'slide',
        xpReward: 70,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/courses',
      },
      {
        levelNumber: 8,
        title: 'Methods, Attributes & __init__ Constructors',
        type: 'code',
        xpReward: 90,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
      {
        levelNumber: 9,
        title: 'Inheritance & Real-World Robot Modeling',
        type: 'project',
        xpReward: 120,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
    ],
  },
  {
    moduleNumber: 4,
    title: 'File Handling & Error Handling',
    description: 'Reading/writing files and writing defensive code with try/except.',
    estimatedHours: 3,
    levels: [
      {
        levelNumber: 10,
        title: 'File I/O: Reading & Writing Files',
        type: 'slide',
        xpReward: 70,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/courses',
      },
      {
        levelNumber: 11,
        title: 'Defensive Coding: try / except Blocks',
        type: 'code',
        xpReward: 85,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
      {
        levelNumber: 12,
        title: 'Build a Robust Student Data Log Parser',
        type: 'quiz',
        xpReward: 100,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/quiz?topic=python&module=4',
      },
    ],
  },
  {
    moduleNumber: 5,
    title: 'Libraries: NumPy & Pandas',
    description: 'High-performance arrays, tabular datasets, and data wrangling.',
    estimatedHours: 4,
    levels: [
      {
        levelNumber: 13,
        title: 'High-Speed Arrays with NumPy',
        type: 'slide',
        xpReward: 80,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/courses',
      },
      {
        levelNumber: 14,
        title: 'Tabular Data Mastery with Pandas DataFrames',
        type: 'code',
        xpReward: 100,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
      {
        levelNumber: 15,
        title: 'Data Cleaning & Querying Challenge',
        type: 'code',
        xpReward: 110,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
    ],
  },
  {
    moduleNumber: 6,
    title: 'Data Visualization: Matplotlib & Seaborn',
    description: 'Transforming numbers into line plots, bar charts, and heatmaps.',
    estimatedHours: 3,
    levels: [
      {
        levelNumber: 16,
        title: 'Charting with Matplotlib: Lines & Bars',
        type: 'slide',
        xpReward: 75,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/courses',
      },
      {
        levelNumber: 17,
        title: 'Statistical Aesthetics with Seaborn',
        type: 'code',
        xpReward: 95,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
      {
        levelNumber: 18,
        title: 'Visual Storytelling: Insights Dashboard',
        type: 'project',
        xpReward: 130,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
    ],
  },
  {
    moduleNumber: 7,
    title: 'Math for AI (Simplified for K-9)',
    description: 'Intuitive statistics, vectors, matrices, and probability without complex formulas.',
    estimatedHours: 4,
    levels: [
      {
        levelNumber: 19,
        title: 'Descriptive Stats Intuition: Mean, Median, Spread',
        type: 'slide',
        xpReward: 80,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/courses',
      },
      {
        levelNumber: 20,
        title: '2D Vectors & Feature Space Visualized',
        type: 'slide',
        xpReward: 90,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/courses',
      },
      {
        levelNumber: 21,
        title: 'Probability & Decision Weights Quiz',
        type: 'quiz',
        xpReward: 110,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/quiz?topic=python&module=7',
      },
    ],
  },
  {
    moduleNumber: 8,
    title: 'Intro to Machine Learning Concepts',
    description: 'Supervised vs. unsupervised learning, features, labels, and training splits.',
    estimatedHours: 4,
    levels: [
      {
        levelNumber: 22,
        title: 'How Machines Learn: Features & Labels',
        type: 'slide',
        xpReward: 90,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/courses',
      },
      {
        levelNumber: 23,
        title: 'Supervised vs. Unsupervised Learning In Action',
        type: 'code',
        xpReward: 100,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
      {
        levelNumber: 24,
        title: 'The Train/Test Split & Overfitting Trap',
        type: 'quiz',
        xpReward: 120,
        difficulty: 'Intermediate',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/quiz?topic=python&module=8',
      },
    ],
  },
  {
    moduleNumber: 9,
    title: 'Build an ML Model (Scikit-Learn)',
    description: 'Training real classifiers on tabular and digit data with Python.',
    estimatedHours: 5,
    levels: [
      {
        levelNumber: 25,
        title: 'Hello Scikit-Learn: Classification Pipeline',
        type: 'slide',
        xpReward: 100,
        difficulty: 'Advanced',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/courses',
      },
      {
        levelNumber: 26,
        title: 'Train a KNN / Decision Tree Classifier',
        type: 'code',
        xpReward: 140,
        difficulty: 'Advanced',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
      {
        levelNumber: 27,
        title: 'Model Evaluation: Accuracy & Confusion Matrix',
        type: 'quiz',
        xpReward: 130,
        difficulty: 'Advanced',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/quiz?topic=python&module=9',
      },
    ],
  },
  {
    moduleNumber: 10,
    title: 'Capstone AI Mini-Project',
    description: 'End-to-end AI project: define problem, prepare dataset, train model, evaluate.',
    estimatedHours: 6,
    levels: [
      {
        levelNumber: 28,
        title: 'Capstone Phase 1: Problem Definition & Data Prep',
        type: 'code',
        xpReward: 150,
        difficulty: 'Advanced',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
      {
        levelNumber: 29,
        title: 'Capstone Phase 2: Train & Optimize AI Predictor',
        type: 'code',
        xpReward: 180,
        difficulty: 'Advanced',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
      {
        levelNumber: 30,
        title: 'Final Showcase, Code Defense & Certification',
        type: 'project',
        xpReward: 250,
        difficulty: 'Advanced',
        targetGradeBand: 'Grades 6-8',
        actionUrl: '/student/code-portal',
      },
    ],
  },
];

export default function CourseRoadmap({ currentLevel = 1, completedLevels = [] }) {
  const [openModule, setOpenModule] = useState(1);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'slide':
        return <BookOpen size={16} />;
      case 'code':
        return <Code2 size={16} />;
      case 'quiz':
        return <Sparkles size={16} />;
      case 'project':
        return <Award size={16} />;
      default:
        return <Play size={16} />;
    }
  };

  const isLevelCompleted = (num) => completedLevels.includes(num);
  const isLevelActive = (num) => num === currentLevel;
  const isLevelLocked = (num) => num > currentLevel && !completedLevels.includes(num);

  return (
    <div className="roadmap-container">
      <div className="roadmap-header">
        <div>
          <div className="roadmap-badge">
            <BrainCircuit size={16} /> 30-Level Gamified Curriculum
          </div>
          <h3 className="roadmap-title">Python from Scratch to AI Roadmap</h3>
          <p className="roadmap-subtitle">
            10 Structured Modules spanning fundamental logic, OOP, data science, and genuine machine learning.
          </p>
        </div>

        <div className="roadmap-progress-summary">
          <div className="roadmap-progress-track">
            <div
              className="roadmap-progress-fill"
              style={{ width: `${Math.round((completedLevels.length / 30) * 100)}%` }}
            />
          </div>
          <span className="roadmap-progress-label">
            {completedLevels.length} of 30 levels completed ({Math.round((completedLevels.length / 30) * 100)}%)
          </span>
        </div>
      </div>

      <div className="roadmap-modules-grid">
        {PYTHON_AI_ROADMAP_DATA.map((module) => {
          const isOpen = openModule === module.moduleNumber;
          const completedInModule = module.levels.filter((l) => isLevelCompleted(l.levelNumber)).length;
          const isModuleComplete = completedInModule === module.levels.length;

          return (
            <div
              key={module.moduleNumber}
              className={`roadmap-module-block ${isOpen ? 'is-open' : ''} ${isModuleComplete ? 'is-completed' : ''}`}
            >
              <div
                className="roadmap-module-header"
                onClick={() => setOpenModule(isOpen ? null : module.moduleNumber)}
              >
                <div className="roadmap-module-title-group">
                  <span className="roadmap-module-pill">M{module.moduleNumber}</span>
                  <div>
                    <h4 className="roadmap-module-heading">{module.title}</h4>
                    <p className="roadmap-module-desc">{module.description}</p>
                  </div>
                </div>

                <div className="roadmap-module-meta-group">
                  <span className="roadmap-module-status-chip">
                    {completedInModule}/{module.levels.length} done
                  </span>
                  {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
              </div>

              {isOpen && (
                <div className="roadmap-levels-list">
                  {module.levels.map((level) => {
                    const completed = isLevelCompleted(level.levelNumber);
                    const active = isLevelActive(level.levelNumber);
                    const locked = isLevelLocked(level.levelNumber);

                    return (
                      <div
                        key={level.levelNumber}
                        className={`roadmap-level-card ${completed ? 'is-completed' : ''} ${active ? 'is-active' : ''} ${locked ? 'is-locked' : ''}`}
                      >
                        <div className="roadmap-level-left">
                          <div className={`roadmap-level-icon roadmap-level-icon--${level.type}`}>
                            {completed ? <CheckCircle2 size={16} /> : locked ? <Lock size={16} /> : getTypeIcon(level.type)}
                          </div>
                          <div>
                            <div className="roadmap-level-top-row">
                              <span className="roadmap-level-num">Level {level.levelNumber}</span>
                              <span className="roadmap-level-type-tag">{level.type.toUpperCase()}</span>
                              <span className="roadmap-level-difficulty">{level.difficulty}</span>
                            </div>
                            <h5 className="roadmap-level-name">{level.title}</h5>
                          </div>
                        </div>

                        <div className="roadmap-level-right">
                          <span className="roadmap-level-xp">
                            <Flame size={13} /> +{level.xpReward} XP
                          </span>
                          {!locked ? (
                            <Link to={level.actionUrl} className="btn btn--primary btn--sm roadmap-start-btn">
                              {completed ? 'Review' : 'Start'} →
                            </Link>
                          ) : (
                            <button type="button" className="btn btn--outline btn--sm roadmap-locked-btn" disabled>
                              Locked
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
