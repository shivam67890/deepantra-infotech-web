import Course from '../models/Course.js';
import StudentProgress from '../models/StudentProgress.js';

// Get all courses (filtered by grade if student)
export const getAllCourses = async (req, res) => {
  try {
    const { grade } = req.query;
    let query = { isActive: true };
    
    if (grade) {
      query.gradeLevels = parseInt(grade);
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

// Get single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
};

// Enroll student in a course
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;

    const existingProgress = await StudentProgress.findOne({
      student: studentId,
      course: courseId
    });

    if (existingProgress) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const progress = new StudentProgress({
      student: studentId,
      course: courseId
    });

    await progress.save();

    await Course.findByIdAndUpdate(courseId, {
      $inc: { studentsEnrolled: 1 }
    });

    res.status(201).json({ message: 'Successfully enrolled in course', progress });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling in course', error: error.message });
  }
};

// Get student's enrolled courses
export const getStudentCourses = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    const progressRecords = await StudentProgress.find({ student: studentId })
      .populate('course')
      .sort({ enrolledAt: -1 });

    const courses = progressRecords.map(record => ({
      ...record.course.toObject(),
      progress: record.progressPercentage,
      completedLevels: record.completedLevels,
      completedLessonIds: record.completedLessonIds,
      currentLevel: record.currentLevel,
      enrolledAt: record.enrolledAt,
      completedAt: record.completedAt
    }));

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student courses', error: error.message });
  }
};

// Update course progress (legacy level-count based update)
export const updateProgress = async (req, res) => {
  try {
    const { courseId, levelCompleted } = req.body;
    const studentId = req.user.id;

    const progress = await StudentProgress.findOne({
      student: studentId,
      course: courseId
    });

    if (!progress) {
      return res.status(404).json({ message: 'Course enrollment not found' });
    }

    const course = await Course.findById(courseId);
    const progressPercentage = Math.round((levelCompleted / course.totalLevels) * 100);

    progress.completedLevels = levelCompleted;
    progress.currentLevel = levelCompleted + 1;
    progress.progressPercentage = progressPercentage;
    progress.lastAccessedAt = Date.now();

    if (levelCompleted >= course.totalLevels) {
      progress.completedAt = Date.now();
      progress.certificateIssued = true;
      progress.certificateId = `FM-${new Date().getFullYear()}-${course._id.toString().slice(-6).toUpperCase()}-${studentId.toString().slice(-6).toUpperCase()}`;
    }

    await progress.save();

    res.json({ message: 'Progress updated successfully', progress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
};

// Mark a real lesson (slide deck or code task) complete for the current student
export const completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const studentId = req.user.id;

    if (!courseId || !lessonId) {
      return res.status(400).json({ message: 'courseId and lessonId are required' });
    }

    const [progress, course] = await Promise.all([
      StudentProgress.findOne({ student: studentId, course: courseId }),
      Course.findById(courseId)
    ]);

    if (!progress) {
      return res.status(404).json({ message: 'Course enrollment not found' });
    }
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const lessonExists = course.lessons.some(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lessonExists) {
      return res.status(404).json({ message: 'Lesson not found in this course' });
    }

    const alreadyCompleted = progress.completedLessonIds.some(
      (id) => id.toString() === lessonId
    );
    if (!alreadyCompleted) {
      progress.completedLessonIds.push(lessonId);
    }

    const totalLessons = course.lessons.length || course.totalLevels || 1;
    progress.completedLevels = progress.completedLessonIds.length;
    progress.currentLevel = progress.completedLessonIds.length + 1;
    progress.progressPercentage = Math.round(
      (progress.completedLessonIds.length / totalLessons) * 100
    );
    progress.lastAccessedAt = Date.now();

    if (progress.completedLessonIds.length >= totalLessons) {
      progress.completedAt = Date.now();
      progress.certificateIssued = true;
      progress.certificateId = `FM-${new Date().getFullYear()}-${course._id
        .toString()
        .slice(-6)
        .toUpperCase()}-${studentId.toString().slice(-6).toUpperCase()}`;
    }

    await progress.save();

    res.json({
      message: 'Lesson marked complete',
      completedLessonIds: progress.completedLessonIds,
      progressPercentage: progress.progressPercentage,
      certificateIssued: progress.certificateIssued
    });
  } catch (error) {
    res.status(500).json({ message: 'Error completing lesson', error: error.message });
  }
};

// Admin: Create new course
export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// Admin: Update course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

// Admin: Delete course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
};

export default {
  getAllCourses,
  getCourseById,
  enrollCourse,
  getStudentCourses,
  updateProgress,
  completeLesson,
  createCourse,
  updateCourse,
  deleteCourse
};