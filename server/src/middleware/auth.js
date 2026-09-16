import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export async function protect(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided.' })
  }

  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) {
      return res.status(401).json({ message: 'User no longer exists.' })
    }
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, invalid or expired token.' })
  }
}

// Restricts a route to a fixed allow-list of admin emails, set via the
// ADMIN_EMAILS env var (comma-separated). Must run after `protect`, since
// it relies on req.user already being set. Keeps this simple and avoids
// touching the User schema/database at all — no "role" field needed.
export function adminOnly(req, res, next) {
  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  if (!req.user || !adminEmails.includes(req.user.email.toLowerCase())) {
    return res.status(403).json({ message: 'Admin access required.' })
  }
  next()
}