// Game level data structure for robotics game engine
// Supports 30 levels per course with grade-banded content (grades 3-9)

export const LEVEL_DATA = {
  // Grade 3-4: Basic movement and introduction (Levels 1-10)
  grades_3_4: [
    {
      id: 1,
      name: "First Steps",
      description: "Learn to move your robot",
      difficulty: "easy",
      gradeBand: [3, 4],
      objectives: ["Move robot to goal", "Collect 3 stars"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect"]
      },
      obstacles: [],
      goals: [
        { x: 700, y: 300, type: "goal" },
        { x: 300, y: 200, type: "star" },
        { x: 500, y: 400, type: "star" },
        { x: 400, y: 300, type: "star" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right"],
      timeLimit: 120,
      maxScore: 100
    },
    {
      id: 2,
      name: "Obstacle Course",
      description: "Navigate around obstacles",
      difficulty: "easy",
      gradeBand: [3, 4],
      objectives: ["Avoid obstacles", "Reach the goal"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect"]
      },
      obstacles: [
        { x: 300, y: 200, width: 50, height: 200, type: "wall" },
        { x: 500, y: 300, width: 50, height: 200, type: "wall" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop"],
      timeLimit: 180,
      maxScore: 150
    },
    {
      id: 3,
      name: "Star Collector",
      description: "Collect all stars while avoiding obstacles",
      difficulty: "easy",
      gradeBand: [3, 4],
      objectives: ["Collect 5 stars", "Avoid red obstacles"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect"]
      },
      obstacles: [
        { x: 300, y: 200, width: 30, height: 30, type: "danger" },
        { x: 500, y: 400, width: 30, height: 30, type: "danger" },
        { x: 400, y: 300, width: 30, height: 30, type: "danger" }
      ],
      goals: [
        { x: 200, y: 150, type: "star" },
        { x: 350, y: 450, type: "star" },
        { x: 550, y: 200, type: "star" },
        { x: 650, y: 350, type: "star" },
        { x: 450, y: 100, type: "star" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop"],
      timeLimit: 180,
      maxScore: 200
    },
    {
      id: 4,
      name: "Path Finder",
      description: "Find the correct path to the goal",
      difficulty: "easy",
      gradeBand: [3, 4],
      objectives: ["Navigate maze", "Reach the exit"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect"]
      },
      obstacles: [
        { x: 100, y: 100, width: 200, height: 20, type: "wall" },
        { x: 100, y: 100, width: 20, height: 150, type: "wall" },
        { x: 250, y: 150, width: 20, height: 100, type: "wall" },
        { x: 350, y: 100, width: 20, height: 200, type: "wall" }
      ],
      goals: [
        { x: 700, y: 500, type: "goal" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop"],
      timeLimit: 240,
      maxScore: 250
    },
    {
      id: 5,
      name: "Speed Challenge",
      description: "Complete the course as fast as possible",
      difficulty: "easy",
      gradeBand: [3, 4],
      objectives: ["Reach goal quickly", "Collect bonus stars"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect"]
      },
      obstacles: [
        { x: 300, y: 200, width: 20, height: 200, type: "wall" },
        { x: 500, y: 100, width: 20, height: 300, type: "wall" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" },
        { x: 200, y: 400, type: "speed_bonus" },
        { x: 400, y: 200, type: "speed_bonus" },
        { x: 600, y: 400, type: "speed_bonus" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop"],
      timeLimit: 120,
      maxScore: 300
    },
    {
      id: 6,
      name: "Pattern Recognition",
      description: "Follow the pattern to collect items",
      difficulty: "easy",
      gradeBand: [3, 4],
      objectives: ["Collect in correct order", "Follow color pattern"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect"]
      },
      obstacles: [],
      goals: [
        { x: 200, y: 200, type: "star", color: "blue" },
        { x: 300, y: 400, type: "star", color: "red" },
        { x: 400, y: 200, type: "star", color: "blue" },
        { x: 500, y: 400, type: "star", color: "red" },
        { x: 600, y: 200, type: "star", color: "blue" },
        { x: 700, y: 300, type: "goal" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop"],
      timeLimit: 200,
      maxScore: 280
    },
    {
      id: 7,
      name: "Maze Explorer",
      description: "Explore a complex maze",
      difficulty: "easy",
      gradeBand: [3, 4],
      objectives: ["Navigate maze", "Find hidden items"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect"]
      },
      obstacles: [
        { x: 100, y: 50, width: 150, height: 20, type: "wall" },
        { x: 100, y: 50, width: 20, height: 200, type: "wall" },
        { x: 200, y: 150, width: 20, height: 150, type: "wall" },
        { x: 300, y: 50, width: 20, height: 200, type: "wall" },
        { x: 400, y: 100, width: 150, height: 20, type: "wall" },
        { x: 500, y: 50, width: 20, height: 200, type: "wall" }
      ],
      goals: [
        { x: 700, y: 500, type: "goal" },
        { x: 150, y: 300, type: "hidden_item" },
        { x: 350, y: 250, type: "hidden_item" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop"],
      timeLimit: 300,
      maxScore: 320
    },
    {
      id: 8,
      name: "Memory Test",
      description: "Remember the path and repeat it",
      difficulty: "easy",
      gradeBand: [3, 4],
      objectives: ["Watch demo path", "Repeat the path"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect"]
      },
      obstacles: [
        { x: 300, y: 200, width: 20, height: 200, type: "wall" },
        { x: 500, y: 300, width: 20, height: 200, type: "wall" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "memory"],
      timeLimit: 240,
      maxScore: 350
    },
    {
      id: 9,
      name: "Timing Challenge",
      description: "Time your movements perfectly",
      difficulty: "easy",
      gradeBand: [3, 4],
      objectives: ["Navigate moving obstacles", "Reach goal safely"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect"]
      },
      obstacles: [
        { x: 300, y: 200, width: 30, height: 30, type: "moving_obstacle", direction: "vertical" },
        { x: 400, y: 300, width: 30, height: 30, type: "moving_obstacle", direction: "horizontal" },
        { x: 500, y: 400, width: 30, height: 30, type: "moving_obstacle", direction: "vertical" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "wait"],
      timeLimit: 180,
      maxScore: 380
    },
    {
      id: 10,
      name: "Collection Master",
      description: "Collect all items in the grid",
      difficulty: "easy",
      gradeBand: [3, 4],
      objectives: ["Collect all 8 items", "Return to start"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect"]
      },
      obstacles: [],
      goals: [
        { x: 200, y: 200, type: "star" },
        { x: 300, y: 400, type: "star" },
        { x: 400, y: 200, type: "star" },
        { x: 500, y: 400, type: "star" },
        { x: 600, y: 200, type: "star" },
        { x: 700, y: 400, type: "star" },
        { x: 200, y: 400, type: "star" },
        { x: 600, y: 400, type: "star" },
        { x: 100, y: 300, type: "return_point" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop"],
      timeLimit: 300,
      maxScore: 400
    }
  ],

  // Grade 5-6: Intermediate programming and sensors (Levels 11-20)
  grades_5_6: [
    {
      id: 11,
      name: "Sensor Introduction",
      description: "Use sensors to detect objects",
      difficulty: "medium",
      gradeBand: [5, 6],
      objectives: ["Use distance sensor", "Navigate to goal"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect", "sensors"]
      },
      obstacles: [
        { x: 300, y: 150, width: 30, height: 100, type: "wall" },
        { x: 300, y: 350, width: 30, height: 100, type: "wall" },
        { x: 500, y: 200, width: 30, height: 200, type: "wall" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" },
        { x: 400, y: 300, type: "sensor_pickup" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "if_sensor", "sensor_distance"],
      timeLimit: 240,
      maxScore: 200
    },
    {
      id: 12,
      name: "Maze Runner",
      description: "Program your robot through a maze",
      difficulty: "medium",
      gradeBand: [5, 6],
      objectives: ["Navigate maze", "Use sensor logic"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect", "sensors"]
      },
      obstacles: [
        // Maze walls
        { x: 100, y: 100, width: 200, height: 20, type: "wall" },
        { x: 100, y: 100, width: 20, height: 200, type: "wall" },
        { x: 300, y: 100, width: 20, height: 150, type: "wall" },
        { x: 300, y: 300, width: 200, height: 20, type: "wall" },
        { x: 500, y: 200, width: 20, height: 150, type: "wall" }
      ],
      goals: [
        { x: 700, y: 500, type: "goal" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "if_sensor", "sensor_distance", "nested_loop"],
      timeLimit: 300,
      maxScore: 250
    },
    {
      id: 13,
      name: "Sensor Maze",
      description: "Use sensors to navigate invisible maze",
      difficulty: "medium",
      gradeBand: [5, 6],
      objectives: ["Use distance sensor", "Navigate invisible walls"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect", "sensors"]
      },
      obstacles: [
        { x: 150, y: 100, width: 20, height: 150, type: "invisible_wall" },
        { x: 300, y: 150, width: 20, height: 200, type: "invisible_wall" },
        { x: 450, y: 100, width: 20, height: 150, type: "invisible_wall" },
        { x: 600, y: 200, width: 20, height: 200, type: "invisible_wall" }
      ],
      goals: [
        { x: 700, y: 500, type: "goal" },
        { x: 350, y: 300, type: "sensor_hint" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "if_sensor", "sensor_distance"],
      timeLimit: 300,
      maxScore: 280
    },
    {
      id: 14,
      name: "Color Coded",
      description: "Follow color-coded paths",
      difficulty: "medium",
      gradeBand: [5, 6],
      objectives: ["Use color sensor", "Follow correct colors"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect", "sensors"]
      },
      obstacles: [
        { x: 200, y: 200, width: 20, height: 200, type: "color_barrier", color: "blue" },
        { x: 400, y: 100, width: 20, height: 200, type: "color_barrier", color: "red" },
        { x: 600, y: 200, width: 20, height: 200, type: "color_barrier", color: "green" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" },
        { x: 300, y: 300, type: "color_key", color: "blue" },
        { x: 500, y: 300, type: "color_key", color: "red" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "if_sensor", "sensor_color"],
      timeLimit: 320,
      maxScore: 300
    },
    {
      id: 15,
      name: "Loop Master",
      description: "Master loop structures for efficiency",
      difficulty: "medium",
      gradeBand: [5, 6],
      objectives: ["Use nested loops", "Optimize path"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect", "sensors"]
      },
      obstacles: [
        { x: 100, y: 100, width: 20, height: 100, type: "wall" },
        { x: 100, y: 200, width: 100, height: 20, type: "wall" },
        { x: 200, y: 100, width: 20, height: 100, type: "wall" },
        { x: 300, y: 100, width: 100, height: 20, type: "wall" }
      ],
      goals: [
        { x: 700, y: 500, type: "goal" },
        { x: 150, y: 150, type: "star" },
        { x: 250, y: 150, type: "star" },
        { x: 350, y: 150, type: "star" },
        { x: 450, y: 150, type: "star" },
        { x: 550, y: 150, type: "star" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "nested_loop", "if_sensor"],
      timeLimit: 360,
      maxScore: 320
    },
    {
      id: 16,
      name: "Touch Detection",
      description: "Use touch sensors for precise navigation",
      difficulty: "medium",
      gradeBand: [5, 6],
      objectives: ["Navigate narrow passages", "Use touch feedback"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect", "sensors"]
      },
      obstacles: [
        { x: 250, y: 250, width: 100, height: 20, type: "narrow_passage" },
        { x: 250, y: 330, width: 100, height: 20, type: "narrow_passage" },
        { x: 450, y: 200, width: 100, height: 20, type: "narrow_passage" },
        { x: 450, y: 380, width: 100, height: 20, type: "narrow_passage" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "if_sensor", "sensor_touch"],
      timeLimit: 280,
      maxScore: 310
    },
    {
      id: 17,
      name: "Pattern Following",
      description: "Follow complex patterns with sensors",
      difficulty: "medium",
      gradeBand: [5, 6],
      objectives: ["Detect pattern", "Follow sequence"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect", "sensors"]
      },
      obstacles: [],
      goals: [
        { x: 200, y: 200, type: "pattern_point", pattern: 1 },
        { x: 300, y: 400, type: "pattern_point", pattern: 2 },
        { x: 400, y: 200, type: "pattern_point", pattern: 3 },
        { x: 500, y: 400, type: "pattern_point", pattern: 1 },
        { x: 600, y: 200, type: "pattern_point", pattern: 2 },
        { x: 700, y: 300, type: "goal" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "if_sensor", "sensor_line"],
      timeLimit: 300,
      maxScore: 330
    },
    {
      id: 18,
      name: "Conditional Logic",
      description: "Use conditional statements effectively",
      difficulty: "medium",
      gradeBand: [5, 6],
      objectives: ["Make decisions based on sensors", "Navigate dynamic environment"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect", "sensors"]
      },
      obstacles: [
        { x: 300, y: 200, width: 30, height: 30, type: "dynamic_obstacle" },
        { x: 400, y: 300, width: 30, height: 30, type: "dynamic_obstacle" },
        { x: 500, y: 400, width: 30, height: 30, type: "dynamic_obstacle" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" },
        { x: 200, y: 400, type: "conditional_bonus" },
        { x: 600, y: 200, type: "conditional_bonus" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "if_sensor", "sensor_distance", "else"],
      timeLimit: 320,
      maxScore: 340
    },
    {
      id: 19,
      name: "Multi-Sensor Challenge",
      description: "Combine multiple sensor inputs",
      difficulty: "medium",
      gradeBand: [5, 6],
      objectives: ["Use distance and color sensors", "Navigate complex environment"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect", "sensors"]
      },
      obstacles: [
        { x: 150, y: 100, width: 20, height: 150, type: "color_wall", color: "blue" },
        { x: 300, y: 150, width: 20, height: 200, type: "invisible_wall" },
        { x: 450, y: 100, width: 20, height: 150, type: "color_wall", color: "red" },
        { x: 600, y: 200, width: 20, height: 200, type: "moving_wall" }
      ],
      goals: [
        { x: 700, y: 500, type: "goal" },
        { x: 250, y: 300, type: "sensor_pickup", sensor: "color" },
        { x: 500, y: 300, type: "sensor_pickup", sensor: "distance" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "if_sensor", "sensor_distance", "sensor_color", "and"],
      timeLimit: 360,
      maxScore: 360
    },
    {
      id: 20,
      name: "Efficiency Expert",
      description: "Complete the level with minimum steps",
      difficulty: "medium",
      gradeBand: [5, 6],
      objectives: ["Minimize movements", "Achieve efficiency bonus"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect", "sensors"]
      },
      obstacles: [
        { x: 300, y: 200, width: 20, height: 200, type: "wall" },
        { x: 500, y: 300, width: 20, height: 200, type: "wall" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" },
        { x: 200, y: 400, type: "efficiency_bonus" },
        { x: 400, y: 200, type: "efficiency_bonus" },
        { x: 600, y: 400, type: "efficiency_bonus" }
      ],
      programmingBlocks: ["move_forward", "move_backward", "turn_left", "turn_right", "loop", "if_sensor", "variable"],
      timeLimit: 240,
      maxScore: 380
    }
  ],

  // Grade 7-9: Advanced robotics and algorithms (Levels 21-30)
  grades_7_9: [
    {
      id: 21,
      name: "Algorithm Master",
      description: "Implement complex pathfinding",
      difficulty: "hard",
      gradeBand: [7, 8, 9],
      objectives: ["Find optimal path", "Minimize steps"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect", "sensors", "advanced"]
      },
      obstacles: [
        // Complex maze
        { x: 100, y: 100, width: 150, height: 20, type: "wall" },
        { x: 100, y: 100, width: 20, height: 200, type: "wall" },
        { x: 250, y: 150, width: 20, height: 150, type: "wall" },
        { x: 350, y: 100, width: 20, height: 200, type: "wall" },
        { x: 400, y: 200, width: 150, height: 20, type: "wall" },
        { x: 500, y: 100, width: 20, height: 200, type: "wall" },
        { x: 600, y: 150, width: 100, height: 20, type: "wall" }
      ],
      goals: [
        { x: 700, y: 500, type: "goal" },
        { x: 200, y: 400, type: "efficiency_bonus" },
        { x: 450, y: 350, type: "efficiency_bonus" }
      ],
      programmingBlocks: [
        "move_forward", "move_backward", "turn_left", "turn_right", 
        "loop", "if_sensor", "sensor_distance", "nested_loop",
        "function", "variable", "array", "pathfinding"
      ],
      timeLimit: 420,
      maxScore: 350
    },
    {
      id: 22,
      name: "Robot Competition",
      description: "Compete against time and efficiency",
      difficulty: "hard",
      gradeBand: [7, 8, 9],
      objectives: ["Complete fastest", "Use optimal algorithm"],
      robot: {
        startPosition: { x: 50, y: 300 },
        abilities: ["move", "collect", "sensors", "advanced"]
      },
      obstacles: [
        { x: 200, y: 100, width: 20, height: 150, type: "moving_wall" },
        { x: 200, y: 350, width: 20, height: 150, type: "moving_wall" },
        { x: 400, y: 200, width: 20, height: 200, type: "wall" },
        { x: 600, y: 100, width: 20, height: 150, type: "moving_wall" },
        { x: 600, y: 350, width: 20, height: 150, type: "moving_wall" }
      ],
      goals: [
        { x: 750, y: 300, type: "goal" },
        { x: 300, y: 300, type: "speed_bonus" },
        { x: 500, y: 300, type: "speed_bonus" }
      ],
      programmingBlocks: [
        "move_forward", "move_backward", "turn_left", "turn_right", 
        "loop", "if_sensor", "sensor_distance", "nested_loop",
        "function", "variable", "array", "pathfinding", "timing"
      ],
      timeLimit: 300,
      maxScore: 400
    },
    {
      id: 23,
      name: "Function Factory",
      description: "Create and use custom functions",
      difficulty: "hard",
      gradeBand: [7, 8, 9],
      objectives: ["Define functions", "Reuse code efficiently"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect", "sensors", "advanced"]
      },
      obstacles: [
        { x: 150, y: 100, width: 20, height: 100, type: "wall" },
        { x: 250, y: 150, width: 20, height: 150, type: "wall" },
        { x: 350, y: 100, width: 20, height: 100, type: "wall" },
        { x: 450, y: 150, width: 20, height: 150, type: "wall" },
        { x: 550, y: 100, width: 20, height: 100, type: "wall" }
      ],
      goals: [
        { x: 700, y: 500, type: "goal" },
        { x: 200, y: 300, type: "function_challenge" },
        { x: 400, y: 300, type: "function_challenge" },
        { x: 600, y: 300, type: "function_challenge" }
      ],
      programmingBlocks: [
        "move_forward", "move_backward", "turn_left", "turn_right", 
        "loop", "if_sensor", "sensor_distance", "nested_loop",
        "function", "variable", "call_function"
      ],
      timeLimit: 420,
      maxScore: 380
    },
    {
      id: 24,
      name: "Variable Master",
      description: "Use variables to track state",
      difficulty: "hard",
      gradeBand: [7, 8, 9],
      objectives: ["Track variables", "Make decisions based on state"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect", "sensors", "advanced"]
      },
      obstacles: [
        { x: 300, y: 200, width: 30, height: 30, type: "counter_obstacle" },
        { x: 400, y: 300, width: 30, height: 30, type: "counter_obstacle" },
        { x: 500, y: 400, width: 30, height: 30, type: "counter_obstacle" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" },
        { x: 200, y: 400, type: "variable_pickup", variable: "counter" },
        { x: 600, y: 200, type: "variable_pickup", variable: "score" }
      ],
      programmingBlocks: [
        "move_forward", "move_backward", "turn_left", "turn_right", 
        "loop", "if_sensor", "sensor_distance", "nested_loop",
        "function", "variable", "increment", "decrement", "if_variable"
      ],
      timeLimit: 400,
      maxScore: 400
    },
    {
      id: 25,
      name: "Array Adventures",
      description: "Use arrays to manage collections",
      difficulty: "hard",
      gradeBand: [7, 8, 9],
      objectives: ["Collect items into array", "Process array data"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect", "sensors", "advanced"]
      },
      obstacles: [
        { x: 200, y: 150, width: 20, height: 100, type: "wall" },
        { x: 400, y: 100, width: 20, height: 200, type: "wall" },
        { x: 600, y: 150, width: 20, height: 100, type: "wall" }
      ],
      goals: [
        { x: 700, y: 500, type: "goal" },
        { x: 150, y: 300, type: "array_item", index: 0 },
        { x: 300, y: 200, type: "array_item", index: 1 },
        { x: 450, y: 300, type: "array_item", index: 2 },
        { x: 550, y: 200, type: "array_item", index: 3 }
      ],
      programmingBlocks: [
        "move_forward", "move_backward", "turn_left", "turn_right", 
        "loop", "if_sensor", "sensor_distance", "nested_loop",
        "function", "variable", "array", "array_push", "array_pop", "for_each"
      ],
      timeLimit: 440,
      maxScore: 420
    },
    {
      id: 26,
      name: "Pathfinding Pro",
      description: "Implement pathfinding algorithms",
      difficulty: "hard",
      gradeBand: [7, 8, 9],
      objectives: ["Find optimal path", "Minimize distance"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect", "sensors", "advanced"]
      },
      obstacles: [
        // Complex maze requiring pathfinding
        { x: 100, y: 100, width: 150, height: 20, type: "wall" },
        { x: 100, y: 100, width: 20, height: 200, type: "wall" },
        { x: 250, y: 150, width: 20, height: 150, type: "wall" },
        { x: 350, y: 100, width: 20, height: 200, type: "wall" },
        { x: 400, y: 200, width: 150, height: 20, type: "wall" },
        { x: 500, y: 100, width: 20, height: 200, type: "wall" },
        { x: 600, y: 150, width: 20, height: 150, type: "wall" },
        { x: 650, y: 200, width: 100, height: 20, type: "wall" }
      ],
      goals: [
        { x: 750, y: 500, type: "goal" },
        { x: 200, y: 400, type: "path_bonus" },
        { x: 450, y: 350, type: "path_bonus" },
        { x: 700, y: 400, type: "path_bonus" }
      ],
      programmingBlocks: [
        "move_forward", "move_backward", "turn_left", "turn_right", 
        "loop", "if_sensor", "sensor_distance", "nested_loop",
        "function", "variable", "array", "pathfinding", "a_star", "dijkstra"
      ],
      timeLimit: 480,
      maxScore: 450
    },
    {
      id: 27,
      name: "Timing Master",
      description: "Master timing and synchronization",
      difficulty: "hard",
      gradeBand: [7, 8, 9],
      objectives: ["Synchronize with moving elements", "Time movements precisely"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect", "sensors", "advanced"]
      },
      obstacles: [
        { x: 300, y: 200, width: 30, height: 30, type: "timed_obstacle", period: 2000 },
        { x: 400, y: 300, width: 30, height: 30, type: "timed_obstacle", period: 1500 },
        { x: 500, y: 400, width: 30, height: 30, type: "timed_obstacle", period: 1800 },
        { x: 600, y: 250, width: 30, height: 30, type: "timed_obstacle", period: 2200 }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" },
        { x: 200, y: 400, type: "timing_bonus" },
        { x: 450, y: 200, type: "timing_bonus" }
      ],
      programmingBlocks: [
        "move_forward", "move_backward", "turn_left", "turn_right", 
        "loop", "if_sensor", "sensor_distance", "nested_loop",
        "function", "variable", "timing", "wait", "sync"
      ],
      timeLimit: 360,
      maxScore: 430
    },
    {
      id: 28,
      name: "Recursive Robot",
      description: "Use recursion for complex problems",
      difficulty: "hard",
      gradeBand: [7, 8, 9],
      objectives: ["Implement recursive solutions", "Solve nested challenges"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect", "sensors", "advanced"]
      },
      obstacles: [
        { x: 150, y: 100, width: 20, height: 100, type: "wall" },
        { x: 250, y: 150, width: 20, height: 150, type: "wall" },
        { x: 350, y: 100, width: 20, height: 100, type: "wall" },
        { x: 450, y: 150, width: 20, height: 150, type: "wall" },
        { x: 550, y: 100, width: 20, height: 100, type: "wall" }
      ],
      goals: [
        { x: 700, y: 500, type: "goal" },
        { x: 200, y: 300, type: "recursive_challenge", depth: 1 },
        { x: 400, y: 300, type: "recursive_challenge", depth: 2 },
        { x: 600, y: 300, type: "recursive_challenge", depth: 3 }
      ],
      programmingBlocks: [
        "move_forward", "move_backward", "turn_left", "turn_right", 
        "loop", "if_sensor", "sensor_distance", "nested_loop",
        "function", "variable", "recursion", "recursive_function", "base_case"
      ],
      timeLimit: 500,
      maxScore: 470
    },
    {
      id: 29,
      name: "State Machine",
      description: "Implement state machine logic",
      difficulty: "hard",
      gradeBand: [7, 8, 9],
      objectives: ["Manage robot states", "Transition between states"],
      robot: {
        startPosition: { x: 100, y: 300 },
        abilities: ["move", "collect", "sensors", "advanced"]
      },
      obstacles: [
        { x: 300, y: 200, width: 30, height: 30, type: "state_trigger", state: "alert" },
        { x: 400, y: 300, width: 30, height: 30, type: "state_trigger", state: "danger" },
        { x: 500, y: 400, width: 30, height: 30, type: "state_trigger", state: "safe" }
      ],
      goals: [
        { x: 700, y: 300, type: "goal" },
        { x: 200, y: 400, type: "state pickup", state: "normal" },
        { x: 600, y: 200, type: "state pickup", state: "careful" }
      ],
      programmingBlocks: [
        "move_forward", "move_backward", "turn_left", "turn_right", 
        "loop", "if_sensor", "sensor_distance", "nested_loop",
        "function", "variable", "state", "state_machine", "transition", "in_state"
      ],
      timeLimit: 420,
      maxScore: 460
    },
    {
      id: 30,
      name: "Grand Challenge",
      description: "Master all robotics concepts",
      difficulty: "hard",
      gradeBand: [7, 8, 9],
      objectives: ["Use all learned skills", "Complete ultimate challenge"],
      robot: {
        startPosition: { x: 50, y: 50 },
        abilities: ["move", "collect", "sensors", "advanced"]
      },
      obstacles: [
        // Ultimate challenge maze
        { x: 100, y: 100, width: 100, height: 20, type: "wall" },
        { x: 100, y: 100, width: 20, height: 150, type: "wall" },
        { x: 200, y: 150, width: 20, height: 100, type: "moving_wall" },
        { x: 300, y: 100, width: 20, height: 200, type: "invisible_wall" },
        { x: 400, y: 200, width: 100, height: 20, type: "color_wall", color: "blue" },
        { x: 500, y: 100, width: 20, height: 150, type: "wall" },
        { x: 600, y: 150, width: 20, height: 200, type: "timed_obstacle", period: 3000 },
        { x: 650, y: 200, width: 100, height: 20, type: "wall" }
      ],
      goals: [
        { x: 750, y: 500, type: "goal" },
        { x: 150, y: 300, type: "ultimate_bonus", type: "efficiency" },
        { x: 350, y: 250, type: "ultimate_bonus", type: "sensor" },
        { x: 550, y: 350, type: "ultimate_bonus", type: "timing" },
        { x: 700, y: 300, type: "ultimate_bonus", type: "algorithm" }
      ],
      programmingBlocks: [
        "move_forward", "move_backward", "turn_left", "turn_right", 
        "loop", "if_sensor", "sensor_distance", "nested_loop",
        "function", "variable", "array", "pathfinding", "timing",
        "recursion", "state_machine", "all_skills"
      ],
      timeLimit: 600,
      maxScore: 500
    }
  ]
};

// Programming block definitions for visual interface
export const PROGRAMMING_BLOCKS = {
  movement: [
    { id: "move_forward", label: "Move Forward", color: "#3b82f6", category: "movement" },
    { id: "move_backward", label: "Move Backward", color: "#3b82f6", category: "movement" },
    { id: "turn_left", label: "Turn Left", color: "#3b82f6", category: "movement" },
    { id: "turn_right", label: "Turn Right", color: "#3b82f6", category: "movement" },
    { id: "move_to", label: "Move To", color: "#3b82f6", category: "movement" }
  ],
  control: [
    { id: "loop", label: "Loop", color: "#f59e0b", category: "control" },
    { id: "nested_loop", label: "Nested Loop", color: "#f59e0b", category: "control" },
    { id: "if_sensor", label: "If Sensor", color: "#f59e0b", category: "control" },
    { id: "wait", label: "Wait", color: "#f59e0b", category: "control" },
    { id: "repeat", label: "Repeat", color: "#f59e0b", category: "control" }
  ],
  sensors: [
    { id: "sensor_distance", label: "Distance Sensor", color: "#10b981", category: "sensors" },
    { id: "sensor_touch", label: "Touch Sensor", color: "#10b981", category: "sensors" },
    { id: "sensor_color", label: "Color Sensor", color: "#10b981", category: "sensors" },
    { id: "sensor_line", label: "Line Sensor", color: "#10b981", category: "sensors" }
  ],
  advanced: [
    { id: "function", label: "Function", color: "#8b5cf6", category: "advanced" },
    { id: "variable", label: "Variable", color: "#8b5cf6", category: "advanced" },
    { id: "array", label: "Array", color: "#8b5cf6", category: "advanced" },
    { id: "pathfinding", label: "Pathfinding", color: "#8b5cf6", category: "advanced" },
    { id: "timing", label: "Timing", color: "#8b5cf6", category: "advanced" }
  ]
};

// Helper function to get level by ID and grade
export function getLevelById(levelId, studentGrade) {
  const allLevels = [
    ...LEVEL_DATA.grades_3_4,
    ...LEVEL_DATA.grades_5_6,
    ...LEVEL_DATA.grades_7_9
  ];
  
  const level = allLevels.find(l => l.id === levelId);
  
  // Check if level is appropriate for student's grade
  if (level && !level.gradeBand.includes(studentGrade)) {
    console.warn(`Level ${levelId} is not designed for grade ${studentGrade}`);
  }
  
  return level;
}

// Helper function to get levels for a specific grade
export function getLevelsByGrade(studentGrade) {
  if (studentGrade <= 4) return LEVEL_DATA.grades_3_4;
  if (studentGrade <= 6) return LEVEL_DATA.grades_5_6;
  return LEVEL_DATA.grades_7_9;
}

// Helper function to get next level
export function getNextLevel(currentLevelId, studentGrade) {
  const levels = getLevelsByGrade(studentGrade);
  const currentIndex = levels.findIndex(l => l.id === currentLevelId);
  
  if (currentIndex < levels.length - 1) {
    return levels[currentIndex + 1];
  }
  
  return null; // No more levels in this grade band
}