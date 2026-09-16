import { useState, useEffect } from 'react'
import { api } from '../api/client.js'
import { Phone, Mail, MapPin } from 'lucide-react'
import './Contact.css'
import './Home.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    organization: '',
    contactPerson: '',
    phone: '',
    email: '',
    message: '',
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.anim').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.bookDemo(form)
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section section--soft contact-page">
      <div className="contact-page__glow contact-page__glow--amber" />
      <div className="contact-page__glow contact-page__glow--indigo" />
      <div className="container contact__inner">
        
        {/* Left Side: Info */}
        <div className="contact__info anim">
          <div className="contact__header">
            <span className="eyebrow">Get Started</span>
            <h1 className="contact__title">Book a Free <span className="text-orange">Demo</span></h1>
            <p className="contact__sub">
              Tell us a bit about your school or institution and we'll set up a free interactive demo session, online or offline.
            </p>
          </div>

          <div className="contact__details">
            <div className="contact__detail-item">
              <div className="contact__detail-icon"><Phone size={20} strokeWidth={2.5} /></div>
              <div>
                <strong>Phone Contact</strong>
                <p>+91 98455 32045</p>
              </div>
            </div>
            
            <div className="contact__detail-item">
              <div className="contact__detail-icon"><Mail size={20} strokeWidth={2.5} /></div>
              <div>
                <strong>Email Address</strong>
                <p>deepantrainfotech@gmail.com</p>
              </div>
            </div>

            <div className="contact__detail-item">
              <div className="contact__detail-icon"><MapPin size={20} strokeWidth={2.5} /></div>
              <div>
                <strong>Session Modes</strong>
                <p>In-Person Campus Workshops & Interactive Virtual Webinars</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="contact__form-wrapper anim anim--delay-1">
          <form className="contact__form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">🎉</div>
                <h3>Request Received!</h3>
                <p>We've sent a confirmation email to <strong>{form.email}</strong>. Our team will reach out shortly to schedule your demo session.</p>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label>School / Organization Name</label>
                  <input type="text" name="organization" required value={form.organization} onChange={handleChange} placeholder="e.g. Green Valley Public School" />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" name="contactPerson" required value={form.contactPerson} onChange={handleChange} placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@school.edu" />
                </div>

                <div className="form-group">
                  <label>Message / Preferred Session Timing</label>
                  <textarea rows="4" name="message" value={form.message} onChange={handleChange} placeholder="Grades you're interested in, preferred timing, estimated student count, etc." />
                </div>

                {error && <p className="auth-error">{error}</p>}
                
                <button type="submit" className="btn btn--primary btn--full btn--shadow" disabled={loading}>
                  {loading ? 'Submitting…' : 'Request Free Demo →'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
