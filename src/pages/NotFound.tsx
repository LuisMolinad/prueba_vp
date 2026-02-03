import { Link } from 'react-router-dom'
import { useThemeStore } from '../store/store'

export function NotFound() {
  const { theme } = useThemeStore()

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-[calc(100vh-180px)] bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4"></div>
          </div>

          {/* Message */}
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Oops, página no encontrada
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
            Lo sentimos, la página que estás buscando no existe. Puede que haya sido eliminada,
            movida o escribiste mal la URL.
          </p>

          {/* Suggestions */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700 mb-8">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 mb-4">Aquí hay algunas opciones:</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-left">
              <li className="flex items-center gap-2">
                <span className="text-orange-500">→</span> Verifica que la URL sea correcta
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">→</span> Regresa a la página principal
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">→</span> Usa la navegación para explorar
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              ← Volver al Inicio
            </Link>
            <Link
              to="/dashboard"
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold py-3 px-8 rounded-lg transition-all border border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
            >
              Ver Dashboard
            </Link>
          </div>

          {/* Fun Easter Egg */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-gray-600 dark:text-gray-500 text-sm">
              Error Code: <span className="text-gray-700 dark:text-gray-400 font-mono">404_PAGE_NOT_FOUND</span>
            </p>
            <p className="text-gray-500 dark:text-gray-600 text-xs mt-2">
              Alguien se perdió
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
