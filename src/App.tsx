import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useThemeStore } from './store/store'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Dashboard } from './pages/Dashboard'
import { NotFound } from './pages/NotFound'
import { ThemeToggle } from './components/ThemeToggle'

function AppContent() {
  const { theme } = useThemeStore()

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 shadow-lg border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
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
                    className="transition-colors px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="transition-colors px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="transition-colors px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20"
                  >
                    Acerca de
                  </Link>
                </li>
              </ul>

              {/* Theme Toggle */}
              <div className="ml-4 border-l border-slate-300 dark:border-slate-700 pl-4">
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
        <footer className="border-t border-slate-200 dark:border-slate-700 mt-12 bg-slate-100 dark:bg-slate-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2026 FilterApp - Creado con React + Router + Tailwind</p>
          </div>
        </footer>
      </div>
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