import express from 'express'
import {
  signup,
  verifyOtp,
  resendOtp,
  login,
  forgotPassword,
  resetPassword,
  checkEmail,
  updateProfilePicture,
  addPoints,
} from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/verify-otp', verifyOtp)
router.post('/resend-otp', resendOtp)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/check-email', checkEmail)
router.put('/profile-picture', protect, updateProfilePicture)
router.post('/points', protect, addPoints)

export default router
