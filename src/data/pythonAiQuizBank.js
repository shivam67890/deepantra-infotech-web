// Dedicated Question Bank for "Python from Scratch to AI"
// Tagged by courseSlug, moduleId (1-10), levelNumber, topic, difficulty
// Plugs directly into the existing QUESTION_BANK[] structure in quizQuestions.js

export const PYTHON_AI_QUIZ_BANK = [
  // =========================================================================
  // Module 1 — Python Basics (Level 3 Quiz)
  // =========================================================================
  {
    id: 'pyai-m1-q1',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 1,
    levelNumber: 3,
    topic: 'python',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'In Python, what does `type(3.14)` return?',
    code: 'x = 3.14\nprint(type(x))',
    options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'decimal'>"],
    correctIndex: 1,
    explanation: 'Numbers with decimals are the `float` type. Whole numbers without a decimal point are `int`.',
  },
  {
    id: 'pyai-m1-q2',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 1,
    levelNumber: 3,
    topic: 'python',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'Which keyword defines a reusable function in Python?',
    options: ['function', 'def', 'fn', 'define'],
    correctIndex: 1,
    explanation: '`def` is the keyword used to declare a function: `def my_function():`',
  },
  {
    id: 'pyai-m1-q3',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 1,
    levelNumber: 3,
    topic: 'python',
    difficulty: 'beginner',
    gradeLevels: [5, 6, 7],
    question: 'What is the output of `print(10 % 3)` in Python?',
    options: ['3', '1', '0', '33'],
    correctIndex: 1,
    explanation: '`%` is the modulo (remainder) operator. 10 divided by 3 is 3 remainder 1, so the answer is 1.',
  },

  // =========================================================================
  // Module 2 — Data Structures (Level 6 Quiz)
  // =========================================================================
  {
    id: 'pyai-m2-q1',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 2,
    levelNumber: 6,
    topic: 'python',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'How do you access the value `0.94` from this dictionary?',
    code: 'metrics = {"loss": 0.12, "accuracy": 0.94}',
    options: ['metrics[1]', 'metrics["accuracy"]', 'metrics.accuracy', 'metrics.get(1)'],
    correctIndex: 1,
    explanation: 'Dictionary values are retrieved using their string key in square brackets: `metrics["accuracy"]`.',
  },
  {
    id: 'pyai-m2-q2',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 2,
    levelNumber: 6,
    topic: 'python',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'What is the key difference between a Python `list` and a `tuple`?',
    options: [
      'Lists are mutable (can be changed); tuples are immutable (cannot be modified)',
      'Tuples can only hold numbers',
      'Lists use `()` and tuples use `[]`',
      'There is no difference between them',
    ],
    correctIndex: 0,
    explanation: 'Lists support `append()` and `pop()`. Tuples, once created, cannot be changed — they are immutable.',
  },
  {
    id: 'pyai-m2-q3',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 2,
    levelNumber: 6,
    topic: 'python',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'Which data structure automatically removes duplicate values?',
    options: ['list', 'tuple', 'set', 'dict'],
    correctIndex: 2,
    explanation: 'A `set` is an unordered collection that only stores unique values — duplicates are automatically dropped.',
  },

  // =========================================================================
  // Module 4 — File & Error Handling (Level 12 Quiz)
  // =========================================================================
  {
    id: 'pyai-m4-q1',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 4,
    levelNumber: 12,
    topic: 'python',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'What block catches and handles runtime errors in Python?',
    code: 'try:\n    result = 100 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")',
    options: ['try ... except', 'catch ... error', 'test ... throw', 'if ... else'],
    correctIndex: 0,
    explanation: 'Python uses `try ... except` to catch exceptions and prevent program crashes.',
  },
  {
    id: 'pyai-m4-q2',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 4,
    levelNumber: 12,
    topic: 'python',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'Which mode opens a file for writing (and creates it if it doesn\'t exist)?',
    options: ['"r"', '"w"', '"x"', '"a"'],
    correctIndex: 1,
    explanation: '`open("file.txt", "w")` opens a file for writing. If it already exists, contents are overwritten.',
  },

  // =========================================================================
  // Module 7 — Math for AI (Level 21 Quiz)
  // =========================================================================
  {
    id: 'pyai-m7-q1',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 7,
    levelNumber: 21,
    topic: 'ai_ml',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'If a classifier gives 0.85 for "cat" and 0.15 for "dog", what does it predict?',
    options: [
      'Cat — 85% is the highest probability',
      'Dog — because 15% is safer',
      'Both equally',
      'It cannot decide without 100% confidence',
    ],
    correctIndex: 0,
    explanation: 'Classifiers choose the label with the highest probability (called argmax). 0.85 > 0.15, so the model predicts Cat.',
  },
  {
    id: 'pyai-m7-q2',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 7,
    levelNumber: 21,
    topic: 'ai_ml',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'What does the "mean" of a dataset represent?',
    options: [
      'The most frequently occurring value',
      'The middle value when sorted',
      'The average (sum divided by count)',
      'The largest minus the smallest value',
    ],
    correctIndex: 2,
    explanation: 'Mean = sum of all values ÷ number of values. E.g., mean of [2, 4, 6] = 12/3 = 4.',
  },

  // =========================================================================
  // Module 8 — Intro to ML Concepts (Level 24 Quiz)
  // =========================================================================
  {
    id: 'pyai-m8-q1',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 8,
    levelNumber: 24,
    topic: 'ai_ml',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'Why do we split data into training and testing sets?',
    options: [
      'To check how well the model generalizes to new, unseen data (prevent overfitting)',
      'Because Python runs out of memory with the full dataset',
      'To delete redundant data and save storage',
      'Testing data is only used to calculate GPU costs',
    ],
    correctIndex: 0,
    explanation: 'A test set simulates unseen real-world data. If the model performs well on test data, it has truly learned the pattern.',
  },
  {
    id: 'pyai-m8-q2',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 8,
    levelNumber: 24,
    topic: 'ai_ml',
    difficulty: 'intermediate',
    gradeLevels: [6, 7, 8],
    question: 'Which type of learning uses labelled examples to train a model?',
    options: ['Unsupervised learning', 'Reinforcement learning', 'Supervised learning', 'Transfer learning'],
    correctIndex: 2,
    explanation: 'In supervised learning, each training example has an input AND a correct label/output for the model to learn from.',
  },

  // =========================================================================
  // Module 9 — Build an ML Model / Scikit-Learn (Level 27 Quiz)
  // =========================================================================
  {
    id: 'pyai-m9-q1',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 9,
    levelNumber: 27,
    topic: 'ai_ml',
    difficulty: 'advanced',
    gradeLevels: [7, 8, 9],
    question: 'Which scikit-learn method trains (fits) a model on data?',
    code: 'from sklearn.tree import DecisionTreeClassifier\nmodel = DecisionTreeClassifier()',
    options: ['model.fit(X_train, y_train)', 'model.predict(X_train)', 'model.train()', 'model.learn(X)'],
    correctIndex: 0,
    explanation: 'All scikit-learn estimators use `.fit(X, y)` to learn from labelled training data.',
  },
  {
    id: 'pyai-m9-q2',
    courseSlug: 'python-from-scratch-to-ai',
    moduleId: 9,
    levelNumber: 27,
    topic: 'ai_ml',
    difficulty: 'advanced',
    gradeLevels: [7, 8, 9],
    question: 'What does a confusion matrix show in model evaluation?',
    options: [
      'Counts of correct vs. incorrect predictions per class',
      'The speed of the model in milliseconds',
      'Number of layers in the neural network',
      'The size of the training dataset',
    ],
    correctIndex: 0,
    explanation: 'A confusion matrix shows true positives, true negatives, false positives, and false negatives — allowing detailed accuracy analysis.',
  },
];
