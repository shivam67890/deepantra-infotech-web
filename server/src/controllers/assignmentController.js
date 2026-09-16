import Assignment from '../models/Assignment.js';
import AssignmentSubmission from '../models/AssignmentSubmission.js';

// Get all assignments for a student
export const getStudentAssignments = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { status, courseId } = req.query;

    let query = { isActive: true };
    if (courseId) query.course = courseId;

    const assignments = await Assignment.find(query)
      .populate('course')
      .sort({ dueDate: 1 });

    // Get submission status for each assignment
    const assignmentsWithStatus = await Promise.all(
      assignments.map(async (assignment) => {
        const submission = await AssignmentSubmission.findOne({
          student: studentId,
          assignment: assignment._id
        }).sort({ submittedAt: -1 });

        return {
          ...assignment.toObject(),
          submissionStatus: submission ? submission.status : 'pending',
          attempts: submission ? submission.attemptNumber : 0,
          grade: submission ? submission.grade : null,
          submittedAt: submission ? submission.submittedAt : null
        };
      })
    );

    // Filter by status if provided
    let filteredAssignments = assignmentsWithStatus;
    if (status) {
      if (status === 'pending') {
        filteredAssignments = assignmentsWithStatus.filter(a => 
          a.submissionStatus === 'pending' && new Date(a.dueDate) > new Date()
        );
      } else if (status === 'overdue') {
        filteredAssignments = assignmentsWithStatus.filter(a => 
          (a.submissionStatus === 'pending' && new Date(a.dueDate) < new Date()) ||
          a.submissionStatus === 'pending'
        );
      } else {
        filteredAssignments = assignmentsWithStatus.filter(a => 
          a.submissionStatus === status
        );
      }
    }

    res.json(filteredAssignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
};

// Get single assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate('course');
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignment', error: error.message });
  }
};

// Submit assignment
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, submissionContent, codeSubmission, attachments } = req.body;
    const studentId = req.user.id;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if deadline has passed
    if (new Date(assignment.dueDate) < new Date()) {
      return res.status(400).json({ message: 'Assignment deadline has passed' });
    }

    // Get previous attempts
    const previousSubmissions = await AssignmentSubmission.find({
      student: studentId,
      assignment: assignmentId
    });

    if (previousSubmissions.length >= assignment.maxAttempts) {
      return res.status(400).json({ message: 'Maximum attempts reached' });
    }

    // Create submission
    const submission = new AssignmentSubmission({
      student: studentId,
      assignment: assignmentId,
      course: assignment.course,
      submissionContent,
      codeSubmission,
      attachments,
      attemptNumber: previousSubmissions.length + 1
    });

    await submission.save();

    res.status(201).json({ message: 'Assignment submitted successfully', submission });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting assignment', error: error.message });
  }
};

// Get submission history for an assignment
export const getSubmissionHistory = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const studentId = req.user.id;

    const submissions = await AssignmentSubmission.find({
      student: studentId,
      assignment: assignmentId
    }).sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submission history', error: error.message });
  }
};

// Admin: Create new assignment
export const createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json({ message: 'Assignment created successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error: error.message });
  }
};

// Admin: Update assignment
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({ message: 'Assignment updated successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating assignment', error: error.message });
  }
};

// Admin: Delete assignment
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting assignment', error: error.message });
  }
};

// Admin: Grade submission
export const gradeSubmission = async (req, res) => {
  try {
    const { grade, feedback } = req.body;
    const facultyId = req.user.id;

    const submission = await AssignmentSubmission.findByIdAndUpdate(
      req.params.id,
      {
        grade,
        feedback,
        gradedBy: facultyId,
        gradedAt: Date.now(),
        status: 'graded'
      },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({ message: 'Submission graded successfully', submission });
  } catch (error) {
    res.status(500).json({ message: 'Error grading submission', error: error.message });
  }
};

export default {
  getStudentAssignments,
  getAssignmentById,
  submitAssignment,
  getSubmissionHistory,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  gradeSubmission
};