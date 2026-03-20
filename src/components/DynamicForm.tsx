import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'
import type { CustomValidatorMap, FieldConfig, FormValues } from '../types/type'
import { useApiContentStore } from '../store/store'
import { buildFormSchema, getDefaultValues } from '../utils/validation'

type UnknownRecord = Record<string, unknown>

interface FormContentConfig {
  title?: string
  description?: string
  submitText?: string
  fields?: Record<string, { label?: string; placeholder?: string }>
}

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const getNestedValue = (source: unknown, path: string[]): unknown => {
  let current: unknown = source

  for (const key of path) {
    if (!isRecord(current) || !(key in current)) {
      return undefined
    }

    current = current[key]
  }

  return current
}

const firstString = (source: unknown, paths: string[][]): string | undefined => {
  for (const path of paths) {
    const value = getNestedValue(source, path)
    if (typeof value === 'string' && value.trim()) {
      return value
    }
  }

  return undefined
}

const extractFormContentConfig = (source: unknown): FormContentConfig => {
  const containerCandidates = [
    source,
    getNestedValue(source, ['form']),
    getNestedValue(source, ['formulario']),
    getNestedValue(source, ['content']),
    getNestedValue(source, ['landing']),
    getNestedValue(source, ['texts']),
  ]

  const container = containerCandidates.find((item) => isRecord(item))
  if (!container || !isRecord(container)) {
    return {}
  }

  const fieldsRaw =
    getNestedValue(container, ['fields']) ??
    getNestedValue(container, ['campos']) ??
    getNestedValue(container, ['formFields'])

  let fields: FormContentConfig['fields']
  if (isRecord(fieldsRaw)) {
    fields = {}

    for (const [fieldName, value] of Object.entries(fieldsRaw)) {
      if (!isRecord(value)) continue

      fields[fieldName] = {
        label: firstString(value, [['label'], ['titulo'], ['title']]),
        placeholder: firstString(value, [['placeholder'], ['hint'], ['ayuda']]),
      }
    }
  }

  return {
    title: firstString(container, [['title'], ['titulo'], ['heading']]),
    description: firstString(container, [['description'], ['descripcion'], ['subtitle']]),
    submitText: firstString(container, [['submitText'], ['submit'], ['buttonText'], ['cta']]),
    fields,
  }
}

const formFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Nombre completo',
    type: 'text',
    placeholder: 'Escribe tu nombre',
    required: true,
    validations: {
      minLength: 3,
    },
  },
  {
    name: 'email',
    label: 'Correo',
    type: 'email',
    placeholder: 'correo@dominio.com',
    required: true,
  },
  {
    name: 'password',
    label: 'Contrasena',
    type: 'password',
    placeholder: 'Crea una contrasena',
    required: true,
    validations: {
      minLength: 8,
      hasNumber: true,
      hasUppercase: true,
    },
  },
  {
    name: 'confirmPassword',
    label: 'Confirmar contrasena',
    type: 'password',
    placeholder: 'Repite tu contrasena',
    required: true,
    matchWith: 'password',
  },
  {
    name: 'terms',
    label: 'Acepto terminos y condiciones',
    type: 'checkbox',
    required: true,
  },
]

const customValidators: CustomValidatorMap = {
  name: [
    (value) => {
      if (typeof value !== 'string') return 'Valor invalido'
      return value.trim().split(' ').length < 2
        ? 'Ingresa al menos nombre y apellido'
        : null
    },
  ],
}

export const DynamicForm = () => {
  const apiData = useApiContentStore((state) => state.data)
  const fetchContent = useApiContentStore((state) => state.fetchContent)

  useEffect(() => {
    if (apiData !== null) return

    fetchContent().catch(() => {
      // Si falla, el formulario mantiene sus textos por defecto.
    })
  }, [apiData, fetchContent])

  const contentConfig = useMemo(() => extractFormContentConfig(apiData), [apiData])
  const fieldsToRender = useMemo(
    () =>
      formFields.map((field) => ({
        ...field,
        label: contentConfig.fields?.[field.name]?.label ?? field.label,
        placeholder:
          contentConfig.fields?.[field.name]?.placeholder ?? field.placeholder,
      })),
    [contentConfig.fields]
  )

  const validationSchema = useMemo(
    () => buildFormSchema(formFields, customValidators),
    []
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema) as Resolver<FormValues>,
    defaultValues: getDefaultValues(formFields),
    mode: 'onBlur',
  })

  const onSubmit = async (data: FormValues) => {
    console.log('Formulario valido:', data)
    alert('Formulario valido. Reemplaza este bloque con tu submit real al endpoint.')
    reset(getDefaultValues(formFields))
  }

  return (
    <div className="max-w-2xl mx-auto px-3 md:px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
          {contentConfig.title ?? 'Base de Validaciones'}
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2">
          {contentConfig.description ?? 'Las reglas viven en frontend y no dependen de la respuesta del endpoint.'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 md:p-6"
      >
        {fieldsToRender.map((field) => {
          const fieldError = errors[field.name]?.message

          if (field.type === 'checkbox') {
            return (
              <div key={field.name} className="mb-5">
                <label className="inline-flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 dark:border-slate-600"
                    {...register(field.name)}
                  />
                  <span>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </span>
                </label>
                {fieldError && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{String(fieldError)}</p>
                )}
              </div>
            )
          }

          return (
            <div key={field.name} className="mb-5">
              <label htmlFor={field.name} className="block text-sm md:text-base font-medium mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className={`w-full px-3 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-slate-700 dark:text-slate-100 ${
                  fieldError
                    ? 'border-red-500 dark:border-red-500'
                    : 'border-slate-300 dark:border-slate-600'
                }`}
                {...register(field.name)}
              />
              {fieldError && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{String(fieldError)}</p>
              )}
            </div>
          )
        })}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
        >
          {isSubmitting ? 'Enviando...' : contentConfig.submitText ?? 'Validar y enviar'}
        </button>
      </form>
    </div>
  )
}
