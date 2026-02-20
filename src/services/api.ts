import type { FormAPIResponse } from '../types/type'
import { useFormConfigStore } from '../store/store'

const API_BASE_URL = import.meta.env.VITE_API_URL

const fetchAPI = async <T = unknown>(options?: RequestInit): Promise<T> => {
  const response = await fetch(API_BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export const getData = async (): Promise<FormAPIResponse> => {
  return fetchAPI<FormAPIResponse>({
    method: 'GET',
  })
}

export const submitFormData = async (data: Record<string, unknown>): Promise<{ status: number; message: string }> => {
  return fetchAPI<{ status: number; message: string }>({
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// Función helper para cargar la configuración del formulario y almacenarla en el store
export const loadFormConfig = async (): Promise<void> => {
  const { setLoading, setFormConfig, setError } = useFormConfigStore.getState()
  
  try {
    setLoading(true)
    const config = await getData()
    setFormConfig(config)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al cargar la configuración'
    setError(errorMessage)
    throw error
  } finally {
    setLoading(false)
  }
}