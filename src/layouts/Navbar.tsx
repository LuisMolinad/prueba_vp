import { Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { useState } from 'react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 shadow-lg border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all"
          >
            FilterApp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link
              to="/"
              className="transition-colors px-2 lg:px-3 py-2 rounded text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20"
            >
              Inicio
            </Link>
            <Link
              to="/dashboard"
              className="transition-colors px-2 lg:px-3 py-2 rounded text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20"
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              className="transition-colors px-2 lg:px-3 py-2 rounded text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20"
            >
              Acerca de
            </Link>
            <Link
              to="/login"
              className="transition-colors px-2 lg:px-3 py-2 rounded text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20"
            >
              Login
            </Link>
            
            {/* Theme Toggle Desktop */}
            <div className="ml-2 lg:ml-4 border-l border-slate-300 dark:border-slate-700 pl-2 lg:pl-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button & theme toggle */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              {/* Icon */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Inicio
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Acerca de
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
