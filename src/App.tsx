import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  //comentario de prueba
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://vitejs.dev/logo.svg" 
            className="h-24 w-24 hover:drop-shadow-[0_0_2em_#646cffaa] transition-all duration-300" 
            alt="Vite logo" 
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" 
            className="h-24 w-24 hover:drop-shadow-[0_0_2em_#61dafbaa] transition-all duration-300 animate-[spin_20s_linear_infinite]" 
            alt="React logo" 
          />
        </a>
      </div>
      
      <h1 className="text-5xl font-bold mb-12">Vite + React</h1>
      
      <div className="bg-gray-800 rounded-lg p-8 mb-8">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded border border-transparent hover:border-blue-500 transition-colors duration-200 mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-300">
          Edit <code className="bg-gray-700 px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="text-gray-400 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App