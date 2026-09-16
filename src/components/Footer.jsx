import { Link } from 'react-router-dom'
import './Footer.css'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/programs', label: 'Programs' },
  { to: '/contact', label: 'Contact' },
  { to: '/login', label: 'Login / Sign Up' },
]

// Real brand marks instead of plain text initials (FB / IG / IN / YT).
// Single-color currentColor paths so they follow the footer's link color
// and only need one hover rule.
const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.43-3.96 4.06V9.9H8v3.1h2.37V21h3.13z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.2a1.97 1.97 0 100 3.94 1.97 1.97 0 000-3.94zM20.44 20h-3.37v-6.06c0-1.44-.03-3.3-2.01-3.3-2.02 0-2.33 1.58-2.33 3.2V20H9.36V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.06 2.26 4.06 5.2V20z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.6a2.8 2.8 0 00-1.97-1.98C18 5.2 12 5.2 12 5.2s-6 0-7.63.42A2.8 2.8 0 002.4 7.6 29.4 29.4 0 002 12a29.4 29.4 0 00.4 4.4 2.8 2.8 0 001.97 1.98C6 18.8 12 18.8 12 18.8s6 0 7.63-.42A2.8 2.8 0 0021.6 16.4a29.4 29.4 0 00.4-4.4 29.4 29.4 0 00-.4-4.4zM9.98 15.02V8.98L15.5 12l-5.52 3.02z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <h3 className="footer__brand">Deepantra Infotech</h3>
          <p className="footer__tag">Illuminating minds, engineering the future.</p>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact Us</h4>
          <p>+91 98455 32045</p>
          <p>deepantrainfotech@gmail.com</p>
        </div>

        <div className="footer__col">
          <h4>Follow Us</h4>
          <div className="footer__social">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="footer__bottom">© 2026 Deepantra Infotech. All Rights Reserved.</p>
    </footer>
  )
}
