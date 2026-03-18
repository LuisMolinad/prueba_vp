import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-180px)] bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4"></div>
        </div>

        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Ruta no encontrada
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
          La URL no existe en esta base. Regresa al inicio para continuar.
        </p>

        <div className="flex justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-gray-600 dark:text-gray-500 text-sm">
            Error Code: <span className="text-gray-700 dark:text-gray-400 font-mono">404_PAGE_NOT_FOUND</span>
          </p>
        </div>
      </div>
    </div>
  )
}
