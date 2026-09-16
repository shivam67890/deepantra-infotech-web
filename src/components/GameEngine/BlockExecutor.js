// Block execution engine - translates visual programming blocks into game commands
// This bridges the Scratch-like interface with the Phaser game engine

export class BlockExecutor {
  constructor(gameScene) {
    this.gameScene = gameScene;
    this.executionQueue = [];
    this.isExecuting = false;
    this.currentBlockIndex = 0;
    this.variables = {};
    this.functions = {};
    this.robotState = {
      x: 0,
      y: 0,
      rotation: 0,
      speed: 200
    };
  }

  // Execute a program of blocks
  async executeProgram(blocks) {
    if (this.isExecuting) {
      console.warn('Program already executing');
      return;
    }

    this.isExecuting = true;
    this.executionQueue = this.parseBlocks(blocks);
    this.currentBlockIndex = 0;
    this.variables = {};
    this.functions = {};

    // Reset robot to starting position
    if (this.gameScene.robot) {
      this.robotState.x = this.gameScene.robot.x;
      this.robotState.y = this.gameScene.robot.y;
      this.robotState.rotation = 0;
    }

    try {
      await this.executeQueue();
      console.log('Program execution completed');
      return { success: true, blocksExecuted: this.currentBlockIndex };
    } catch (error) {
      console.error('Program execution error:', error);
      return { success: false, error: error.message, blocksExecuted: this.currentBlockIndex };
    } finally {
      this.isExecuting = false;
    }
  }

  // Parse blocks into executable commands
  parseBlocks(blocks) {
    return blocks.map(block => ({
      type: block.id,
      params: this.extractBlockParams(block),
      originalBlock: block
    }));
  }

  // Extract parameters from blocks (would be expanded based on block UI)
  extractBlockParams(block) {
    const params = {};
    
    // Different blocks have different parameters
    switch (block.id) {
      case 'move_forward':
      case 'move_backward':
        params.distance = 100; // Default distance
        break;
      case 'turn_left':
      case 'turn_right':
        params.angle = 90; // Default turn angle
        break;
      case 'loop':
        params.iterations = 3; // Default loop count
        break;
      case 'wait':
        params.duration = 1000; // Default wait time in ms
        break;
      case 'if_sensor':
        params.condition = 'distance'; // Default condition
        params.threshold = 50; // Default threshold
        break;
      default:
        break;
    }
    
    return params;
  }

  // Execute the command queue
  async executeQueue() {
    while (this.currentBlockIndex < this.executionQueue.length) {
      const command = this.executionQueue[this.currentBlockIndex];
      await this.executeCommand(command);
      this.currentBlockIndex++;
    }
  }

  // Execute a single command
  async executeCommand(command) {
    const { type, params } = command;

    switch (type) {
      // Movement commands
      case 'move_forward':
        await this.moveForward(params.distance);
        break;
      case 'move_backward':
        await this.moveBackward(params.distance);
        break;
      case 'turn_left':
        await this.turnLeft(params.angle);
        break;
      case 'turn_right':
        await this.turnRight(params.angle);
        break;
      case 'move_to':
        await this.moveTo(params.x, params.y);
        break;

      // Control commands
      case 'loop':
        await this.executeLoop(params.iterations, command);
        break;
      case 'nested_loop':
        await this.executeNestedLoop(params.outerIterations, params.innerIterations);
        break;
      case 'if_sensor':
        await this.executeIfSensor(params.condition, params.threshold);
        break;
      case 'wait':
        await this.wait(params.duration);
        break;
      case 'repeat':
        await this.executeRepeat(params.times);
        break;

      // Sensor commands
      case 'sensor_distance':
        await this.checkDistanceSensor();
        break;
      case 'sensor_touch':
        await this.checkTouchSensor();
        break;
      case 'sensor_color':
        await this.checkColorSensor(params.color);
        break;
      case 'sensor_line':
        await this.checkLineSensor();

      // Advanced commands
      case 'function':
        await this.defineFunction(params.name, params.body);
        break;
      case 'variable':
        await this.handleVariable(params.name, params.operation, params.value);
        break;
      case 'array':
        await this.handleArray(params.operation, params.array, params.value, params.index);
        break;
      case 'pathfinding':
        await this.executePathfinding(params.algorithm);
        break;
      case 'timing':
        await this.handleTiming(params.operation, params.duration);
        break;

      default:
        console.warn(`Unknown command type: ${type}`);
        break;
    }
  }

  // Movement implementations
  async moveForward(distance) {
    if (!this.gameScene.robot) return;

    const robot = this.gameScene.robot;
    const duration = (distance / this.robotState.speed) * 1000;

    // Move robot forward
    const targetX = robot.x + distance;
    this.gameScene.tweens.add({
      targets: robot,
      x: targetX,
      duration: duration,
      ease: 'Linear'
    });

    await this.wait(duration);
    this.robotState.x = targetX;
  }

  async moveBackward(distance) {
    if (!this.gameScene.robot) return;

    const robot = this.gameScene.robot;
    const duration = (distance / this.robotState.speed) * 1000;

    // Move robot backward
    const targetX = robot.x - distance;
    this.gameScene.tweens.add({
      targets: robot,
      x: targetX,
      duration: duration,
      ease: 'Linear'
    });

    await this.wait(duration);
    this.robotState.x = targetX;
  }

  async turnLeft(angle) {
    if (!this.gameScene.robot) return;

    const robot = this.gameScene.robot;
    const duration = 500; // Fixed duration for turns

    // Rotate robot left
    this.gameScene.tweens.add({
      targets: robot,
      angle: robot.angle - angle,
      duration: duration,
      ease: 'Linear'
    });

    await this.wait(duration);
    this.robotState.rotation -= angle;
  }

  async turnRight(angle) {
    if (!this.gameScene.robot) return;

    const robot = this.gameScene.robot;
    const duration = 500;

    // Rotate robot right
    this.gameScene.tweens.add({
      targets: robot,
      angle: robot.angle + angle,
      duration: duration,
      ease: 'Linear'
    });

    await this.wait(duration);
    this.robotState.rotation += angle;
  }

  async moveTo(x, y) {
    if (!this.gameScene.robot) return;

    const robot = this.gameScene.robot;
    const distance = Math.sqrt(Math.pow(x - robot.x, 2) + Math.pow(y - robot.y, 2));
    const duration = (distance / this.robotState.speed) * 1000;

    // Move robot to specific position
    this.gameScene.tweens.add({
      targets: robot,
      x: x,
      y: y,
      duration: duration,
      ease: 'Linear'
    });

    await this.wait(duration);
    this.robotState.x = x;
    this.robotState.y = y;
  }

  // Control implementations
  async executeLoop(iterations, command) {
    for (let i = 0; i < iterations; i++) {
      // Execute the commands inside the loop
      // In a full implementation, this would parse nested blocks
      console.log(`Loop iteration ${i + 1}/${iterations}`);
      await this.wait(100); // Simulate loop body execution
    }
  }

  async executeNestedLoop(outerIterations, innerIterations) {
    for (let i = 0; i < outerIterations; i++) {
      for (let j = 0; j < innerIterations; j++) {
        console.log(`Nested loop: ${i + 1}/${outerIterations}, ${j + 1}/${innerIterations}`);
        await this.wait(50);
      }
    }
  }

  async executeIfSensor(condition, threshold) {
    const sensorValue = await this.getSensorValue(condition);
    
    if (sensorValue < threshold) {
      console.log(`Condition met: ${condition} = ${sensorValue} < ${threshold}`);
      // Execute if-branch logic here
    } else {
      console.log(`Condition not met: ${condition} = ${sensorValue} >= ${threshold}`);
    }
  }

  async wait(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  async executeRepeat(times) {
    for (let i = 0; i < times; i++) {
      console.log(`Repeat ${i + 1}/${times}`);
      await this.wait(100);
    }
  }

  // Sensor implementations
  async checkDistanceSensor() {
    if (!this.gameScene.robot) return 999;

    const robot = this.gameScene.robot;
    const obstacles = this.gameScene.obstacles?.getChildren() || [];
    
    let minDistance = 999;
    
    obstacles.forEach(obstacle => {
      const distance = Phaser.Math.Distance.Between(
        robot.x, robot.y,
        obstacle.x, obstacle.y
      );
      minDistance = Math.min(minDistance, distance);
    });

    console.log(`Distance sensor: ${minDistance}`);
    return minDistance;
  }

  async checkTouchSensor() {
    if (!this.gameScene.robot) return false;

    const robot = this.gameScene.robot;
    const obstacles = this.gameScene.obstacles?.getChildren() || [];
    
    let touching = false;
    
    obstacles.forEach(obstacle => {
      const distance = Phaser.Math.Distance.Between(
        robot.x, robot.y,
        obstacle.x, obstacle.y
      );
      if (distance < 50) { // Touch threshold
        touching = true;
      }
    });

    console.log(`Touch sensor: ${touching}`);
    return touching;
  }

  async checkColorSensor(expectedColor) {
    // Simulated color detection
    console.log(`Color sensor checking for: ${expectedColor}`);
    return true; // Placeholder
  }

  async checkLineSensor() {
    // Simulated line detection
    console.log('Line sensor activated');
    return false; // Placeholder
  }

  async getSensorValue(sensorType) {
    switch (sensorType) {
      case 'distance':
        return await this.checkDistanceSensor();
      case 'touch':
        return await this.checkTouchSensor() ? 0 : 999;
      case 'color':
        return await this.checkColorSensor() ? 0 : 999;
      default:
        return 999;
    }
  }

  // Advanced implementations
  async defineFunction(name, body) {
    console.log(`Defining function: ${name}`);
    this.functions[name] = body;
  }

  async handleVariable(name, operation, value) {
    switch (operation) {
      case 'set':
        this.variables[name] = value;
        break;
      case 'get':
        return this.variables[name];
      case 'increment':
        this.variables[name] = (this.variables[name] || 0) + 1;
        break;
      case 'decrement':
        this.variables[name] = (this.variables[name] || 0) - 1;
        break;
      default:
        console.warn(`Unknown variable operation: ${operation}`);
    }
    console.log(`Variable ${name}:`, this.variables[name]);
  }

  async handleArray(operation, array, value, index) {
    if (!this.variables[array]) {
      this.variables[array] = [];
    }

    switch (operation) {
      case 'push':
        this.variables[array].push(value);
        break;
      case 'pop':
        return this.variables[array].pop();
      case 'get':
        return this.variables[array][index];
      case 'set':
        this.variables[array][index] = value;
        break;
      default:
        console.warn(`Unknown array operation: ${operation}`);
    }
    console.log(`Array ${array}:`, this.variables[array]);
  }

  async executePathfinding(algorithm) {
    console.log(`Executing pathfinding with ${algorithm}`);
    // Placeholder for pathfinding algorithms
    await this.wait(500);
  }

  async handleTiming(operation, duration) {
    switch (operation) {
      case 'wait':
        await this.wait(duration);
        break;
      case 'timestamp':
        return Date.now();
      default:
        console.warn(`Unknown timing operation: ${operation}`);
    }
  }

  // Stop execution
  stop() {
    this.isExecuting = false;
    this.executionQueue = [];
    this.currentBlockIndex = 0;
    console.log('Program execution stopped');
  }

  // Get current execution status
  getStatus() {
    return {
      isExecuting: this.isExecuting,
      currentBlockIndex: this.currentBlockIndex,
      totalBlocks: this.executionQueue.length,
      variables: this.variables,
      functions: this.functions
    };
  }
}