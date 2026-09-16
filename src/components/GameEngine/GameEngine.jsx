import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { registerGeneratedTextures } from './AssetGenerator.jsx';
import './GameEngine.css';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  init(data) {
    if (data && data.levelData) {
      this.levelData = data.levelData;
    }
  }

  preload() {
    // Register generated textures instead of loading external images
    registerGeneratedTextures(this);
  }

  create() {
    // Create game world
    this.createBackground();
    this.createRobot();
    this.createLevelElements();
    this.createUI();
    
    // Setup input handling
    this.setupInput();
    
    // Emit ready event on game events
    this.game.events.emit('gameReady', this);
  }

  createBackground() {
    // Create tiled background
    const bg = this.add.tileSprite(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      'background'
    );
    
    // Store reference for parallax scrolling
    this.background = bg;
  }

  createRobot() {
    const startX = this.levelData?.robot?.startPosition?.x || 100;
    const startY = this.levelData?.robot?.startPosition?.y || 300;

    // Create robot sprite
    this.robot = this.physics.add.sprite(startX, startY, 'robot');
    
    // Set robot properties
    this.robot.setCollideWorldBounds(true);
    this.robot.setBounce(0.2);
    this.robot.setScale(1.5);
    
    // Create walking animation
    if (this.textures.exists('robot-walk')) {
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('robot-walk', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
    }
    
    // Add trail effect
    this.robotTrail = this.add.graphics();
  }

  createLevelElements() {
    // Create obstacles
    this.obstacles = this.physics.add.group();
    
    // Create goals
    this.goals = this.physics.add.group();
    
    if (this.levelData?.obstacles?.length) {
      this.levelData.obstacles.forEach(obs => {
        this.addObstacle(obs.x, obs.y);
      });
    } else {
      this.addObstacle(400, 300);
      this.addObstacle(600, 200);
    }

    if (this.levelData?.goals?.length) {
      this.levelData.goals.forEach(g => {
        this.addGoal(g.x, g.y);
      });
    } else {
      this.addGoal(700, 400);
    }
  }

  addObstacle(x, y) {
    const obstacle = this.obstacles.create(x, y, 'obstacle');
    obstacle.setImmovable(true);
    obstacle.setScale(0.8);
    
    // Add collision with robot
    this.physics.add.collider(this.robot, obstacle);
  }

  addGoal(x, y) {
    const goal = this.goals.create(x, y, 'goal');
    goal.setScale(0.6);
    
    // Add overlap detection for goal collection
    this.physics.add.overlap(this.robot, goal, this.collectGoal, null, this);
  }

  createUI() {
    // Score display
    this.scoreText = this.add.text(20, 20, 'Score: 0', {
      fontSize: '24px',
      fill: '#ffffff',
      fontStyle: 'bold'
    });
    
    // Level display
    this.levelText = this.add.text(20, 50, `Level: ${this.levelData?.id || 1}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });
    
    // Instructions
    this.instructions = this.add.text(
      this.scale.width / 2,
      this.scale.height - 30,
      'Use Arrow Keys, WASD, or Visual Programming to move the robot',
      {
        fontSize: '16px',
        fill: '#ffffff',
        align: 'center'
      }
    ).setOrigin(0.5);
  }

  setupInput() {
    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    
    // Touch controls for mobile
    if (this.input.add.pointer) {
      this.input.add.pointer(1);
    }
  }

  update() {
    if (!this.robot) return;
    
    // Handle input
    this.handleMovement();
    
    // Update trail effect
    this.updateTrail();
    
    // Update background parallax
    if (this.background) {
      this.background.tilePositionX += 0.5;
    }
  }

  handleMovement() {
    const speed = 200;
    let moving = false;
    
    // Reset velocity
    this.robot.setVelocity(0);
    
    // Horizontal movement
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      this.robot.setVelocityX(-speed);
      this.robot.flipX = true;
      moving = true;
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      this.robot.setVelocityX(speed);
      this.robot.flipX = false;
      moving = true;
    }
    
    // Vertical movement
    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      this.robot.setVelocityY(-speed);
      moving = true;
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
      this.robot.setVelocityY(speed);
      moving = true;
    }
    
    // Play animation if moving
    if (moving && this.anims.exists('walk')) {
      this.robot.anims.play('walk', true);
    } else {
      this.robot.anims.stop();
    }
  }

  updateTrail() {
    // Create trail effect behind robot
    if (this.robot && this.robotTrail) {
      this.robotTrail.clear();
      this.robotTrail.fillStyle(0x3b82f6, 0.3);
      
      for (let i = 0; i < 5; i++) {
        const trailX = this.robot.x - (i * 10);
        const trailY = this.robot.y;
        const trailSize = 10 - (i * 2);
        
        if (trailSize > 0) {
          this.robotTrail.fillCircle(trailX, trailY, trailSize);
        }
      }
    }
  }

  collectGoal(robot, goal) {
    // Remove goal
    goal.destroy();
    
    // Update score
    this.score = (this.score || 0) + 100;
    this.scoreText.setText(`Score: ${this.score}`);
    
    // Emit event via game events
    this.game.events.emit('goalCollected', { score: this.score });
    
    // Check if level complete
    if (this.goals.getChildren().length === 0) {
      this.game.events.emit('levelComplete');
    }
  }

  resetLevel() {
    // Reset robot position
    this.robot.setPosition(100, 300);
    this.robot.setVelocity(0);
    
    // Reset score
    this.score = 0;
    this.scoreText.setText('Score: 0');
    
    // Recreate level elements
    this.obstacles.clear(true);
    this.goals.clear(true);
    this.createLevelElements();
  }
}

class GameEngine extends Phaser.Game {
  constructor(config) {
    super(config);
  }
}

export default function GameEngineComponent({ level, levelData, onScoreChange, onLevelComplete, onSceneReady }) {
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('ready');

  useEffect(() => {
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        backgroundColor: '#1a1a2e',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false
          }
        },
        scene: MainScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        }
      };

      const game = new GameEngine(config);
      gameRef.current = game;

      if (levelData) {
        game.scene.start('MainScene', { levelData });
      }

      // Listen on game events safely
      game.events.on('gameReady', (scene) => {
        setGameStatus('playing');
        if (onSceneReady) {
          onSceneReady(scene);
        }
      });

      game.events.on('goalCollected', (data) => {
        setScore(data.score);
        if (onScoreChange) {
          onScoreChange(data.score);
        }
      });

      game.events.on('levelComplete', () => {
        setGameStatus('completed');
        if (onLevelComplete) {
          onLevelComplete();
        }
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  const handleRestart = () => {
    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene('MainScene');
      if (scene) {
        scene.resetLevel();
        setScore(0);
        setGameStatus('playing');
      }
    }
  };

  return (
    <div className="game-engine-container">
      <div className="game-header">
        <h2>Robotics Adventure - Level {level}</h2>
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Status:</span>
            <span className={`stat-value status-${gameStatus}`}>
              {gameStatus.charAt(0).toUpperCase() + gameStatus.slice(1)}
            </span>
          </div>
        </div>
      </div>
      
      <div id="game-container" className="game-canvas"></div>
      
      <div className="game-controls">
        <button 
          className="control-btn restart"
          onClick={handleRestart}
          disabled={gameStatus !== 'playing' && gameStatus !== 'completed'}
        >
          Restart Level
        </button>
        <button 
          className="control-btn help"
          onClick={() => alert('Use Arrow Keys or WASD to move the robot. Collect all goals to complete the level!')}
        >
          Help
        </button>
      </div>
    </div>
  );
}