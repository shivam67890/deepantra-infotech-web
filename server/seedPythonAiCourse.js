// seedPythonAiCourse.js
// Run from the server/ folder:  node seedPythonAiCourse.js
// Populates MongoDB with "Python from Scratch to AI" — 10 Modules, 30 Gamified Levels

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Course from './src/models/Course.js';

dotenv.config();

const pythonAiCourseData = {
  title: 'Python from Scratch to AI',
  slug: 'python-from-scratch-to-ai',
  description:
    'A hands-on, gamified journey from fundamental Python syntax and data structures through data analytics, AI math intuition, and training real scikit-learn machine learning models.',
  category: 'AI & Data Science',
  gradeBand: 'Grades 6-8',
  gradeLevels: [5, 6, 7, 8, 9],
  level: 'Intermediate',
  duration: '30 Levels (10 Modules)',
  totalLevels: 30,
  instructor: 'Deepantra Infotech AI Lab',
  isActive: true,
  thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  modules: [
    // =========================================================================
    // Module 1 — Python Basics
    // =========================================================================
    {
      moduleNumber: 1,
      slug: 'm1-python-basics',
      title: 'Python Basics',
      description: 'Variables, data types, loops, conditionals, and functions.',
      estimatedHours: 3,
      quizTopic: 'python',
      levels: [
        {
          levelNumber: 1,
          title: 'Welcome to Python: Variables & Data Types',
          type: 'slide',
          xpReward: 50,
          difficulty: 'Beginner',
          targetGradeBand: 'Grades 6-8',
          slides: [
            {
              heading: 'Welcome to Python for AI!',
              bullets: [
                'Python is the premier language used by AI researchers and engineers worldwide.',
                'It powers TensorFlow, PyTorch, and Scikit-Learn — all the major AI frameworks.',
                'Clean, readable, and perfect for beginners. Let's write your first intelligent scripts.',
              ],
            },
            {
              heading: 'Variables and Data Types',
              bullets: [
                '`name = "Aarav"` → string, `age = 13` → integer, `accuracy = 0.95` → float.',
                'Variables are containers that store data values — the building blocks of every program.',
              ],
            },
          ],
        },
        {
          levelNumber: 2,
          title: 'Loops & Conditionals: Decision Making',
          type: 'code',
          xpReward: 75,
          difficulty: 'Beginner',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions:
              'Write a loop from 1 to 5. If the number is even, print "Even AI feature". Otherwise print "Odd AI feature".',
            language: 'python',
            starterCode:
              '# Loop 1 through 5 and classify each number\nfor num in range(1, 6):\n    if num % 2 == 0:\n        print(f"{num}: Even AI feature")\n    else:\n        print(f"{num}: Odd AI feature")\n',
          },
        },
        {
          levelNumber: 3,
          title: 'Functions & Reusable Logic: Mini Calculator',
          type: 'quiz',
          xpReward: 100,
          difficulty: 'Beginner',
          targetGradeBand: 'Grades 6-8',
          quizTopic: 'python',
        },
      ],
    },

    // =========================================================================
    // Module 2 — Data Structures
    // =========================================================================
    {
      moduleNumber: 2,
      slug: 'm2-data-structures',
      title: 'Data Structures',
      description: 'Lists, dictionaries, tuples, and sets in Python.',
      estimatedHours: 3,
      quizTopic: 'python',
      levels: [
        {
          levelNumber: 4,
          title: 'Lists & Indexing: Organizing Data Collections',
          type: 'slide',
          xpReward: 60,
          difficulty: 'Beginner',
          targetGradeBand: 'Grades 6-8',
          slides: [
            {
              heading: 'Lists: Your AI Dataset Container',
              bullets: [
                'Lists hold sequences: `scores = [88, 92, 79, 95]`.',
                'Access items with zero-based indexing: `scores[0]` → 88.',
                'Lists are mutable — you can add, remove, and update values.',
              ],
            },
          ],
        },
        {
          levelNumber: 5,
          title: 'Dictionaries & Tuples: Key-Value Mapping',
          type: 'code',
          xpReward: 80,
          difficulty: 'Beginner',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions: 'Create a dictionary `model_metrics` with keys "model_name", "epochs", and "accuracy". Print the accuracy.',
            language: 'python',
            starterCode:
              'model_metrics = {\n    "model_name": "VisionClassifier",\n    "epochs": 10,\n    "accuracy": 0.96\n}\n\nprint("Accuracy:", model_metrics["accuracy"])\n',
          },
        },
        {
          levelNumber: 6,
          title: 'Sets & Data Organization Challenge',
          type: 'quiz',
          xpReward: 100,
          difficulty: 'Beginner',
          targetGradeBand: 'Grades 6-8',
          quizTopic: 'python',
        },
      ],
    },

    // =========================================================================
    // Module 3 — OOP in Python
    // =========================================================================
    {
      moduleNumber: 3,
      slug: 'm3-oop',
      title: 'OOP in Python',
      description: 'Classes, objects, methods, attributes, and inheritance.',
      estimatedHours: 4,
      quizTopic: 'python',
      levels: [
        {
          levelNumber: 7,
          title: 'Blueprints: Classes & Objects Explained',
          type: 'slide',
          xpReward: 70,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          slides: [
            {
              heading: 'Classes: AI Model Blueprints',
              bullets: [
                'A Class bundles data (attributes) and actions (methods) together.',
                'Example: `class RobotAgent` can have `battery_level` and a `scan()` method.',
                'Objects are instances of a class — each with their own attribute values.',
              ],
            },
          ],
        },
        {
          levelNumber: 8,
          title: 'Methods, Attributes & __init__ Constructors',
          type: 'code',
          xpReward: 90,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions:
              'Define a class `RobotAgent` with `__init__` taking `name` and `battery_level`. Add a `status()` method that prints both.',
            language: 'python',
            starterCode:
              'class RobotAgent:\n    def __init__(self, name, battery_level):\n        self.name = name\n        self.battery_level = battery_level\n\n    def status(self):\n        return f"Agent {self.name} — Battery: {self.battery_level}%"\n\nagent = RobotAgent("Alpha", 92)\nprint(agent.status())\n',
          },
        },
        {
          levelNumber: 9,
          title: 'Inheritance & Real-World Robot Modeling',
          type: 'project',
          xpReward: 120,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
        },
      ],
    },

    // =========================================================================
    // Module 4 — File & Error Handling
    // =========================================================================
    {
      moduleNumber: 4,
      slug: 'm4-file-error-handling',
      title: 'File Handling & Error Handling',
      description: 'Defensive programming with try/except and file I/O.',
      estimatedHours: 3,
      quizTopic: 'python',
      levels: [
        {
          levelNumber: 10,
          title: 'File I/O: Reading & Writing Files',
          type: 'slide',
          xpReward: 70,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          slides: [
            {
              heading: 'Reading and Writing Files in Python',
              bullets: [
                '`open("data.txt", "r")` opens for reading. `"w"` for writing.',
                'Always use `with open(...) as f:` — it auto-closes the file safely.',
                'AI datasets are often stored as text or CSV files — file I/O is essential.',
              ],
            },
          ],
        },
        {
          levelNumber: 11,
          title: 'Defensive Coding: try / except Blocks',
          type: 'code',
          xpReward: 85,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions: 'Wrap an integer division inside a `try ... except ZeroDivisionError` to prevent a crash.',
            language: 'python',
            starterCode:
              'try:\n    divisor = 0\n    result = 100 / divisor\n    print("Result:", result)\nexcept ZeroDivisionError:\n    print("Safe Guard: Cannot divide by zero!")\n',
          },
        },
        {
          levelNumber: 12,
          title: 'Build a Robust Student Data Log Parser',
          type: 'quiz',
          xpReward: 100,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          quizTopic: 'python',
        },
      ],
    },

    // =========================================================================
    // Module 5 — NumPy & Pandas
    // =========================================================================
    {
      moduleNumber: 5,
      slug: 'm5-numpy-pandas',
      title: 'Libraries: NumPy & Pandas',
      description: 'Fast numerical arrays with NumPy and tabular data with Pandas.',
      estimatedHours: 4,
      quizTopic: 'python',
      levels: [
        {
          levelNumber: 13,
          title: 'High-Speed Arrays with NumPy',
          type: 'slide',
          xpReward: 80,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          slides: [
            {
              heading: 'NumPy: Math at the Speed of AI',
              bullets: [
                'NumPy arrays are faster than Python lists for number crunching.',
                '`np.array([1, 2, 3]) * 2` → `[2, 4, 6]` — operations apply to every element.',
                'Almost every AI framework (TensorFlow, PyTorch) is built on top of NumPy-style arrays.',
              ],
            },
          ],
        },
        {
          levelNumber: 14,
          title: 'Tabular Data Mastery with Pandas DataFrames',
          type: 'code',
          xpReward: 100,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions: 'Compute the mean of a list of scores using standard Python. This mirrors how Pandas calculates column averages.',
            language: 'python',
            starterCode:
              'scores = [88, 92, 79, 95, 100]\nmean_score = sum(scores) / len(scores)\nprint(f"Dataset Mean Score: {mean_score:.2f}")\n',
          },
        },
        {
          levelNumber: 15,
          title: 'Data Cleaning & Querying Challenge',
          type: 'code',
          xpReward: 110,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions: 'Filter a list of scores to keep only those above 80, simulating a Pandas boolean filter.',
            language: 'python',
            starterCode:
              'scores = [45, 88, 72, 95, 60, 100, 55, 83]\nhigh_scores = [s for s in scores if s > 80]\nprint("High scores:", high_scores)\nprint("Count:", len(high_scores))\n',
          },
        },
      ],
    },

    // =========================================================================
    // Module 6 — Data Visualization
    // =========================================================================
    {
      moduleNumber: 6,
      slug: 'm6-data-visualization',
      title: 'Data Visualization: Matplotlib & Seaborn',
      description: 'Line plots, bar charts, histograms and statistical heatmaps.',
      estimatedHours: 3,
      quizTopic: 'python',
      levels: [
        {
          levelNumber: 16,
          title: 'Charting with Matplotlib: Lines & Bars',
          type: 'slide',
          xpReward: 75,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          slides: [
            {
              heading: 'Why Visualize Data?',
              bullets: [
                'A chart reveals patterns that tables hide — trends, outliers, and distributions.',
                '`plt.plot(x, y)` draws a line chart. `plt.bar(labels, values)` draws a bar chart.',
                'Data visualization is one of the most in-demand skills in AI and data science careers.',
              ],
            },
          ],
        },
        {
          levelNumber: 17,
          title: 'Statistical Aesthetics with Seaborn',
          type: 'code',
          xpReward: 95,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions: 'Print a simple ASCII bar chart of scores using Python. This demonstrates the logic behind Seaborn plots.',
            language: 'python',
            starterCode:
              'subjects = ["Math", "Python", "AI", "English"]\nscores   = [90, 95, 88, 76]\n\nprint("\\n--- Score Chart ---")\nfor subject, score in zip(subjects, scores):\n    bar = "█" * (score // 10)\n    print(f"{subject:10} | {bar} {score}")\n',
          },
        },
        {
          levelNumber: 18,
          title: 'Visual Storytelling: Insights Dashboard',
          type: 'project',
          xpReward: 130,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
        },
      ],
    },

    // =========================================================================
    // Module 7 — Math for AI
    // =========================================================================
    {
      moduleNumber: 7,
      slug: 'm7-math-for-ai',
      title: 'Math for AI (Simplified for K-9)',
      description: 'Averages, vectors, feature distance, and probability weights — without scary formulas.',
      estimatedHours: 4,
      quizTopic: 'ai_ml',
      levels: [
        {
          levelNumber: 19,
          title: 'Descriptive Stats Intuition: Mean, Median, Spread',
          type: 'slide',
          xpReward: 80,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          slides: [
            {
              heading: 'Statistics: The Language of AI',
              bullets: [
                'Mean = average. Median = the middle value. They describe where data is centered.',
                'Spread (standard deviation) tells us how scattered the data is.',
                'AI models learn statistical patterns from data — understanding these numbers matters.',
              ],
            },
          ],
        },
        {
          levelNumber: 20,
          title: '2D Vectors & Feature Space Visualized',
          type: 'slide',
          xpReward: 90,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          slides: [
            {
              heading: 'Vectors: How AI Sees Your Data',
              bullets: [
                'A vector is just a list of numbers: [height, weight, age] could describe a person.',
                'Each number is a "feature". AI models plot these features and find patterns.',
                'Similar items cluster together in feature space — that\'s how classifiers work.',
              ],
            },
          ],
        },
        {
          levelNumber: 21,
          title: 'Probability & Decision Weights Quiz',
          type: 'quiz',
          xpReward: 110,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          quizTopic: 'ai_ml',
        },
      ],
    },

    // =========================================================================
    // Module 8 — Intro to ML Concepts
    // =========================================================================
    {
      moduleNumber: 8,
      slug: 'm8-intro-ml',
      title: 'Intro to Machine Learning Concepts',
      description: 'Features, labels, supervised vs. unsupervised learning, and train/test splits.',
      estimatedHours: 4,
      quizTopic: 'ai_ml',
      levels: [
        {
          levelNumber: 22,
          title: 'How Machines Learn: Features & Labels',
          type: 'slide',
          xpReward: 90,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          slides: [
            {
              heading: 'The Anatomy of Machine Learning',
              bullets: [
                'Features are inputs: size, color, temperature.',
                'Labels are outputs: "spam" or "not spam", "cat" or "dog".',
                'The model learns to map features → labels by seeing many examples.',
              ],
            },
          ],
        },
        {
          levelNumber: 23,
          title: 'Supervised vs. Unsupervised Learning In Action',
          type: 'code',
          xpReward: 100,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions: 'Simulate a simple classifier: given a height value, predict "Tall" or "Short".',
            language: 'python',
            starterCode:
              '# Simple rule-based classifier (simulates supervised learning)\ndef classify_height(height_cm):\n    if height_cm >= 170:\n        return "Tall"\n    else:\n        return "Short"\n\ntest_heights = [155, 172, 168, 185, 160]\nfor h in test_heights:\n    print(f"{h} cm → {classify_height(h)}")\n',
          },
        },
        {
          levelNumber: 24,
          title: 'The Train/Test Split & Overfitting Trap',
          type: 'quiz',
          xpReward: 120,
          difficulty: 'Intermediate',
          targetGradeBand: 'Grades 6-8',
          quizTopic: 'ai_ml',
        },
      ],
    },

    // =========================================================================
    // Module 9 — Build an ML Model
    // =========================================================================
    {
      moduleNumber: 9,
      slug: 'm9-build-ml-model',
      title: 'Build an ML Model (Scikit-Learn)',
      description: 'Train and evaluate decision tree and KNN classifiers with real code.',
      estimatedHours: 5,
      quizTopic: 'ai_ml',
      levels: [
        {
          levelNumber: 25,
          title: 'Hello Scikit-Learn: Classification Pipeline',
          type: 'slide',
          xpReward: 100,
          difficulty: 'Advanced',
          targetGradeBand: 'Grades 6-8',
          slides: [
            {
              heading: 'Scikit-Learn: Your First AI Toolkit',
              bullets: [
                'Scikit-Learn is a Python library with ready-to-use ML algorithms.',
                'The pipeline is always: Import → Prepare data → `model.fit()` → `model.predict()` → Evaluate.',
                'You will train a real model that classifies data by the end of this module.',
              ],
            },
          ],
        },
        {
          levelNumber: 26,
          title: 'Train a KNN / Decision Tree Classifier',
          type: 'code',
          xpReward: 140,
          difficulty: 'Advanced',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions: 'Simulate a decision tree by writing a rule-based classifier for flower petal lengths.',
            language: 'python',
            starterCode:
              '# Rule-based iris-style classifier\ndef classify_flower(petal_length):\n    if petal_length < 2.5:\n        return "Setosa"\n    elif petal_length < 5.0:\n        return "Versicolor"\n    else:\n        return "Virginica"\n\nsamples = [1.4, 4.7, 5.8, 3.1, 6.2]\nfor p in samples:\n    print(f"Petal {p:.1f}cm → {classify_flower(p)}")\n',
          },
        },
        {
          levelNumber: 27,
          title: 'Model Evaluation: Accuracy & Confusion Matrix',
          type: 'quiz',
          xpReward: 130,
          difficulty: 'Advanced',
          targetGradeBand: 'Grades 6-8',
          quizTopic: 'ai_ml',
        },
      ],
    },

    // =========================================================================
    // Module 10 — Capstone AI Mini-Project
    // =========================================================================
    {
      moduleNumber: 10,
      slug: 'm10-capstone',
      title: 'Capstone AI Mini-Project',
      description: 'End-to-end AI project: define problem, prepare data, train model, evaluate, and present.',
      estimatedHours: 6,
      quizTopic: 'ai_ml',
      levels: [
        {
          levelNumber: 28,
          title: 'Capstone Phase 1: Problem Definition & Data Prep',
          type: 'code',
          xpReward: 150,
          difficulty: 'Advanced',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions:
              'Define your AI problem. Create a list of at least 5 data samples with two features and a label.',
            language: 'python',
            starterCode:
              '# Capstone Phase 1: Define Problem & Dataset\nproject_title = "Predict if a student passes based on study hours"\n\n# Format: [study_hours, assignments_done, passed(1=yes,0=no)]\ndataset = [\n    [2, 3, 0],\n    [5, 8, 1],\n    [1, 1, 0],\n    [6, 9, 1],\n    [4, 6, 1],\n    [0, 0, 0],\n]\n\nprint(f"Project: {project_title}")\nprint(f"Samples: {len(dataset)}")\nprint("\\nFeatures: [study_hours, assignments_done] | Label: passed")\nfor row in dataset:\n    print(row)\n',
          },
        },
        {
          levelNumber: 29,
          title: 'Capstone Phase 2: Train & Optimize AI Predictor',
          type: 'code',
          xpReward: 180,
          difficulty: 'Advanced',
          targetGradeBand: 'Grades 6-8',
          codeTask: {
            instructions: 'Train your classifier: write the decision logic that maps features to predicted labels.',
            language: 'python',
            starterCode:
              '# Capstone Phase 2: Train a Rule-Based Classifier\ntraining_data = [\n    {"study": 2, "assignments": 3, "label": 0},\n    {"study": 5, "assignments": 8, "label": 1},\n    {"study": 1, "assignments": 1, "label": 0},\n    {"study": 6, "assignments": 9, "label": 1},\n]\n\ndef predict(study_hours, assignments):\n    score = study_hours * 10 + assignments * 5\n    return 1 if score >= 70 else 0\n\nprint("--- Training Evaluation ---")\ncorrect = 0\nfor row in training_data:\n    pred = predict(row["study"], row["assignments"])\n    status = "✓" if pred == row["label"] else "✗"\n    print(f"  {status} Predicted: {pred}, Actual: {row[\'label\']}")\n    if pred == row["label"]:\n        correct += 1\n\naccuracy = (correct / len(training_data)) * 100\nprint(f"\\nTraining Accuracy: {accuracy:.0f}%")\n',
          },
        },
        {
          levelNumber: 30,
          title: 'Final Showcase, Code Defense & Certification',
          type: 'project',
          xpReward: 250,
          difficulty: 'Advanced',
          targetGradeBand: 'Grades 6-8',
        },
      ],
    },
  ],
};

async function seed() {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGODB_URI or MONGO_URI is missing in .env file');
    }

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    const course = await Course.findOneAndUpdate(
      { slug: pythonAiCourseData.slug },
      pythonAiCourseData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const totalLevels = course.modules.reduce((acc, m) => acc + m.levels.length, 0);

    console.log('\n🎉 "Python from Scratch to AI" seeded successfully!');
    console.log(`   Course ID  : ${course._id}`);
    console.log(`   Slug       : ${course.slug}`);
    console.log(`   Modules    : ${course.modules.length}`);
    console.log(`   Total Levels: ${totalLevels}`);
    console.log(`   Grade Band : ${course.gradeBand}`);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
