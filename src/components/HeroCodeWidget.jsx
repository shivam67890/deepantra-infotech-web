import { useEffect, useState } from 'react';
import './HeroCodeWidget.css';

const tabs = [
  {
    id: 'ai-logic',
    label: 'AI Logic & Games',
    grade: 'GRADES 3 – 5',
    code: [
      { type: 'comment', text: '// AI Explorer Module (Grades 3-5)' },
      { type: 'keyword', text: 'const ', rest: 'aiBot = new AIStudent();' },
      { type: 'method', text: 'aiBot.learn', rest: '("Machine Learning Logic");' },
      { type: 'method', text: 'aiBot.play', rest: '("Pattern Match Game");' },
      { type: 'log', text: 'console.log', rest: '("Status: Interactive Session Ready!");' },
    ],
  },
  {
    id: 'python',
    label: 'Python & Robotics',
    grade: 'GRADES 6 – 8',
    code: [
      { type: 'comment', text: '# Young Innovators Module (Grades 6-8)' },
      { type: 'keyword', text: 'import ', rest: 'tensorflow as tf' },
      { type: 'method', text: 'model ', rest: '= tf.keras.models.Sequential()' },
      { type: 'method', text: 'model.add', rest: '(tf.keras.layers.Dense(128, activation="relu"))' },
      { type: 'log', text: 'print', rest: '("Status: Robotics Model Compiled")' },
    ],
  },
  {
    id: 'educator',
    label: 'Educator Tools',
    grade: 'FACULTY WORKSHOPS',
    code: [
      { type: 'comment', text: '<!-- AI Educator Toolkit -->' },
      { type: 'tag', text: '<LessonPlanner ', rest: 'topic="AI Ethics & Safety" />' },
      { type: 'tag', text: '<AutoQuizGenerator ', rest: 'difficulty="adaptive" />' },
      { type: 'tag', text: '<StudentAnalytics ', rest: 'liveTracking={true} />' },
    ],
  },
];

export default function HeroCodeWidget() {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  // Auto-cycle tabs every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Animate lines appearing when tab changes
  useEffect(() => {
    setVisibleLines(0);
    const lines = tabs[activeTab].code.length;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [activeTab]);

  const tab = tabs[activeTab];

  return (
    <div className="code-widget">
      {/* Window chrome */}
      <div className="code-widget__titlebar">
        <div className="code-widget__dots">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="code-widget__tabs">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              className={'code-widget__tab' + (i === activeTab ? ' code-widget__tab--active' : '')}
              onClick={() => setActiveTab(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code body */}
      <div className="code-widget__body">
        <div className="code-widget__grade-badge">
          {tab.grade}
          <span className="code-widget__live">● Live Session Active</span>
        </div>
        <div className="code-widget__code">
          {tab.code.map((line, i) => (
            <div
              key={i}
              className={'code-widget__line' + (i < visibleLines ? ' code-widget__line--visible' : '')}
            >
              {line.type === 'comment' && (
                <span className="code-widget__comment">{line.text}</span>
              )}
              {line.type === 'keyword' && (
                <>
                  <span className="code-widget__keyword">{line.text}</span>
                  <span className="code-widget__plain">{line.rest}</span>
                </>
              )}
              {line.type === 'method' && (
                <>
                  <span className="code-widget__fn">{line.text}</span>
                  <span className="code-widget__plain">{line.rest}</span>
                </>
              )}
              {line.type === 'log' && (
                <>
                  <span className="code-widget__log">{line.text}</span>
                  <span className="code-widget__string">{line.rest}</span>
                </>
              )}
              {line.type === 'tag' && (
                <>
                  <span className="code-widget__tag">{line.text}</span>
                  <span className="code-widget__attr">{line.rest}</span>
                </>
              )}
            </div>
          ))}
          {/* blinking cursor */}
          <span className="code-widget__cursor" />
        </div>
      </div>

      {/* Footer stats */}
      <div className="code-widget__footer">
        <span className="code-widget__stat">
          <span className="code-widget__stat-dot" />
          500+ Active Students
        </span>
        <span className="code-widget__stat code-widget__stat--right">
          ⚡ 100% Practical AI Modules
        </span>
      </div>
    </div>
  );
}
