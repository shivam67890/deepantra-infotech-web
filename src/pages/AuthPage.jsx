import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { api } from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'
import './Auth.css'

// Single page, two clear tabs — Login and Sign Up — instead of the earlier
// "type your email and we'll guess" flow, which read as just a login box
// on first load and confused people. /login opens on the Login tab,
// /signup opens on the Sign Up tab; either tab button switches instantly.
export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [tab, setTab] = useState(location.pathname === '/signup' ? 'signup' : 'login')
  const [signupStep, setSignupStep] = useState('details') // 'details' -> 'otp'

  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' })
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [otp, setOtp] = useState('')

  // Keep the tab in sync if the person navigates between /login and /signup
  // via a Link elsewhere on the site (navbar, footer, etc).
  useEffect(() => {
    setTab(location.pathname === '/signup' ? 'signup' : 'login')
    setError('')
  }, [location.pathname])

  function switchTab(next) {
    setError('')
    navigate(next === 'signup' ? '/signup' : '/login')
  }

  function handleLoginChange(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  function handleSignupChange(e) {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value })
  }

  async function handleLoginSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.login(loginForm)
      login(data.user, data.token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignupDetailsSubmit(e) {
    e.preventDefault()
    setError('')
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Password and Confirm Password do not match.')
      return
    }
    setLoading(true)
    try {
      // Backend creates an unverified user and emails a 6-digit OTP
      await api.signup(signupForm)
      setSignupStep('otp')
      setInfo(`We've sent a verification code to ${signupForm.email}.`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleOtpSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.verifyOtp({ email: signupForm.email, otp })
      login(data.user, data.token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setError('')
    try {
      await api.resendOtp({ email: signupForm.email })
      setInfo('A new code has been sent.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-tabs">
            <button
              type="button"
              className={'auth-tab' + (tab === 'login' ? ' auth-tab--active' : '')}
              onClick={() => switchTab('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={'auth-tab' + (tab === 'signup' ? ' auth-tab--active' : '')}
              onClick={() => switchTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {tab === 'login' && (
            <>
              <h1 className="section__title" style={{ textAlign: 'left' }}>Welcome back</h1>
              <form onSubmit={handleLoginSubmit} className="auth-form">
                <label>
                  Email or Phone Number
                  <input
                    name="identifier"
                    required
                    autoFocus
                    value={loginForm.identifier}
                    onChange={handleLoginChange}
                    placeholder="you@example.com or 98765xxxxx"
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    name="password"
                    required
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    placeholder="Your password"
                  />
                </label>

                {error && <p className="auth-error">{error}</p>}

                <div className="auth-row">
                  <Link to="/forgot-password" className="auth-link-btn">Forgot password?</Link>
                </div>

                <button type="submit" className="btn btn--primary" disabled={loading}>
                  {loading ? 'Logging in…' : 'Login'}
                </button>
              </form>

              <p className="auth-switch">
                New here? <button type="button" className="auth-link-btn auth-switch-btn" onClick={() => switchTab('signup')}>Create an account</button>
              </p>
            </>
          )}

          {tab === 'signup' && signupStep === 'details' && (
            <>
              <h1 className="section__title" style={{ textAlign: 'left' }}>Create your account</h1>
              <form onSubmit={handleSignupDetailsSubmit} className="auth-form">
                <div className="auth-form-row">
                  <label>
                    Full Name
                    <input name="name" required autoFocus value={signupForm.name} onChange={handleSignupChange} placeholder="Your name" />
                  </label>
                  <label>
                    Phone Number
                    <input type="tel" name="phone" required value={signupForm.phone} onChange={handleSignupChange} placeholder="10-digit mobile number" />
                  </label>
                </div>
                <label>
                  Email
                  <input type="email" name="email" required value={signupForm.email} onChange={handleSignupChange} placeholder="you@example.com" />
                </label>
                <div className="auth-form-row">
                  <label>
                    Password
                    <input type="password" name="password" required minLength={6} value={signupForm.password} onChange={handleSignupChange} placeholder="Min 6 chars" />
                  </label>
                  <label>
                    Confirm Password
                    <input type="password" name="confirmPassword" required minLength={6} value={signupForm.confirmPassword} onChange={handleSignupChange} placeholder="Re-enter password" />
                  </label>
                </div>

                {error && <p className="auth-error">{error}</p>}

                <button type="submit" className="btn btn--primary" disabled={loading}>
                  {loading ? 'Creating account…' : 'Sign Up'}
                </button>
              </form>

              <p className="auth-switch">
                Already have an account? <button type="button" className="auth-link-btn auth-switch-btn" onClick={() => switchTab('login')}>Log in</button>
              </p>
            </>
          )}

          {tab === 'signup' && signupStep === 'otp' && (
            <>
              <h1 className="section__title" style={{ textAlign: 'left' }}>Verify your email</h1>
              <form onSubmit={handleOtpSubmit} className="auth-form">
                {info && <p className="auth-info">{info}</p>}
                <label>
                  Enter the 6-digit code
                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    required
                    autoFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••••"
                    className="auth-otp-input"
                  />
                </label>

                {error && <p className="auth-error">{error}</p>}

                <button type="submit" className="btn btn--primary" disabled={loading || otp.length !== 6}>
                  {loading ? 'Verifying…' : 'Verify & Continue'}
                </button>
                <button type="button" className="auth-link-btn" onClick={handleResend}>
                  Didn't get the code? Resend
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
