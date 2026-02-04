import { useState } from 'react'
import { useThemeStore } from '../store/store'
import { FilterInput } from '../components/FilterInput'

interface User {
  id: number
  name: string
  email: string
  city: string
}

const mockUsers: User[] = [
  { id: 1, name: 'Juan García', email: 'juan@example.com', city: 'Madrid' },
  { id: 2, name: 'María López', email: 'maria@example.com', city: 'Barcelona' },
  { id: 3, name: 'Carlos Rodríguez', email: 'carlos@example.com', city: 'Valencia' },
  { id: 4, name: 'Ana Martínez', email: 'ana@example.com', city: 'Sevilla' },
  { id: 5, name: 'Pablo Fernández', email: 'pablo@example.com', city: 'Bilbao' },
]

export function Home() {
  const { theme } = useThemeStore()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers)

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
  }

  const handleFilterChange = (filtered: User[]) => {
    setFilteredUsers(filtered)
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Búsqueda de Usuarios
          </h1>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-600 dark:text-gray-400">Filtra la información en tiempo real</p>

          <div className="mb-8">
            <FilterInput<User>
              data={mockUsers}
              placeholder="Buscar por nombre, email o ciudad..."
              filterFields={['name', 'email', 'city']}
              onSelect={handleSelectUser}
              onFilterChange={handleFilterChange}
              renderItem={(user) => (
                <div className="py-1">
                  <strong className="text-slate-900 dark:text-white">{user.name}</strong>
                  <div className="text-xs text-gray-600 dark:text-gray-500">{user.email}</div>
                </div>
              )}
            />
          </div>

          {selectedUser && (
            <div className="rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl transition-colors duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-slate-800 border border-blue-200 dark:border-blue-500">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-600 dark:text-blue-300">
                Usuario Seleccionado
              </h2>
              <div className="space-y-3">
                <p className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <strong>Nombre:</strong>
                  </span>
                  <span className="text-sm sm:text-base text-slate-900 dark:text-white">{selectedUser.name}</span>
                </p>
                <p className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong>
                  </span>
                  <span className="text-sm sm:text-base text-cyan-600 dark:text-cyan-300 break-all">{selectedUser.email}</span>
                </p>
                <p className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    <strong>Ciudad:</strong>
                  </span>
                  <span className="text-sm sm:text-base text-slate-900 dark:text-white">{selectedUser.city}</span>
                </p>
              </div>
            </div>
          )}

          {filteredUsers.length === 0 && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-500">
                No hay usuarios que coincidan con tu búsqueda
              </p>
            </div>
          )}

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-lg p-4 sm:p-5 border bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 transition-colors duration-300">
              <h3 className="text-sm sm:text-base font-semibold mb-2 text-blue-600 dark:text-blue-300">Total de usuarios</h3>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{mockUsers.length}</p>
            </div>
            <div className="rounded-lg p-4 sm:p-5 border bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 transition-colors duration-300">
              <h3 className="text-sm sm:text-base font-semibold mb-2 text-cyan-600 dark:text-cyan-300">Resultados encontrados</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{filteredUsers.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
