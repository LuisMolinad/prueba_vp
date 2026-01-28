import { useState } from 'react'
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers)

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
  }

  const handleFilterChange = (filtered: User[]) => {
    setFilteredUsers(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Búsqueda de Usuarios
        </h1>
        <p className="text-gray-400 mb-8">Filtra la información en tiempo real</p>

        <div className="mb-8">
          <FilterInput<User>
            data={mockUsers}
            placeholder="Buscar por nombre, email o ciudad..."
            filterFields={['name', 'email', 'city']}
            onSelect={handleSelectUser}
            onFilterChange={handleFilterChange}
            renderItem={(user) => (
              <div className="py-1">
                <strong className="text-white">{user.name}</strong>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            )}
          />
        </div>

        {selectedUser && (
          <div className="bg-gradient-to-br from-blue-900 to-slate-800 border border-blue-500 rounded-lg p-6 mb-8 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">
              Usuario Seleccionado
            </h2>
            <div className="space-y-3">
              <p className="flex justify-between items-center">
                <span className="text-gray-300">
                  <strong>Nombre:</strong>
                </span>
                <span className="text-white">{selectedUser.name}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-300">
                  <strong>Email:</strong>
                </span>
                <span className="text-cyan-300">{selectedUser.email}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-300">
                  <strong>Ciudad:</strong>
                </span>
                <span className="text-white">{selectedUser.city}</span>
              </p>
            </div>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No hay usuarios que coincidan con tu búsqueda
            </p>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
            <h3 className="font-semibold text-blue-300 mb-2">Total de usuarios</h3>
            <p className="text-2xl font-bold text-white">{mockUsers.length}</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
            <h3 className="font-semibold text-cyan-300 mb-2">Resultados encontrados</h3>
            <p className="text-2xl font-bold text-white">{filteredUsers.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
