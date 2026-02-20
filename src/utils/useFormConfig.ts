import { useEffect } from 'react'
import { useFormConfigStore } from '../store/store'
import { loadFormConfig } from '../services/api'

/**
 * Hook personalizado para manejar la configuración del formulario desde la API
 * @param autoLoad - Si es true, carga automáticamente la configuración al montar el componente
 */
export const useFormConfig = (autoLoad = false) => {
  const { formConfig, isLoading, error, setFormConfig, setLoading, setError, clearFormConfig } = useFormConfigStore()

  useEffect(() => {
    if (autoLoad && !formConfig) {
      loadFormConfig().catch(console.error)
    }
  }, [autoLoad, formConfig])

  const refresh = async () => {
    await loadFormConfig()
  }

  return {
    formConfig,
    isLoading,
    error,
    setFormConfig,
    setLoading,
    setError,
    clearFormConfig,
    refresh,
  }
}
