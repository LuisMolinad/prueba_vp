import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { FormAPIResponse } from "../types/type"

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
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

// Store para la configuración del formulario desde la API
interface FormConfigStore {
  formConfig: FormAPIResponse | null
  isLoading: boolean
  error: string | null
  setFormConfig: (config: FormAPIResponse) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearFormConfig: () => void
}

export const useFormConfigStore = create<FormConfigStore>((set) => ({
  formConfig: null,
  isLoading: false,
  error: null,
  setFormConfig: (config) => set({ formConfig: config, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
  clearFormConfig: () => set({ formConfig: null, error: null, isLoading: false }),
}))