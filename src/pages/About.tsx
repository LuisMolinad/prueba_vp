export function About() {
  return (
    <section className="max-w-4xl mx-auto px-3 md:px-4 lg:px-6 py-8 md:py-12">
      {/* Main Heading */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
          Acerca de esta base
        </h1>
        <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
      </div>

      {/* Content Grid */}
      <div className="space-y-6 md:space-y-8">
        {/* Description section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
            Propósito del proyecto
          </h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p>
              Este proyecto está pensado como punto de partida para apps que consumen endpoints con estructura variable.
            </p>
            <p>
              La validación del formulario no depende de la respuesta del endpoint. Puedes definir reglas directamente en frontend y mantenerlas versionadas junto al código.
            </p>
          </div>
        </div>

        {/* Features section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
            Características incluidas
          </h2>
          <ul className="space-y-2 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span>React 19 + TypeScript para desarrollo robusto</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span>Tailwind CSS 4 para diseño responsive y ágil</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span>React Router v7 para enrutamiento de SPAs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span>Tema dark/light persistente con Zustand</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span>Validación con Zod + React Hook Form</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">✓</span>
              <span>API client genérico y reutilizable</span>
            </li>
          </ul>
        </div>

        {/* Structure section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 md:p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 md:mb-4">
            Estructura del proyecto
          </h2>
          <div className="space-y-2 text-sm md:text-base text-slate-700 dark:text-slate-300 font-mono bg-slate-50 dark:bg-slate-950 p-3 md:p-4 rounded overflow-x-auto">
            <div>src/</div>
            <div className="pl-4">├── components/     <span className="text-slate-500 dark:text-slate-400"># Componentes reutilizables</span></div>
            <div className="pl-4">├── pages/          <span className="text-slate-500 dark:text-slate-400"># Rutas principales</span></div>
            <div className="pl-4">├── layouts/        <span className="text-slate-500 dark:text-slate-400"># Navbar, Footer</span></div>
            <div className="pl-4">├── store/          <span className="text-slate-500 dark:text-slate-400"># Zustand store (tema)</span></div>
            <div className="pl-4">├── utils/          <span className="text-slate-500 dark:text-slate-400"># Validación, hooks</span></div>
            <div className="pl-4">└── App.tsx         <span className="text-slate-500 dark:text-slate-400"># Enrutamiento</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
