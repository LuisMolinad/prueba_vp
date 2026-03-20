import type { ApiError, ApiRequestConfig, EndpointPayload } from '../types/type'
import envConfig from '../../env-config.ts'

const API_BASE_URL = envConfig.apiUrl

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value)

const buildUrl = (endpoint: string): string => {
  if (isAbsoluteUrl(endpoint)) return endpoint

  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

  if (!API_BASE_URL) return normalizedEndpoint

  return `${API_BASE_URL.replace(/\/$/, '')}${normalizedEndpoint}`
}

export const requestJson = async <T = EndpointPayload>({
  endpoint,
  method = 'GET',
  body,
  headers,
}: ApiRequestConfig): Promise<T> => {
  const response = await fetch(buildUrl(endpoint), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (!response.ok) {
    console.error('Error en la solicitud:', response)
    let message = `${response.status} ${response.statusText}`

    try {
      const errorData = (await response.json()) as { message?: string }
      console.error('Error data:', errorData)
      if (errorData.message) {
        message = errorData.message
      }
    } catch {
      // Keep default message when response body is not JSON.
    }

    const apiError: ApiError = {
      status: response.status,
      message,
    }

    throw apiError
  }

  return response.json() as Promise<T>
}

export const getEndpointData = async (endpoint = '/'): Promise<EndpointPayload> => {
  return requestJson<EndpointPayload>({
    endpoint,
    method: 'GET',
  })
}

export const getConfiguredEndpointData = async (): Promise<EndpointPayload> => {
  return requestJson<EndpointPayload>({
    endpoint: API_BASE_URL || '/',
    method: 'GET',
  })
}

export const getMenuEndpointData = async <T>(): Promise<T> => {
  return requestJson<T>({
    endpoint: envConfig.menuData || '/menu',
    method: 'GET',
  })
}

export const getLoginEndpointData = async <T>(): Promise<T> => {
  return requestJson<T>({
    endpoint: envConfig.loginData || '/login-content',
    method: 'GET',
  })
}

export const getHomeContentEndpointData = async <T>(): Promise<T> => {
  return requestJson<T>({
    endpoint: envConfig.contentData || '/home-content',
    method: 'GET',
  })
}

export const postEndpointData = async (
  endpoint: string,
  data: Record<string, unknown>
): Promise<EndpointPayload> => {
  return requestJson<EndpointPayload>({
    endpoint,
    method: 'POST',
    body: data,
  })
} 