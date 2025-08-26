import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Resources from './pages/Resources'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 transition-colors">
        <Routes>
          <Route path="/" element={
            <div>
              <h1>CollegeMate - Coming Soon</h1>
              <p>Resource cards are available at <a href="/resources">/resources</a></p>
            </div>
          } />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
