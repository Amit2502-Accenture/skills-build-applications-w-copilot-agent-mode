import { useEffect, useState } from 'react'

interface User {
  _id: string
  username: string
  email: string
  bio?: string
}

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const apiBaseUrl = getApiBaseUrl()
      const response = await fetch(`${apiBaseUrl}/api/users/`)
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`)
      }
      const data = await response.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading users...</div>

  return (
    <div className="component-container">
      <h2>👥 Users</h2>
      {error && <div className="error">Error: {error}</div>}
      {users.length === 0 ? (
        <div className="no-data">No users found</div>
      ) : (
        <ul className="data-list">
          {users.map((user) => (
            <li key={user._id} className="data-item">
              <strong>{user.username}</strong>
              <br />
              📧 {user.email}
              {user.bio && <><br />✍️ {user.bio}</>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function getApiBaseUrl(): string {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }
  return 'http://localhost:8000'
}

export default Users
