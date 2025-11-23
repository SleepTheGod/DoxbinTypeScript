"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        loadStats()
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      setStats(data)
    } catch (err) {}
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <style jsx>{`
          .admin-login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .admin-login-box {
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 12px;
            padding: 3rem;
            width: 100%;
            max-width: 400px;
          }

          .admin-login-box h1 {
            margin: 0 0 2rem 0;
            color: #ffffff;
            text-align: center;
            font-size: 1.75rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #a0a0a0;
            font-size: 0.9rem;
            font-weight: 500;
          }

          .form-group input {
            width: 100%;
            padding: 0.75rem;
            background: #000;
            border: 1px solid #333;
            border-radius: 6px;
            color: #fff;
            font-size: 1rem;
          }

          .form-group input:focus {
            outline: none;
            border-color: #f0523f;
          }

          .error-message {
            background: rgba(240, 82, 63, 0.1);
            border: 1px solid #f0523f;
            color: #f0523f;
            padding: 0.75rem;
            border-radius: 6px;
            margin-bottom: 1rem;
            font-size: 0.9rem;
          }

          button {
            width: 100%;
            padding: 0.875rem;
            background: #f0523f;
            border: none;
            border-radius: 6px;
            color: #fff;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }

          button:hover:not(:disabled) {
            background: #d64430;
            transform: translateY(-1px);
          }

          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, kt</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Pastes</h3>
          <p className="stat-value">{stats?.totalPastes || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Members</h3>
          <p className="stat-value">{stats?.totalMembers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Views</h3>
          <p className="stat-value">{stats?.totalViews || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p className="stat-value">{stats?.activeUsers || 0}</p>
        </div>
      </div>

      <div className="admin-actions">
        <button onClick={() => router.push("/members")}>View Members</button>
        <button onClick={() => router.push("/")}>View Pastes</button>
        <button onClick={() => setIsAuthenticated(false)}>Logout</button>
      </div>

      <style jsx>{`
        .admin-dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .admin-header {
          margin-bottom: 2rem;
        }

        .admin-header h1 {
          margin: 0 0 0.5rem 0;
          color: #ffffff;
          font-size: 2rem;
        }

        .admin-header p {
          margin: 0;
          color: #a0a0a0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
        }

        .stat-card h3 {
          margin: 0 0 1rem 0;
          color: #a0a0a0;
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .stat-value {
          margin: 0;
          color: #f0523f;
          font-size: 2.5rem;
          font-weight: bold;
        }

        .admin-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .admin-actions button {
          padding: 0.875rem 1.5rem;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 6px;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-actions button:hover {
          border-color: #f0523f;
          background: #2a2a2a;
        }
      `}</style>
    </div>
  )
}
