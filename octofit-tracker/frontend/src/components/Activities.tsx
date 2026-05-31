import { useEffect, useState } from 'react'

interface Activity {
  _id: string
  type: string
  duration: number
  calories: number
  distance?: number
  intensity: 'low' | 'medium' | 'high'
  description?: string
  date: string
  userId: any
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      setError(null)
      const apiBaseUrl = getApiBaseUrl()
      const response = await fetch(`${apiBaseUrl}/api/activities/`)
      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.statusText}`)
      }
      const data = await response.json()
      setActivities(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setActivities([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading activities...</div>

  return (
    <div className="component-container">
      <h2>🏃 Activities</h2>
      {error && <div className="error">Error: {error}</div>}
      {activities.length === 0 ? (
        <div className="no-data">No activities found</div>
      ) : (
        <ul className="data-list">
          {activities.map((activity) => (
            <li key={activity._id} className="data-item">
              <strong>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</strong>
              <br />
              ⏱️ Duration: {activity.duration} min | 🔥 Calories: {activity.calories}
              {activity.distance && <><br />📍 Distance: {activity.distance} km</>
              <br />💪 Intensity: <span style={{ color: activity.intensity === 'high' ? '#e74c3c' : activity.intensity === 'medium' ? '#f39c12' : '#27ae60' }}>{activity.intensity}</span>
              <br />📅 {new Date(activity.date).toLocaleDateString()}
              {activity.description && <><br />📝 {activity.description}</>
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

export default Activities
