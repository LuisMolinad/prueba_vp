import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Navigation */}
        <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all"
            >
              FilterApp
            </Link>

            <ul className="flex gap-6 items-center">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded hover:bg-slate-700"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded hover:bg-slate-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded hover:bg-slate-700"
                >
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-800 border-t border-slate-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">
            <p>&copy; 2026 FilterApp - Creado con React + Router + Tailwind</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App