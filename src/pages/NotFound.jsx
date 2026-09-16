import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container">
        <h1 className="section__title">Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn--primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
          Back to Home
        </Link>
      </div>
    </section>
  )
}
