import './AdminUsers.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Shield } from 'lucide-react'
import { api } from '../api/client'
import { useAuth } from '../context/AuthContext'

const ROLES = ['student', 'faculty', 'admin']

export default function AdminUsers() {
  const { token } = useAuth()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [token]) // eslint-disable-line

  async function loadUsers(q) {
    setLoading(true)
    try {
      const res = await api.getAdminUsers(q ? { search: q } : {}, token)
      setUsers(res.users || [])
    } catch { /* silent */ }
    finally { setLoading(false) }
  }

  function handleSearch(e) {
    e.preventDefault()
    loadUsers(search)
  }

  async function changeRole(userId, newRole) {
    try {
      await api.updateUserRole(userId, newRole, token)
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)))
    } catch (err) { alert(err.message) }
  }

  return (
    <section className="portal-page">
      <div className="container">
        <Link to="/admin/analytics" className="portal-back"><ArrowLeft size={16} /> Admin Analytics</Link>
        <h1 className="td-title"><Shield size={22} /> User Management</h1>

        <form className="au-search" onSubmit={handleSearch}>
          <Search size={16} />
          <input placeholder="Search by name or email…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn btn--primary" style={{ padding: '0.5rem 1rem' }}>Search</button>
        </form>

        {loading ? <p className="portal-empty">Loading…</p> : (
          <div className="au-table-wrap">
            <table className="au-table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="au-name">{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <select
                        className="au-role-select"
                        value={u.role}
                        onChange={(e) => changeRole(u._id, e.target.value)}
                      >
                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </td>
                    <td className="au-date">{new Date(u.createdAt).toLocaleDateString()}</td>
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
