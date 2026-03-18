import { useEffect, useState } from 'react'
import { useEndpointData } from '../utils/useFormConfig'

export function Home() {
  const [endpoint, setEndpoint] = useState('/')
  const { data, isLoading, error, load } = useEndpointData(endpoint)

  useEffect(() => {
    load().catch(() => {
      // El mensaje de error se expone desde el hook.
    })
  }, [load])

  const handleRefresh = async () => {
    await load()
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Starter API + Validaciones
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
          Plantilla lista para consumir endpoints de estructura desconocida y definir
          validaciones en frontend con Zod.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-lg mb-3">Prueba de endpoint</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={endpoint}
            onChange={(event) => setEndpoint(event.target.value)}
            className="flex-1 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 dark:bg-slate-700"
            placeholder="/users o https://api.ejemplo.com/users"
          />
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg"
          >
            {isLoading ? 'Consultando...' : 'Consultar'}
          </button>
        </div>

        {error && (
          <p className="text-red-600 dark:text-red-400 mt-3">Error: {error}</p>
        )}

        <div className="mt-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            Respuesta cruda del endpoint
          </p>
          <pre className="text-xs sm:text-sm bg-slate-950 text-slate-100 p-4 rounded-lg overflow-auto max-h-80">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  )
}
