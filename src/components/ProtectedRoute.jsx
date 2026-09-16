import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

/**
 * Route guard. Supports two modes:
 *   <ProtectedRoute role="student">          — legacy single-role check
 *   <ProtectedRoute allowedRoles={['faculty','admin']}> — multi-role check
 *
 * If neither prop is provided, just requires authentication.
 */
export default function ProtectedRoute({ children, role, allowedRoles }) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  // Multi-role check takes priority
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user?.role)) return <Navigate to="/" replace />
  } else if (role && user?.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}
