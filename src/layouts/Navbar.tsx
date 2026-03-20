import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ThemeToggle } from '../components/ThemeToggle'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/formulario', label: 'Validaciones' },
    { href: '/about', label: 'Base' },
  ]

  return (
    <nav className="sticky top-0 z-50 shadow-lg border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all"
            onClick={closeMenu}
          >
            React Base
          </Link>

          {/* Desktop  */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="transition-colors px-3 py-2 rounded text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-white hover:bg-opacity-20"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-l border-slate-300 dark:border-slate-700 pl-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Menu Button + Theme Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile  */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            role="button"
            tabIndex={0}
            className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50 md:hidden"
            onClick={closeMenu}
            onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
            style={{ top: '64px' }}
          />

          {/* Sidebar */}
          <div className="absolute left-0 right-0 top-16 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 md:hidden">
            <div className="px-3 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded text-base font-medium text-gray-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
