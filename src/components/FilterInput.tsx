import { useState, useCallback, useMemo } from 'react'

interface FilterInputProps<T> {
  data: T[]
  placeholder?: string
  onFilterChange?: (filtered: T[]) => void
  filterFields: (keyof T)[]
  renderItem?: (item: T, index: number) => React.ReactNode
  onSelect?: (item: T) => void
}

export function FilterInput<T extends { id?: string | number }>({
  data,
  placeholder = 'Buscar...',
  onFilterChange,
  filterFields,
  renderItem,
  onSelect,
}: FilterInputProps<T>) {
  const [searchValue, setSearchValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredData = useMemo(() => {
    if (!searchValue.trim()) return data

    return data.filter((item) => {
      return filterFields.some((field) => {
        const value = String(item[field] || '').toLowerCase()
        return value.includes(searchValue.toLowerCase())
      })
    })
  }, [searchValue, data, filterFields])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
      setIsOpen(true)
      onFilterChange?.(filteredData)
    },
    [filteredData, onFilterChange]
  )

  const handleSelect = useCallback(
    (item: T) => {
      onSelect?.(item)
      setSearchValue('')
      setIsOpen(false)
    },
    [onSelect]
  )

  const handleInputFocus = () => setIsOpen(true)
  const handleInputBlur = () => setTimeout(() => setIsOpen(false), 200)

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border-2 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300"
      />

      {isOpen && filteredData.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-gray-600 border-t-0 rounded-b list-none m-0 p-0 max-h-72 overflow-y-auto z-10 shadow-md">
          {filteredData.map((item, index) => (
            <li
              key={item.id || index}
              onClick={() => handleSelect(item)}
              className="px-3 py-2 cursor-pointer transition-colors duration-200 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-blue-100 dark:active:bg-blue-900 text-slate-900 dark:text-white"
            >
              {renderItem ? renderItem(item, index) : String(item)}
            </li>
          ))}
        </ul>
      )}

      {isOpen && searchValue && filteredData.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-gray-600 border-t-0 rounded-b px-3 py-2 text-center text-gray-600 dark:text-gray-400 z-10">
          No hay resultados
        </div>
      )}
    </div>
  )
}
