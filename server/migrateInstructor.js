/**
 * Migration: Course.instructor  String → ObjectId ref to User
 *
 * Run modes:
 *   node migrateInstructor.js          # dry-run (logs only, no writes)
 *   node migrateInstructor.js --commit # writes changes to DB
 *
 * For each Course where `instructor` is a plain string:
 *   1. Try to find a User with a matching name (case-insensitive).
 *   2. If found, replace the string with the User._id.
 *   3. Also push the course._id onto User.teachingCourses (if not already there).
 *   4. If no match, log a warning — never guess.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import Course from './src/models/Course.js';
import User from './src/models/User.js';

const COMMIT = process.argv.includes('--commit');

async function migrate() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ No MONGODB_URI or MONGO_URI in .env');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log(`✅ Connected to MongoDB — mode: ${COMMIT ? 'COMMIT' : 'DRY-RUN'}\n`);

  const courses = await Course.find({});
  let matched = 0;
  let unmatched = 0;
  let alreadyMigrated = 0;

  for (const course of courses) {
    const val = course.instructor;

    // Already an ObjectId — skip
    if (mongoose.Types.ObjectId.isValid(val) && typeof val !== 'string') {
      alreadyMigrated++;
      console.log(`  ✓ "${course.title}" — instructor already ObjectId (${val})`);
      continue;
    }

    // It's a string — try matching by name
    const nameStr = String(val).trim();
    if (!nameStr) {
      console.log(`  ⚠ "${course.title}" — instructor field is empty, skipping`);
      unmatched++;
      continue;
    }

    // Case-insensitive name search (try faculty/admin first, then any user)
    let user = await User.findOne({
      name: { $regex: new RegExp(`^${nameStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
      role: { $in: ['faculty', 'admin'] },
    });

    if (!user) {
      user = await User.findOne({
        name: { $regex: new RegExp(`^${nameStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
      });
    }

    if (!user) {
      console.log(`  ⚠ "${course.title}" — no User found matching instructor name "${nameStr}" — SKIPPED`);
      unmatched++;
      continue;
    }

    console.log(`  → "${course.title}" — "${nameStr}" → User ${user._id} (${user.email})`);
    matched++;

    if (COMMIT) {
      course.instructor = user._id;
      await course.save();

      // Add to User.teachingCourses if not present
      const already = (user.teachingCourses || []).some(
        (id) => id.toString() === course._id.toString()
      );
      if (!already) {
        user.teachingCourses = [...(user.teachingCourses || []), course._id];
        await user.save();
      }
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`Total courses:      ${courses.length}`);
  console.log(`Already migrated:   ${alreadyMigrated}`);
  console.log(`Matched & ${COMMIT ? 'updated' : 'would update'}: ${matched}`);
  console.log(`Unmatched (manual): ${unmatched}`);

  if (!COMMIT && matched > 0) {
    console.log(`\nRe-run with --commit to apply changes.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
