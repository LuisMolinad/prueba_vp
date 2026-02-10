const API_BASE_URL = import.meta.env.VITE_API_URL

const fetchAPI = async ( options?: RequestInit) => {
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

export const getData = async () => {
  return fetchAPI( {
    method: 'GET',
  })
}