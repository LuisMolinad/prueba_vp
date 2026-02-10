# React Base - SPA Template

Plantilla base limpia para crear Single Page Applications con React, TypeScript, React Router y Tailwind CSS.

## 🚀 Stack Tecnológico

- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultrarrápido
- **React Router** - Enrutamiento
- **Tailwind CSS** - Estilos utility-first
- **Zustand** - Estado global (tema claro/oscuro)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Crear archivo .env (copia de .env.example)
cp .env.example .env
```

## 🛠️ Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
│   ├── Button.tsx
│   └── ThemeToggle.tsx
├── layouts/        # Layouts (Navbar, Footer)
├── pages/          # Páginas/Rutas
├── services/       # Servicios API
│   └── api.ts     # Configuración base de API
├── store/          # Estado global (Zustand)
├── types/          # Tipos TypeScript
└── utils/          # Utilidades
```

## 🔌 Configuración de API

1. Copia `.env.example` a `.env`
2. Configura `VITE_API_URL` con tu endpoint
3. Usa las funciones en `src/services/api.ts`

## 🎨 Tema Claro/Oscuro

El proyecto incluye soporte para tema claro/oscuro usando Zustand y Tailwind CSS. El tema se persiste en localStorage.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
