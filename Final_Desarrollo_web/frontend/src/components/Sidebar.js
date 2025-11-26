import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const { user, logout } = useAuth()
  return (
    <aside className="sidebar p-3">
      <div className="profile d-flex align-items-center gap-2">
        <div className="avatar" aria-hidden="true"></div>
        <div>
          <div className="fw-bold">{user?.name || 'Invitado'}</div>
          <div className="text-muted small">{user?.email || ''}</div>
        </div>
      </div>
      {user && <button className="btn btn-outline-danger mt-3" onClick={logout}>Salir</button>}
    </aside>
  )
}