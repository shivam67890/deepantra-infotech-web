import './Navbar.css';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import NotificationBell from './NotificationBell.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/programs', label: 'Programs' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join('')
  return initials || '?'
}

function isAdminUser(user) {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL
  return !!adminEmail && user?.email?.toLowerCase() === adminEmail.toLowerCase()
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, token, isAuthenticated, logout, updateUser } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handlePhotoClick() {
    fileInputRef.current?.click()
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file.')
      return
    }
    if (file.size > 2_000_000) {
      alert('Please choose an image smaller than 2MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = async () => {
      setUploading(true)
      try {
        const data = await api.updateProfilePicture(reader.result, token)
        updateUser(data.user)
      } catch (err) {
        alert(err.message)
      } finally {
        setUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  function handleLogout() {
    logout()
    setMenuOpen(false)
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <img src="/assets/logo.jpeg" alt="Deepantra Infotech logo" className="navbar__logo" />
          <span className="navbar__brand-name">Deepantra Infotech</span>
        </NavLink>

        {/* Desktop links */}
        <nav className="navbar__links" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                'navbar__link' + (isActive ? ' navbar__link--active' : '')
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <NotificationBell />
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {isAuthenticated ? (
            <div className="navbar__profile" ref={menuRef}>
              <button
                className="navbar__avatar-btn"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Open profile menu"
                aria-expanded={menuOpen}
              >
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} className="navbar__avatar-img" />
                ) : (
                  <span className="navbar__avatar-initials">{getInitials(user?.name)}</span>
                )}
              </button>

              {menuOpen && (
                <div className="navbar__profile-menu">
                  <p className="navbar__profile-name">{user?.name}</p>
                  <button onClick={handlePhotoClick} disabled={uploading}>
                    {uploading ? 'Uploading…' : 'Change Photo'}
                  </button>
                  {user?.role === 'student' && (
                    <NavLink to="/student/dashboard" onClick={() => setMenuOpen(false)}>
                      My Dashboard
                    </NavLink>
                  )}
                  {(user?.role === 'faculty' || user?.role === 'admin') && (
                    <NavLink to="/teacher/dashboard" onClick={() => setMenuOpen(false)}>
                      Teacher Dashboard
                    </NavLink>
                  )}
                  {isAdminUser(user) && (
                    <NavLink to="/admin/bookings" onClick={() => setMenuOpen(false)}>
                      Admin: Bookings
                    </NavLink>
                  )}
                  <button onClick={handleLogout} className="navbar__profile-logout">Logout</button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <>
              <NavLink to="/login" className="navbar__auth-btn">
                Login
              </NavLink>
              <NavLink to="/signup" className="navbar__auth-btn">
                Sign Up
              </NavLink>
            </>
          )}

          <NavLink to="/contact" className="navbar__cta">
            Book a Free Demo
          </NavLink>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className={'navbar__toggle' + (open ? ' navbar__toggle--open' : '')}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <nav
        id="mobile-menu"
        className={'navbar__mobile' + (open ? ' navbar__mobile--open' : '')}
        aria-label="Mobile"
      >
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className="navbar__mobile-link"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}

        {isAuthenticated ? (
          <>
            <div className="navbar__mobile-profile">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt={user.name} className="navbar__avatar-img" />
              ) : (
                <span className="navbar__avatar-initials">{getInitials(user?.name)}</span>
              )}
              <span>{user?.name}</span>
            </div>
            <button className="navbar__mobile-link" onClick={handlePhotoClick} disabled={uploading}>
              {uploading ? 'Uploading…' : 'Change Photo'}
            </button>
            {user?.role === 'student' && (
              <NavLink to="/student/dashboard" className="navbar__mobile-link" onClick={() => setOpen(false)}>
                My Dashboard
              </NavLink>
            )}
            {(user?.role === 'faculty' || user?.role === 'admin') && (
              <NavLink to="/teacher/dashboard" className="navbar__mobile-link" onClick={() => setOpen(false)}>
                Teacher Dashboard
              </NavLink>
            )}
            {isAdminUser(user) && (
              <NavLink to="/admin/bookings" className="navbar__mobile-link" onClick={() => setOpen(false)}>
                Admin: Bookings
              </NavLink>
            )}
            <button className="navbar__mobile-link" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="navbar__mobile-link" onClick={() => setOpen(false)}>
              Login
            </NavLink>
            <NavLink to="/signup" className="navbar__mobile-link" onClick={() => setOpen(false)}>
              Sign Up
            </NavLink>
          </>
        )}

        <NavLink to="/contact" className="navbar__mobile-cta" onClick={() => setOpen(false)}>
          Book a Free Demo
        </NavLink>
        <button
          className="navbar__mobile-theme"
          onClick={() => {
            toggleTheme()
            setOpen(false)
          }}
        >
          {theme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
        </button>
      </nav>
    </header>
  )
}