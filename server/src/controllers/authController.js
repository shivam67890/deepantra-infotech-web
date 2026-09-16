import User from '../models/User.js';
import {
  generateOtp,
  otpExpiry,
} from '../utils/otp.js';
import { sendOtpEmail } from '../utils/sendEmail.js';
import { generateToken } from '../utils/token.js';

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    grade: user.grade,
    school: user.school,
    points: user.points,
    profilePicture: user.profilePicture || '',
    teachingCourses: user.teachingCourses || [],
    streak: user.streak || { current: 0, longest: 0, lastActiveDate: '' },
    badges: user.badges || [],
  }
}

// POST /api/auth/signup
export async function signup(req, res) {
  try {
    const { name, email, phone, password, confirmPassword } = req.body
    if (!name || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required.' })
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and Confirm Password do not match.' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }

    let user = await User.findOne({ email: email.toLowerCase() })

    if (user && user.isVerified) {
      return res.status(409).json({ message: 'An account with this email already exists. Try logging in.' })
    }

    const otp = generateOtp()

    if (user && !user.isVerified) {
      // Re-signing up before verifying — update details and issue a fresh OTP
      user.name = name
      user.phone = phone
      user.password = password
      user.otpCode = otp
      user.otpExpiresAt = otpExpiry()
      await user.save()
    } else {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        phone,
        password,
        otpCode: otp,
        otpExpiresAt: otpExpiry(),
      })
    }

    await sendOtpEmail(user.email, otp, 'verify your Deepantra Infotech account')

    res.status(201).json({ message: 'OTP sent to your email.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Signup failed. Please try again.' })
  }
}

// POST /api/auth/verify-otp
export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body
    const user = await User.findOne({ email: email?.toLowerCase() })

    if (!user) return res.status(404).json({ message: 'No account found for this email.' })
    if (user.isVerified) return res.status(400).json({ message: 'Account already verified. Please log in.' })

    if (!user.otpCode || user.otpCode !== otp) {
      return res.status(400).json({ message: 'Incorrect code. Please try again.' })
    }
    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'This code has expired. Please request a new one.' })
    }

    user.isVerified = true
    user.otpCode = undefined
    user.otpExpiresAt = undefined
    await user.save()

    const token = generateToken(user._id)
    res.json({ user: publicUser(user), token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Verification failed. Please try again.' })
  }
}

// POST /api/auth/resend-otp
export async function resendOtp(req, res) {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email?.toLowerCase() })
    if (!user) return res.status(404).json({ message: 'No account found for this email.' })
    if (user.isVerified) return res.status(400).json({ message: 'Account already verified.' })

    const otp = generateOtp()
    user.otpCode = otp
    user.otpExpiresAt = otpExpiry()
    await user.save()

    await sendOtpEmail(user.email, otp, 'verify your Deepantra Infotech account')
    res.json({ message: 'A new code has been sent.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not resend code. Please try again.' })
  }
}

// POST /api/auth/login  — identifier can be an email or a phone number
export async function login(req, res) {
  try {
    const { identifier, password } = req.body
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Email/phone and password are required.' })
    }

    const isEmail = identifier.includes('@')
    const user = await User.findOne(
      isEmail ? { email: identifier.toLowerCase() } : { phone: identifier }
    )

    if (!user) return res.status(401).json({ message: 'Invalid credentials.' })
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your account via the OTP sent to your email first.' })
    }

    const matches = await user.comparePassword(password)
    if (!matches) return res.status(401).json({ message: 'Invalid credentials.' })

    const token = generateToken(user._id)
    res.json({ user: publicUser(user), token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Login failed. Please try again.' })
  }
}

// POST /api/auth/forgot-password
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email?.toLowerCase() })
    // Always respond with success-shaped message even if not found, to avoid leaking which emails are registered
    if (!user) return res.json({ message: 'If that email is registered, a reset code has been sent.' })

    const otp = generateOtp()
    user.resetOtpCode = otp
    user.resetOtpExpiresAt = otpExpiry()
    await user.save()

    await sendOtpEmail(user.email, otp, 'reset your Deepantra Infotech password')
    res.json({ message: 'If that email is registered, a reset code has been sent.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
}

// POST /api/auth/reset-password
export async function resetPassword(req, res) {
  try {
    const { email, otp, newPassword, confirmNewPassword } = req.body
    if (!newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: 'Both password fields are required.' })
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }

    const user = await User.findOne({ email: email?.toLowerCase() })

    if (!user || !user.resetOtpCode || user.resetOtpCode !== otp) {
      return res.status(400).json({ message: 'Incorrect or expired code.' })
    }
    if (user.resetOtpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'This code has expired. Please request a new one.' })
    }

    user.password = newPassword // pre-save hook hashes this
    user.resetOtpCode = undefined
    user.resetOtpExpiresAt = undefined
    await user.save()

    res.json({ message: 'Password updated successfully.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not reset password. Please try again.' })
  }
}

// POST /api/auth/check-email — used by the single combined Login/Signup page
// to decide, right after the person types their email, whether to show the
// password field (existing + verified account) or the full signup form.
export async function checkEmail(req, res) {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ message: 'Email is required.' })

    const user = await User.findOne({ email: email.toLowerCase() })
    // "exists" here means a verified account — an abandoned, unverified
    // signup should still be treated as a fresh signup, not a login.
    const exists = !!(user && user.isVerified)
    res.json({ exists })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not check that email. Please try again.' })
  }
}

// PUT /api/auth/profile-picture — protected route, requires a valid token.
// Accepts a base64 data URI and stores it directly on the user document.
// Sending `profilePicture: ''` clears it back to the initials avatar.
export async function updateProfilePicture(req, res) {
  try {
    const { profilePicture } = req.body

    // Roughly cap stored image size (base64 is ~33% larger than binary) so
    // one photo can't bloat the MongoDB document — about 2MB of image data.
    if (profilePicture && profilePicture.length > 2_800_000) {
      return res.status(400).json({ message: 'Image is too large. Please choose a smaller photo.' })
    }

    req.user.profilePicture = profilePicture || ''
    await req.user.save()

    res.json({ user: publicUser(req.user) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not update profile picture. Please try again.' })
  }
}

// POST /api/auth/points — protected route, adds earned points (e.g. from quiz) to student
export async function addPoints(req, res) {
  try {
    const { points } = req.body
    const pointsToAdd = Number(points)
    if (isNaN(pointsToAdd) || pointsToAdd <= 0) {
      return res.status(400).json({ message: 'Valid positive points amount required.' })
    }

    req.user.points = (req.user.points || 0) + Math.min(pointsToAdd, 500)
    await req.user.save()

    res.json({
      message: 'Points added successfully',
      points: req.user.points,
      user: publicUser(req.user),
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Could not update points. Please try again.' })
  }
}