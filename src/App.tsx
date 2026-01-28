import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useThemeStore } from './store/store'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Dashboard } from './pages/Dashboard'
import { NotFound } from './pages/NotFound'
import { ThemeToggle } from './components/ThemeToggle'

function AppContent() {
  const isDark = useThemeStore((state) => state.theme === 'dark')

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? 'bg-slate-900 text-white'
          : 'bg-white text-slate-900'
      }`}
    >
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 shadow-lg border-b transition-colors duration-300 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all"
          >
            FilterApp
          </Link>

          <div className="flex items-center gap-6">
            <ul className="flex gap-6 items-center">
              <li>
                <Link
                  to="/"
                  className={`transition-colors px-3 py-2 rounded hover:bg-opacity-20 ${
                    isDark
                      ? 'text-gray-300 hover:text-white hover:bg-white'
                      : 'text-gray-700 hover:text-slate-900 hover:bg-slate-900'
                  }`}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className={`transition-colors px-3 py-2 rounded hover:bg-opacity-20 ${
                    isDark
                      ? 'text-gray-300 hover:text-white hover:bg-white'
                      : 'text-gray-700 hover:text-slate-900 hover:bg-slate-900'
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`transition-colors px-3 py-2 rounded hover:bg-opacity-20 ${
                    isDark
                      ? 'text-gray-300 hover:text-white hover:bg-white'
                      : 'text-gray-700 hover:text-slate-900 hover:bg-slate-900'
                  }`}
                >
                  Acerca de
                </Link>
              </li>
            </ul>

            {/* Theme Toggle */}
            <div className={`ml-4 border-l pl-4 ${isDark ? 'border-slate-700' : 'border-slate-300'}`}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer
        className={`border-t mt-12 transition-colors duration-300 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-slate-100 border-slate-200'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-4 py-8 text-center ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>&copy; 2026 FilterApp - Creado con React + Router + Tailwind</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App