export function About() {
  return (
    <div className="min-h-[calc(100vh-180px)] bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Acerca de FilterApp
        </h1>

        <div className="space-y-4 sm:space-y-6">
          <section className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-purple-600 dark:text-purple-300">¿Qué es FilterApp?</h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              FilterApp es una aplicación moderna construida con React, React Router y Tailwind CSS.
              Proporciona herramientas poderosas para filtrar y buscar información en tiempo real de manera
              eficiente y con una interfaz hermosa.
            </p>
          </section>

          <section className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-pink-600 dark:text-pink-300">Características</h2>
            <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">✓</span> Búsqueda en tiempo real
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">✓</span> Filtrado por múltiples campos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">✓</span> Componentes reutilizables
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">✓</span> Navegación fluida con React Router
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">✓</span> Diseño responsive con Tailwind
              </li>
            </ul>
          </section>

          <section className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-cyan-600 dark:text-cyan-300">Tecnologías</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {['React 19', 'TypeScript', 'Tailwind CSS', 'React Router', 'Vite', 'Zustand'].map((tech) => (
                <div
                  key={tech}
                  className="bg-white dark:bg-slate-700 rounded px-3 sm:px-4 py-2 text-center text-xs sm:text-sm text-cyan-600 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
