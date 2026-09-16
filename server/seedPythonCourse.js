// seedPythonCourse.js
// Run from your server/ folder:  node seedPythonCourse.js
// Requires MONGODB_URI in your .env (same one your app already uses).

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Course from './src/models/Course.js';

console.log('Course type:', typeof Course);
console.log('Course modelName:', Course?.modelName);
console.log('Course keys:', Course && Object.keys(Course));

dotenv.config();

const courseData = {
  title: 'Python for Young Coders',
  description:
    'A beginner-friendly introduction to Python, with a first look at how computers make simple "smart" decisions — the building block of AI.',
  gradeLevels: [5, 6, 7, 8],
  level: 'Beginner',
  duration: '4 lessons',
  instructor: 'Ms. Sharma',
  thumbnail: '',
  isActive: true,
  totalLevels: 4,
  lessons: [
    {
      order: 1,
      title: 'Welcome to Python',
      type: 'slide',
      slides: [
        {
          heading: 'What is Python?',
          bullets: [
            'Python is a programming language — a way to give a computer instructions.',
            'It\'s one of the easiest languages to start with, and it\'s used to build games, apps, and AI.',
            'By the end of this course, you\'ll have written real code that runs.',
          ],
          image: '',
        },
        {
          heading: 'Why learn to code?',
          bullets: [
            'Coding teaches you to break big problems into small steps.',
            'The same skills you use here are used to build robots, apps, and even AI like chatbots.',
            'Every expert started exactly where you are now — let\'s begin!',
          ],
          image: '',
        },
      ],
    },
    {
      order: 2,
      title: 'What is AI, really?',
      type: 'slide',
      slides: [
        {
          heading: 'Computers that seem to "think"',
          bullets: [
            'AI (Artificial Intelligence) is when a computer makes decisions based on rules or data.',
            'It\'s not magic — it\'s just code, following instructions, over and over, very fast.',
            'Even a simple "if this, then that" rule is a tiny piece of AI thinking.',
          ],
          image: '',
        },
        {
          heading: 'You\'re about to build one',
          bullets: [
            'In the next coding step, you\'ll write a program that "guesses" based on what a player tells it.',
            'That\'s the same basic idea behind real AI — just much, much bigger.',
          ],
          image: '',
        },
      ],
    },
    {
      order: 3,
      title: 'Your First Python Program',
      type: 'code',
      codeTask: {
        instructions:
          'Use print() to make Python say hello, then create a variable called name and print a greeting using it. Try running: print("Hello, world!") and then name = "Ava" followed by print("Hi, " + name).',
        language: 'python',
        starterCode:
          '# Step 1: print a message\nprint("Hello, world!")\n\n# Step 2: create a variable and greet yourself\nname = "Ava"\nprint("Hi, " + name)\n',
      },
    },
    {
      order: 4,
      title: 'Teach the Computer to Guess',
      type: 'code',
      codeTask: {
        instructions:
          'Build a tiny "AI-style" decision maker. Ask the computer to check a mood variable and print a different response depending on its value — this simple if/else logic is the same basic idea behind real AI decision-making.',
        language: 'python',
        starterCode:
          'mood = "happy"\n\nif mood == "happy":\n    print("Great! Let\'s keep learning.")\nelif mood == "tired":\n    print("Let\'s take a short break.")\nelse:\n    print("Tell me more about how you feel!")\n',
      },
    },
  ],
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existing = await Course.findOneAndUpdate(
      { title: courseData.title },
      courseData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log('Course seeded successfully:');
    console.log(`  _id: ${existing._id}`);
    console.log(`  title: ${existing.title}`);
    console.log(`  lessons: ${existing.lessons.length}`);
    console.log('Course import:', typeof Course, Course?.modelName);
  } catch (error) {
    console.error('Error seeding course:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();