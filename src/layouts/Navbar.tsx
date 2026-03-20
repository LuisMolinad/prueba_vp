import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { getMenuEndpointData } from '../services/api'
import type {
  Action,
  Navigation,
  Root as MenuResponse,
} from '../types/menuData'

export function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [brandLogoText, setBrandLogoText] = useState('CW')
  const [brandName, setBrandName] = useState('Club Website')
  const [brandUrl, setBrandUrl] = useState('/')
  const [navigation, setNavigation] = useState<Navigation[]>([])
  const [actions, setActions] = useState<Action[]>([])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await getMenuEndpointData<MenuResponse>()
        setBrandLogoText(response?.data?.brand?.logoText || 'CW')
        setBrandName(response?.data?.brand?.name || 'Club Website')
        setBrandUrl(response?.data?.brand?.url || '/')
        setNavigation(response?.data?.navigation || [])
        setActions(response?.data?.actions || [])
      } catch {
        setBrandLogoText('CW')
        setBrandName('Club Website')
        setBrandUrl('/')
        setNavigation([])
        setActions([])
      }
    }

    fetchMenu().catch(() => {})
  }, [])

  const visibleNavigation = useMemo(
    () => navigation.filter((item) => item.visible).sort((a, b) => a.order - b.order),
    [navigation]
  )

  const visibleActions = useMemo(
    () => actions.filter((item) => item.visible).sort((a, b) => a.order - b.order),
    [actions]
  )

  const normalizeMenuHref = (href: string) => {
    if (href === '/') return '/home'
    if (href.startsWith('#')) return `/home${href}`
    return href
  }

  const handleAction = (action: Action) => {
    closeMenu()

    if (action.action === 'logout') {
      navigate('/login')
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/95 backdrop-blur-sm">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to={normalizeMenuHref(brandUrl)}
            className="flex items-center gap-3"
            onClick={closeMenu}
          >
            <span className="h-11 w-11 rounded-[16px] bg-gradient-to-br from-indigo-700 to-red-600 text-white font-bold text-xl flex items-center justify-center shadow">
              {brandLogoText}
            </span>
            <span className="leading-tight">
              <span className="text-xl font-bold  md:text-[34px] font-bold text-lm-blue">{brandName}</span>
{/*               <span className="block text-[13px] md:text-[20px] text-slate-600">{brandSubtitle}</span> */}
            </span>
          </Link>

          {/* Desktop  */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {visibleNavigation.map((link) => (
              <a
                key={link.id}
                href={normalizeMenuHref(link.href)}
                className="px-2 lg:px-3 py-2 rounded-full text-[14px] lg:text-[16px] font-semibold text-slate-800 hover:text-av-red transition-colors"
              >
                {link.label}
              </a>
            ))}
            {visibleActions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleAction(item)}
                className="px-5 lg:px-6 h-11 rounded-full border border-lm-blue text-lm-blue text-[14px] lg:text-[16px] font-semibold hover:bg-lm-blue hover:text-white transition-colors"
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 text-slate-700"
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
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
            onClick={closeMenu}
            onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
            style={{ top: '64px' }}
            aria-label="Cerrar men\u00fa"
          />

          {/* Sidebar */}
          <div className="absolute left-0 right-0 top-16 z-40 bg-white border-b border-slate-200 md:hidden">
            <div className="px-3 py-2 space-y-1">
              {visibleNavigation.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded text-base font-medium text-slate-700 hover:text-lm-blue hover:bg-slate-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {visibleActions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAction(item)}
                  type="button"
                  className="w-full text-left px-3 py-2 rounded text-base font-medium border border-lm-blue text-lm-blue hover:bg-slate-100 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
