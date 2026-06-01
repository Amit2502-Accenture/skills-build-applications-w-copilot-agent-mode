import { useEffect, useState } from 'react'

interface Team {
  _id: string
  name: string
  description?: string
  members: any[]
  leader: any
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      setLoading(true)
      setError(null)
      const apiBaseUrl = getApiBaseUrl()
      const response = await fetch(`${apiBaseUrl}/api/teams/`)
      if (!response.ok) {
        throw new Error(`Failed to fetch teams: ${response.statusText}`)
      }
      const data = await response.json()
      setTeams(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setTeams([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading teams...</div>

  return (
    <div className="component-container">
      <h2>🤝 Teams</h2>
      {error && <div className="error">Error: {error}</div>}
      {teams.length === 0 ? (
        <div className="no-data">No teams found</div>
      ) : (
        <ul className="data-list">
          {teams.map((team) => (
            <li key={team._id} className="data-item">
              <strong>{team.name}</strong>
              {team.description && <><br />📝 {team.description}</>
              <br />👥 Members: {team.members?.length || 0}
              <br />👨‍💼 Leader: {team.leader?.username || 'Unknown'}
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

export default Teams
