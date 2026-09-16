import { useEffect, useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { api } from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'
import './NotificationBell.css'

export default function NotificationBell() {
  const { token, isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unread, setUnread] = useState(0)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Poll every 45 seconds
  useEffect(() => {
    if (!isAuthenticated || !token) return
    let active = true
    const poll = async () => {
      try {
        const res = await api.getNotifications(token)
        if (active) {
          setNotifications(res.notifications || [])
          setUnread(res.unreadCount || 0)
        }
      } catch { /* silent */ }
    }
    poll()
    const id = setInterval(poll, 45_000)
    return () => { active = false; clearInterval(id) }
  }, [token, isAuthenticated])

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function markRead(id) {
    try {
      await api.markNotificationRead(id, token)
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)))
      setUnread((u) => Math.max(0, u - 1))
    } catch { /* silent */ }
  }

  if (!isAuthenticated) return null

  return (
    <div className="notif-bell" ref={ref}>
      <button
        className="notif-bell__btn"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unread > 0 ? ` (${unread} unread)` : ''}`}
      >
        <Bell size={18} />
        {unread > 0 && <span className="notif-bell__badge">{unread > 9 ? '9+' : unread}</span>}
      </button>

      {open && (
        <div className="notif-bell__dropdown">
          <div className="notif-bell__header">Notifications</div>
          {notifications.length === 0 ? (
            <p className="notif-bell__empty">No notifications yet.</p>
          ) : (
            <div className="notif-bell__list">
              {notifications.slice(0, 15).map((n) => (
                <div
                  key={n._id}
                  className={`notif-bell__item ${n.read ? '' : 'notif-bell__item--unread'}`}
                  onClick={() => { if (!n.read) markRead(n._id) }}
                >
                  <p className="notif-bell__msg">{n.message}</p>
                  <span className="notif-bell__time">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
