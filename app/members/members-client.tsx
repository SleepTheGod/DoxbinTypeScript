"use client"

import React from "react"

export default function MembersClient() {
  const [members, setMembers] = React.useState<any[]>([])
  const [totalCount, setTotalCount] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/members")
        if (!response.ok) {
          throw new Error("Failed to fetch members")
        }
        const data = await response.json()
        setMembers(data.members)
        setTotalCount(data.count)
      } catch (err) {
        setError("Failed to load members")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="container">
        <div className="loading-message">Loading members...</div>
        <style jsx>{`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .loading-message {
            text-align: center;
            color: #a0a0a0;
            font-size: 1.1rem;
            padding: 3rem;
          }
        `}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
        <style jsx>{`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .error-message {
            text-align: center;
            color: #f0523f;
            font-size: 1.1rem;
            padding: 3rem;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="members-header">
        <h1>Members</h1>
        <p className="member-count">{totalCount.toLocaleString()} total members</p>
      </div>

      <div className="members-grid">
        {members.map((member) => (
          <div key={member.id} className="member-card">
            <div className="member-avatar">{member.name.charAt(0).toUpperCase()}</div>
            <div className="member-info">
              <h3>{member.name}</h3>
              {member.email && <p className="member-email">{member.email}</p>}
              <p className="member-date">Joined {new Date(member.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .members-header {
          margin-bottom: 2rem;
        }

        .members-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }

        .member-count {
          color: #a0a0a0;
          font-size: 0.9rem;
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .member-card {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.2s;
        }

        .member-card:hover {
          border-color: #f0523f;
          transform: translateY(-2px);
        }

        .member-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f0523f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #fff;
          flex-shrink: 0;
        }

        .member-info {
          flex: 1;
          min-width: 0;
        }

        .member-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .member-email {
          margin: 0;
          font-size: 0.85rem;
          color: #a0a0a0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .member-date {
          margin: 0.25rem 0 0 0;
          font-size: 0.8rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .members-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
