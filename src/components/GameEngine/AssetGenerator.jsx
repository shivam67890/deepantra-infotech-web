// Asset generator for game engine - creates placeholder assets programmatically
// This allows the game to run without external image files

export function generateRobotTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Robot body
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(16, 20, 32, 28);

  // Robot head
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(20, 8, 24, 16);

  // Eyes
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(24, 12, 6, 6);
  ctx.fillRect(34, 12, 6, 6);

  // Eye pupils
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(26, 14, 2, 2);
  ctx.fillRect(36, 14, 2, 2);

  // Antenna
  ctx.fillStyle = '#60a5fa';
  ctx.fillRect(30, 2, 4, 8);

  // Antenna tip
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(32, 2, 3, 0, Math.PI * 2);
  ctx.fill();

  // Arms
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(8, 24, 8, 16);
  ctx.fillRect(48, 24, 8, 16);

  // Legs
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(20, 48, 8, 12);
  ctx.fillRect(36, 48, 8, 12);

  return canvas;
}

export function generateBackgroundTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 600);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 600);

  // Grid pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;

  for (let x = 0; x < 800; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 600);
    ctx.stroke();
  }

  for (let y = 0; y < 600; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(800, y);
    ctx.stroke();
  }

  // Add some tech decorations
  ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
  ctx.fillRect(100, 100, 50, 50);
  ctx.fillRect(650, 450, 50, 50);
  ctx.fillRect(350, 250, 100, 100);

  return canvas;
}

export function generateObstacleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Main obstacle body
  ctx.fillStyle = '#4b5563';
  ctx.fillRect(8, 8, 48, 48);

  // Warning stripes
  ctx.fillStyle = '#f59e0b';
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(8 + (i * 16), 8, 8, 48);
  }

  // Border
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 48, 48);

  return canvas;
}

export function generateGoalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Star shape
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(32, 4);
  ctx.lineTo(40, 24);
  ctx.lineTo(60, 24);
  ctx.lineTo(44, 36);
  ctx.lineTo(52, 56);
  ctx.lineTo(32, 44);
  ctx.lineTo(12, 56);
  ctx.lineTo(20, 36);
  ctx.lineTo(4, 24);
  ctx.lineTo(24, 24);
  ctx.closePath();
  ctx.fill();

  // Inner star
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(32, 12);
  ctx.lineTo(36, 22);
  ctx.lineTo(48, 22);
  ctx.lineTo(38, 30);
  ctx.lineTo(42, 42);
  ctx.lineTo(32, 36);
  ctx.lineTo(22, 42);
  ctx.lineTo(26, 30);
  ctx.lineTo(16, 22);
  ctx.lineTo(28, 22);
  ctx.closePath();
  ctx.fill();

  return canvas;
}

export function generateRobotWalkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; // 4 frames * 64 width
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Generate 4 animation frames
  for (let frame = 0; frame < 4; frame++) {
    const offsetX = frame * 64;

    // Robot body
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(16 + offsetX, 20, 32, 28);

    // Robot head
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(20 + offsetX, 8, 24, 16);

    // Eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(24 + offsetX, 12, 6, 6);
    ctx.fillRect(34 + offsetX, 12, 6, 6);

    // Eye pupils
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(26 + offsetX, 14, 2, 2);
    ctx.fillRect(36 + offsetX, 14, 2, 2);

    // Antenna
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(30 + offsetX, 2, 4, 8);

    // Antenna tip
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(32 + offsetX, 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Arms (animated)
    ctx.fillStyle = '#3b82f6';
    const armOffset = Math.sin(frame * Math.PI / 2) * 4;
    ctx.fillRect(8 + offsetX, 24 + armOffset, 8, 16);
    ctx.fillRect(48 + offsetX, 24 - armOffset, 8, 16);

    // Legs (animated)
    const legOffset = Math.cos(frame * Math.PI / 2) * 3;
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(20 + offsetX, 48 + legOffset, 8, 12);
    ctx.fillRect(36 + offsetX, 48 - legOffset, 8, 12);
  }

  return canvas;
}

// Function to register all generated textures with Phaser
export function registerGeneratedTextures(scene) {
  const robotTexture = generateRobotTexture();
  scene.textures.addCanvas('robot', robotTexture);

  const backgroundTexture = generateBackgroundTexture();
  scene.textures.addCanvas('background', backgroundTexture);

  const obstacleTexture = generateObstacleTexture();
  scene.textures.addCanvas('obstacle', obstacleTexture);

  const goalTexture = generateGoalTexture();
  scene.textures.addCanvas('goal', goalTexture);

  const robotWalkTexture = generateRobotWalkTexture();
  scene.textures.addCanvas('robot-walk', robotWalkTexture);
}