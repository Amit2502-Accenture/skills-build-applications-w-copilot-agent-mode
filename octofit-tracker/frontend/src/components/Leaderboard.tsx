import { useEffect, useState } from 'react'

interface LeaderboardEntry {
  _id: string
  userId: any
  totalCalories: number
  totalActivities: number
  totalDistance: number
  rank: number
  weeklyCalories: number
  monthlyCalories: number
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      setError(null)
      const apiBaseUrl = getApiBaseUrl()
      const response = await fetch(`${apiBaseUrl}/api/leaderboard/`)
      if (!response.ok) {
        throw new Error(`Failed to fetch leaderboard: ${response.statusText}`)
      }
      const data = await response.json()
      setLeaderboard(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setLeaderboard([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading leaderboard...</div>

  return (
    <div className="component-container">
      <h2>🏆 Leaderboard</h2>
      {error && <div className="error">Error: {error}</div>}
      {leaderboard.length === 0 ? (
        <div className="no-data">No leaderboard data found</div>
      ) : (
        <ul className="data-list">
          {leaderboard.map((entry, index) => (
            <li key={entry._id} className="data-item">
              <strong>#{index + 1} {entry.userId?.username || 'Unknown User'}</strong>
              <br />
              🔥 Total Calories: {entry.totalCalories}
              <br />
              📊 Activities: {entry.totalActivities} | 📍 Distance: {entry.totalDistance} km
              <br />
              📅 Weekly: {entry.weeklyCalories} cal | 📈 Monthly: {entry.monthlyCalories} cal
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

export default Leaderboard
