import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getConfiguredEndpointData } from '../services/api'
import type { EndpointPayload } from '../types/type'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

interface ApiContentStore {
  data: EndpointPayload
  isLoading: boolean
  error: string | null
  fetchContent: () => Promise<void>
  clearContent: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
)

export const useApiContentStore = create<ApiContentStore>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  fetchContent: async () => {
    set((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await getConfiguredEndpointData()
      set({ data: response, isLoading: false, error: null })
    } catch (err) {
      const message =
        typeof err === 'object' && err !== null && 'message' in err
          ? String(err.message)
          : 'No fue posible obtener datos del endpoint configurado'

      set((prev) => ({ ...prev, isLoading: false, error: message }))
    }
  },
  clearContent: () => set({ data: null, error: null }),
}))
