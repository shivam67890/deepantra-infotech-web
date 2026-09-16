import './GameEnginePage.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  ArrowLeft,
  Clock,
  Play,
  RotateCcw,
  Star,
  Trophy,
} from 'lucide-react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import GameEngine from '../components/GameEngine/GameEngine.jsx';
import {
  getLevelById,
  getNextLevel,
} from '../components/GameEngine/levelData.js';
import VisualProgramming from '../components/GameEngine/VisualProgramming.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function GameEnginePage() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [level, setLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStatus, setGameStatus] = useState('ready'); // ready, playing, paused, completed, failed
  const [showProgramming, setShowProgramming] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameScene, setGameScene] = useState(null);

  useEffect(() => {
    // Load level data
    const levelData = getLevelById(parseInt(levelId), user?.grade || 5);
    if (levelData) {
      setLevel(levelData);
    } else {
      // Handle invalid level
      navigate('/student/courses');
    }
  }, [levelId, user?.grade, navigate]);

  useEffect(() => {
    let interval;
    if (gameStatus === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStatus]);

  const handleScoreChange = (newScore) => {
    setScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  };

  const handleLevelComplete = () => {
    setGameStatus('completed');
    
    // Calculate final score based on time and efficiency
    const timeBonus = Math.max(0, (level?.timeLimit || 300) - timeElapsed) * 2;
    const finalScore = score + timeBonus;
    setScore(finalScore);
    
    if (finalScore > bestScore) {
      setBestScore(finalScore);
    }
  };

  const handleExecutionComplete = (result) => {
    console.log('Program execution completed:', result);
    // Could trigger level completion if all objectives met
    if (result.success && result.blocksExecuted > 0) {
      // Award points for successful program execution
      const executionBonus = result.blocksExecuted * 10;
      setScore(prev => prev + executionBonus);
    }
  };

  const handleRunProgram = (programBlocks, result) => {
    setAttempts(prev => prev + 1);
    setGameStatus('playing');
    console.log('Running program with blocks:', programBlocks, 'Result:', result);
  };

  const handleReset = () => {
    setScore(0);
    setTimeElapsed(0);
    setGameStatus('ready');
  };

  const handleNextLevel = () => {
    const nextLevel = getNextLevel(parseInt(levelId), user?.grade || 5);
    if (nextLevel) {
      navigate(`/student/game-engine/${nextLevel.id}`);
    } else {
      // All levels completed for this grade
      navigate('/student/courses');
    }
  };

  const handleRetry = () => {
    handleReset();
    setGameStatus('playing');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!level) {
    return <div className="loading">Loading level...</div>;
  }

  return (
    <div className="game-engine-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/student/courses')}>
          <ArrowLeft className="w-5 h-5" />
          Back to Courses
        </button>
        <div className="level-info">
          <h1>{level.name}</h1>
          <p className="level-description">{level.description}</p>
        </div>
        <div className="level-badges">
          <span className={`difficulty-badge ${level.difficulty}`}>
            {level.difficulty.charAt(0).toUpperCase() + level.difficulty.slice(1)}
          </span>
          <span className="grade-badge">
            Grades {level.gradeBand.join('-')}
          </span>
        </div>
      </div>

      <div className="game-content">
        {/* Game Stats Bar */}
        <div className="game-stats-bar">
          <div className="stat-group">
            <div className="stat-item">
              <Star className="w-5 h-5" />
              <div>
                <div className="stat-label">Score</div>
                <div className="stat-value">{score}</div>
              </div>
            </div>
            <div className="stat-item">
              <Trophy className="w-5 h-5" />
              <div>
                <div className="stat-label">Best</div>
                <div className="stat-value">{bestScore}</div>
              </div>
            </div>
          </div>
          
          <div className="stat-group">
            <div className="stat-item">
              <Clock className="w-5 h-5" />
              <div>
                <div className="stat-label">Time</div>
                <div className="stat-value">{formatTime(timeElapsed)}</div>
              </div>
            </div>
            <div className="stat-item">
              <Play className="w-5 h-5" />
              <div>
                <div className="stat-label">Attempts</div>
                <div className="stat-value">{attempts}</div>
              </div>
            </div>
          </div>

          <div className="game-status">
            <span className={`status-indicator status-${gameStatus}`}>
              {gameStatus.charAt(0).toUpperCase() + gameStatus.slice(1)}
            </span>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="game-main">
          {/* Game Canvas */}
          <div className="game-canvas-container">
            <GameEngine
              level={level.id}
              levelData={level}
              onScoreChange={handleScoreChange}
              onLevelComplete={handleLevelComplete}
              onSceneReady={setGameScene}
            />
          </div>

          {/* Visual Programming Panel */}
          {showProgramming && (
            <div className="programming-panel">
              <VisualProgramming
                level={level}
                gameScene={gameScene}
                onRunProgram={handleRunProgram}
                onReset={handleReset}
                onExecutionComplete={handleExecutionComplete}
              />
            </div>
          )}
        </div>

        {/* Objectives Panel */}
        <div className="objectives-panel">
          <h3>Objectives</h3>
          <ul className="objectives-list">
            {level.objectives.map((objective, index) => (
              <li key={index} className="objective-item">
                <span className="objective-number">{index + 1}</span>
                <span className="objective-text">{objective}</span>
              </li>
            ))}
          </ul>
          
          <div className="objectives-info">
            <div className="info-item">
              <span className="info-label">Time Limit:</span>
              <span className="info-value">{formatTime(level.timeLimit)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Max Score:</span>
              <span className="info-value">{level.maxScore}</span>
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="game-controls">
          <button
            className="control-btn toggle-programming"
            onClick={() => setShowProgramming(!showProgramming)}
          >
            {showProgramming ? 'Hide Programming' : 'Show Programming'}
          </button>
          
          {gameStatus === 'ready' && (
            <button className="control-btn start" onClick={() => setGameStatus('playing')}>
              <Play className="w-5 h-5" />
              Start Level
            </button>
          )}
          
          {gameStatus === 'playing' && (
            <button className="control-btn pause" onClick={() => setGameStatus('paused')}>
              Pause
            </button>
          )}
          
          {gameStatus === 'paused' && (
            <button className="control-btn resume" onClick={() => setGameStatus('playing')}>
              Resume
            </button>
          )}
          
          {(gameStatus === 'playing' || gameStatus === 'paused') && (
            <button className="control-btn retry" onClick={handleRetry}>
              <RotateCcw className="w-5 h-5" />
              Retry
            </button>
          )}
          
          {gameStatus === 'completed' && (
            <>
              <button className="control-btn next-level" onClick={handleNextLevel}>
                Next Level
              </button>
              <button className="control-btn retry" onClick={handleRetry}>
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
            </>
          )}
        </div>

        {/* Completion Modal */}
        {gameStatus === 'completed' && (
          <div className="completion-modal">
            <div className="modal-content">
              <div className="modal-icon">
                <Trophy className="w-16 h-16" />
              </div>
              <h2>Level Complete!</h2>
              <div className="completion-stats">
                <div className="completion-stat">
                  <span className="stat-label">Final Score</span>
                  <span className="stat-value">{score}</span>
                </div>
                <div className="completion-stat">
                  <span className="stat-label">Time</span>
                  <span className="stat-value">{formatTime(timeElapsed)}</span>
                </div>
                <div className="completion-stat">
                  <span className="stat-label">Attempts</span>
                  <span className="stat-value">{attempts}</span>
                </div>
              </div>
              <div className="modal-actions">
                <button className="modal-btn primary" onClick={handleNextLevel}>
                  Next Level
                </button>
                <button className="modal-btn secondary" onClick={handleRetry}>
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}