// Must be the very first import — modules imported below (authRoutes ->
// authController -> sendEmail) read process.env at load time, so dotenv
// has to finish before any of them execute.
import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import { connectDB } from './src/config/db.js';
import assignmentRoutes from './src/routes/assignmentRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import codeRoutes from './src/routes/codeRoutes.js';
import courseRoutes from './src/routes/courseRoutes.js';
import demoRoutes from './src/routes/demoRoutes.js';
import gradeRoutes from './src/routes/gradeRoutes.js';
import teacherRoutes from './src/routes/teacherRoutes.js';
import studentExtrasRoutes from './src/routes/studentExtrasRoutes.js';
import notificationRoutes from './src/routes/notificationRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import discussionRoutes from './src/routes/discussionRoutes.js';
import challengeRoutes from './src/routes/challengeRoutes.js';

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  ...(process.env.CLIENT_ORIGIN?.split(',').map(origin => origin.trim()).filter(Boolean) || [])
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.options('*', cors())

// Default 100kb limit is too small for a base64-encoded profile picture upload
app.use(express.json({ limit: '4mb' }))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api', codeRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/demo', demoRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/grades', gradeRoutes)
app.use('/api/assignments', assignmentRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/student', studentExtrasRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/discussions', discussionRoutes)
app.use('/api', challengeRoutes)

// Catch-all error handler — keeps unexpected errors from crashing the process
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error.' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  connectDB()
})