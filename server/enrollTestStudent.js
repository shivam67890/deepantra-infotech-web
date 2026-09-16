// enrollTestStudent.js
// Run from server/ folder:  node enrollTestStudent.js student@example.com
// Requires MONGO_URI in your .env (same one your app already uses).

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Course from './src/models/Course.js';
import StudentProgress from './src/models/StudentProgress.js';
import User from './src/models/User.js';

dotenv.config();

const studentEmail = process.argv[2];
const courseTitle = process.argv[3] || 'Python for Young Coders';

if (!studentEmail) {
  console.error('Usage: node enrollTestStudent.js <student-email> [course-title]');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const student = await User.findOne({ email: studentEmail });
    if (!student) {
      console.error(`No user found with email: ${studentEmail}`);
      process.exit(1);
    }

    const course = await Course.findOne({ title: courseTitle });
    if (!course) {
      console.error(`No course found with title: ${courseTitle}`);
      process.exit(1);
    }

    const existing = await StudentProgress.findOne({
      student: student._id,
      course: course._id
    });

    if (existing) {
      console.log('Student is already enrolled in this course.');
      console.log(`  progress: ${existing.progressPercentage}%`);
      process.exit(0);
    }

    const progress = new StudentProgress({
      student: student._id,
      course: course._id
    });
    await progress.save();

    await Course.findByIdAndUpdate(course._id, { $inc: { studentsEnrolled: 1 } });

    console.log('Enrolled successfully:');
    console.log(`  student: ${student.email} (${student._id})`);
    console.log(`  course:  ${course.title} (${course._id})`);
  } catch (error) {
    console.error('Error enrolling student:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();