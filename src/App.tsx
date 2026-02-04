import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useThemeStore } from './store/store'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Dashboard } from './pages/Dashboard'
import { NotFound } from './pages/NotFound'
import { Login } from './pages/Login'
import { Navbar } from './layouts/Navbar'
import { Footer } from './layouts/Footer'

function AppContent() {
  const { theme } = useThemeStore()

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
        <Navbar />

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
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