import { Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 shadow-lg border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all"
          >
            Mi App
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="transition-colors px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20"
            >
              Inicio
            </Link>
            <Link
              to="/formulario"
              className="transition-colors px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20"
            >
              Formulario
            </Link>
            
            <div className="border-l border-slate-300 dark:border-slate-700 pl-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
