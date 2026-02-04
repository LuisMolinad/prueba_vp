import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. ESQUEMA DE VALIDACIÓN CON ZOD
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Debe ser un email válido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(50, 'La contraseña no puede exceder 50 caracteres'),
});

// 2. TIPO INFERIDO DEL ESQUEMA
type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // 3. CONFIGURAR REACT HOOK FORM CON ZOD
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', // Valida en tiempo real
  });

  // 4. FUNCIÓN DE LOGIN (DEMO)
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      // Simulación de llamada API con delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Credenciales demo
      if (data.email === 'demo@demo.com' && data.password === 'demo123') {
        // Guardar token demo en localStorage
        localStorage.setItem('authToken', 'demo-token-12345');
        localStorage.setItem('user', JSON.stringify({ email: data.email, name: 'Usuario Demo' }));
        
        // Redirigir al dashboard
        navigate('/dashboard');
      } else {
        setLoginError('Credenciales incorrectas. Usa: demo@demo.com / demo123');
      }
    } catch (error) {
      setLoginError('Error al intentar iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                {...register('email')}
                id="email"
                type="text"
                autoComplete="email"
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contraseña
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                autoComplete="current-password"
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Error de Login */}
          {loginError && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <p className="text-sm text-red-800 dark:text-red-400">
                {loginError}
              </p>
            </div>
          )}

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              !isValid || isLoading
                ? 'bg-blue-400 cursor-not-allowed opacity-60'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}