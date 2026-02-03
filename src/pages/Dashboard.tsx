import { useState } from 'react'
import { useThemeStore } from '../store/store'
import { FilterInput } from '../components/FilterInput'

interface Product {
  id: number
  name: string
  category: string
  price: number
}

const mockProducts: Product[] = [
  { id: 1, name: 'Laptop Dell XPS', category: 'Electrónica', price: 1200 },
  { id: 2, name: 'Mouse Logitech', category: 'Accesorios', price: 45 },
  { id: 3, name: 'Teclado Mecánico', category: 'Accesorios', price: 150 },
  { id: 4, name: 'Monitor LG 4K', category: 'Electrónica', price: 500 },
  { id: 5, name: 'Webcam HD', category: 'Accesorios', price: 80 },
]

export function Dashboard() {
  const { theme } = useThemeStore()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-[calc(100vh-180px)] bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 text-slate-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Dashboard de Productos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Filtra productos por nombre o categoría</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filtro */}
            <div className="lg:col-span-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 h-fit">
              <h2 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-300">Buscar Producto</h2>
              <FilterInput<Product>
                data={mockProducts}
                placeholder="Buscar producto..."
                filterFields={['name', 'category']}
                onSelect={setSelectedProduct}
                onFilterChange={setFilteredProducts}
                renderItem={(product) => (
                  <div className="py-1">
                    <strong className="text-slate-900 dark:text-white">{product.name}</strong>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{product.category} - ${product.price}</div>
                  </div>
                )}
              />
            </div>

            {/* Contenido principal */}
            <div className="lg:col-span-2">
              {selectedProduct ? (
                <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-slate-800 border border-green-300 dark:border-green-500 rounded-lg p-8 shadow-xl">
                  <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-300">{selectedProduct.name}</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-green-300 dark:border-green-700">
                      <span className="text-gray-700 dark:text-gray-300">Categoría:</span>
                      <span className="bg-green-100 dark:bg-green-700 px-3 py-1 rounded text-green-700 dark:text-green-200">{selectedProduct.category}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-green-300 dark:border-green-700">
                      <span className="text-gray-700 dark:text-gray-300">Precio:</span>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-300">${selectedProduct.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">ID:</span>
                      <span className="text-gray-600 dark:text-gray-400">#{selectedProduct.id}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-12 border border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">Selecciona un producto para ver detalles</p>
                </div>
              )}

              {/* Lista de productos */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-300">Productos ({filteredProducts.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedProduct?.id === product.id
                          ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-500 shadow-lg dark:shadow-blue-500/50'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-400'
                      }`}
                    >
                      <div className="font-semibold text-slate-900 dark:text-white">{product.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{product.category}</div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">${product.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
