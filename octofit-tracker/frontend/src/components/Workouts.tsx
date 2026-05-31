import { useEffect, useState } from 'react'

interface Workout {
  _id: string
  name: string
  exercises: Array<{
    name: string
    sets: number
    reps: number
    weight?: number
  }>
  duration: number
  notes?: string
  date: string
  userId: any
}

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const fetchWorkouts = async () => {
    try {
      setLoading(true)
      setError(null)
      const apiBaseUrl = getApiBaseUrl()
      const response = await fetch(`${apiBaseUrl}/api/workouts/`)
      if (!response.ok) {
        throw new Error(`Failed to fetch workouts: ${response.statusText}`)
      }
      const data = await response.json()
      setWorkouts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setWorkouts([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading workouts...</div>

  return (
    <div className="component-container">
      <h2>💪 Workouts</h2>
      {error && <div className="error">Error: {error}</div>}
      {workouts.length === 0 ? (
        <div className="no-data">No workouts found</div>
      ) : (
        <ul className="data-list">
          {workouts.map((workout) => (
            <li key={workout._id} className="data-item">
              <strong>{workout.name}</strong>
              <br />
              ⏱️ Duration: {workout.duration} min
              <br />
              🏋️ Exercises: {workout.exercises?.length || 0}
              {workout.exercises && workout.exercises.length > 0 && (
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  {workout.exercises.map((ex, idx) => (
                    <li key={idx}>
                      {ex.name} - {ex.sets}x{ex.reps}{ex.weight ? ` @ ${ex.weight}kg` : ''}
                    </li>
                  ))}
                </ul>
              )}
              <br />
              📅 {new Date(workout.date).toLocaleDateString()}
              {workout.notes && <><br />📝 {workout.notes}</>
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

export default Workouts
