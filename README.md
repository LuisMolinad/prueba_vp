# React Base Template (API + Validaciones)

Base reutilizable con:

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Zustand (tema dark/light persistente)
- React Hook Form + Zod (validaciones en frontend)

Esta plantilla esta pensada para proyectos donde:

- Vas a consumir un endpoint cuyo JSON puede cambiar o aun no conoces.
- Las validaciones NO necesariamente vendran desde el endpoint.
- Quieres mantener UI responsive y cambio de tema listo desde el inicio.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Configuracion del endpoint

La configuración vive en **`env-config.ts`** (raíz del proyecto) y se versionea en el repositorio:

```ts
// env-config.ts
const config = {
  apiUrl: 'https://api.tu-dominio.com',
}
export default config
```

### Sobrescribir en local (opcional)

Para cambiar el endpoint solo en tu máquina sin afectar el repositorio, crea `.env.local`:

```bash
VITE_API_URL=https://api-local.test.com
```

El archivo **respeta la jerarquía**: `.env.local` > `env-config.ts`

### Consumo desde servicios

La capa API en [src/services/api.ts](src/services/api.ts) expone:

- `requestJson` — petición genérica tipada
- `getEndpointData` — GET a cualquier endpoint
- `postEndpointData` — POST a cualquier endpoint

Soporta URL relativa (`/users`) o absoluta (`https://otra-api.com/users`).

## Donde definir validaciones

El formulario base esta en `src/components/DynamicForm.tsx`.

1. Define campos en `formFields`.
2. Agrega validaciones base (`minLength`, `pattern`, `hasNumber`, etc.).
3. Agrega reglas custom en `customValidators` (ejemplo: nombre y apellido, reglas cross-field).

Las utilidades para construir el esquema Zod viven en `src/utils/validation.ts`.

## Flujo sugerido para nuevos proyectos

1. Ajusta rutas y layout en `src/App.tsx`.
2. Define tu estrategia de consumo en `src/services/api.ts`.
3. Crea formularios con reglas locales usando `src/components/DynamicForm.tsx` como referencia.
4. Si luego el backend entrega reglas, mapealas a `FieldConfig` sin acoplar el UI al JSON original.

## Estructura relevante

- `src/pages/Home.tsx`: prueba de endpoint y preview de respuesta
- `src/components/DynamicForm.tsx`: ejemplo de formulario con validacion desacoplada
- `src/utils/useFormConfig.ts`: hook para consumo genérico de endpoint
- `src/store/store.tsx`: store del tema

## Nota

Los archivos vacios `src/pages/Login.tsx` y `src/pages/Dashboard.tsx` se mantienen para que agregues pantallas futuras si las necesitas.
