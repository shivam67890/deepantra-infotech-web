import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/client.js'
import './Auth.css'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState('request') // 'request' -> 'reset'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRequest(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.forgotPassword({ email })
      setInfo(`A password reset code has been emailed to ${email}.`)
      setStep('reset')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleReset(e) {
    e.preventDefault()
    setError('')
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      await api.resetPassword({ email, otp, newPassword, confirmNewPassword })
      setInfo('Password updated. Redirecting to login…')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="container">
        <div className="auth-card">
          <h1 className="section__title" style={{ textAlign: 'left' }}>Reset your password</h1>

          {step === 'request' && (
            <form onSubmit={handleRequest} className="auth-form">
              <label>
                Email
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </label>
              {error && <p className="auth-error">{error}</p>}
              <button type="submit" className="btn btn--primary" disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Code'}
              </button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handleReset} className="auth-form">
              {info && <p className="auth-info">{info}</p>}
              <label>
                6-digit code
                <input
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••••"
                  className="auth-otp-input"
                />
              </label>
              <label>
                New Password
                <input type="password" required minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 6 characters" />
              </label>
              <label>
                Confirm New Password
                <input type="password" required minLength={6} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Re-enter new password" />
              </label>
              {error && <p className="auth-error">{error}</p>}
              <button type="submit" className="btn btn--primary" disabled={loading}>
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          )}

          <p className="auth-switch">
            Remembered it? <Link to="/login">Back to login</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
