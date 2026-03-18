import { useCallback, useState } from 'react'
import { getEndpointData } from '../services/api'
import type { EndpointPayload, EndpointState } from '../types/type'

export const useEndpointData = (endpoint: string) => {
  const [state, setState] = useState<EndpointState>({
    data: null,
    isLoading: false,
    error: null,
  })

  const load = useCallback(async (): Promise<EndpointPayload> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const data = await getEndpointData(endpoint)
      setState({ data, isLoading: false, error: null })
      return data
    } catch (error) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'No fue posible obtener datos del endpoint'

      setState((prev) => ({ ...prev, isLoading: false, error: message }))
      throw error
    }
  }, [endpoint])

  return {
    ...state,
    load,
  }
}
