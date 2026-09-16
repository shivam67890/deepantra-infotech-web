import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = window.localStorage.getItem('fm-user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => window.localStorage.getItem('fm-token'))

  function login(userData, jwt) {
    setUser(userData)
    setToken(jwt)
    window.localStorage.setItem('fm-user', JSON.stringify(userData))
    window.localStorage.setItem('fm-token', jwt)
  }

  // Updates the stored user (e.g. after a profile picture change) without
  // touching the token/session.
  function updateUser(userData) {
    setUser(userData)
    window.localStorage.setItem('fm-user', JSON.stringify(userData))
  }

  function logout() {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('fm-user')
    window.localStorage.removeItem('fm-token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
