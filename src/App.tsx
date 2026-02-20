import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useThemeStore } from './store/store'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Navbar } from './layouts/Navbar'
import { Footer } from './layouts/Footer'
import { DynamicForm } from './components/DynamicForm'

function AppContent() {
  const { theme } = useThemeStore()

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300 flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formulario" element={<DynamicForm />} />
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