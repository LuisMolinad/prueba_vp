import { useThemeStore } from '../store/store'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-400 dark:border-slate-600 hover:border-slate-500 dark:hover:border-slate-500 transition-all bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
      title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {theme === 'dark' ? (
        <>
          <span className="text-lg">☀️</span>
          <span className="text-sm text-gray-300 hidden sm:inline">Claro</span>
        </>
      ) : (
        <>
          <span className="text-lg">🌙</span>
          <span className="text-sm text-gray-700 hidden sm:inline">Oscuro</span>
        </>
      )}
    </button>
  )
}
