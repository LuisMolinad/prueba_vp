import { useEffect, useState } from 'react'
import { getData } from '../services/api'
export function Home() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    getData()
      .then((response) => { 
        setData(response)
        setLoading(false)
      }
      )
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
      </div>
    )
  }
    debugger
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Bienvenido
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Esta es tu página de inicio. Comienza a construir tu SPA aquí.
      </p>
    </div>
  )
}
