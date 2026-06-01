import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>🐙 OctoFit Tracker</h1>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/workouts">Workouts</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="home">
      <h2>Welcome to OctoFit Tracker</h2>
      <p>Your personal fitness tracking application built with React 19 and Node.js</p>
      <div className="home-info">
        <h3>Features:</h3>
        <ul>
          <li>👥 Manage Users and Teams</li>
          <li>🏃 Track Fitness Activities</li>
          <li>💪 Log Your Workouts</li>
          <li>🏆 View Leaderboard Rankings</li>
          <li>📊 Monitor Your Progress</li>
        </ul>
      </div>
    </div>
  )
}

export default App
