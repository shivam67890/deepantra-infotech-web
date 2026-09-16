/**
 * RBAC middleware — sits on top of the existing `protect` middleware.
 * Expects req.user to already be set (by protect).
 *
 * Usage:
 *   import { protect } from './auth.js';
 *   import requireRole from './requireRole.js';
 *   router.get('/teacher/courses', protect, requireRole('faculty', 'admin'), handler);
 */
export default function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden — requires: ${allowedRoles.join(' or ')}.`,
      });
    }
    next();
  };
}
