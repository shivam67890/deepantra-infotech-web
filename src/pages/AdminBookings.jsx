import './AdminBookings.css';

import {
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

const statusColors = {
  new: 'new',
  contacted: 'contacted',
  scheduled: 'scheduled',
  completed: 'completed',
}

export default function AdminBookings() {
  const { token, isAuthenticated } = useAuth()
  const [bookings, setBookings] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false)
      setError('Please log in with an admin account to view demo bookings.')
      return
    }
    api
      .getDemoBookings(token)
      .then((data) => setBookings(data.bookings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [isAuthenticated, token])

  return (
    <section className="section admin-bookings">
      <div className="container">
        <h1 className="section__title" style={{ textAlign: 'left' }}>Demo Bookings</h1>

        {loading && <p>Loading bookings…</p>}

        {!loading && error && (
          <p className="admin-bookings__error">
            {error}{' '}
            {!isAuthenticated && <Link to="/login">Log in</Link>}
          </p>
        )}

        {!loading && !error && bookings?.length === 0 && (
          <p>No demo requests yet.</p>
        )}

        {!loading && !error && bookings?.length > 0 && (
          <div className="admin-bookings__table-wrap">
            <table className="admin-bookings__table">
              <thead>
                <tr>
                  <th>Organization</th>
                  <th>Contact Person</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Requested</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.organization}</td>
                    <td>{b.contactPerson}</td>
                    <td><a href={`tel:${b.phone}`}>{b.phone}</a></td>
                    <td><a href={`mailto:${b.email}`}>{b.email}</a></td>
                    <td className="admin-bookings__message">{b.message || '—'}</td>
                    <td>
                      <span className={`admin-bookings__status admin-bookings__status--${statusColors[b.status] || 'new'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}