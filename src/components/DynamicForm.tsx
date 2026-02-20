import { useState, useMemo } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { z } from 'zod'
import { useFormConfig } from '../utils/useFormConfig'
import type { FormField } from '../types/type'

export const DynamicForm = () => {
  const { formConfig, isLoading, error } = useFormConfig(true)
  const [formValues, setFormValues] = useState<Record<string, string | boolean>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Crear esquema de Zod dinámicamente basado en la configuración
  const validationSchema = useMemo(() => {
    if (!formConfig) return null

    const schemaFields: Record<string, z.ZodTypeAny> = {}

    formConfig.fields.forEach((field) => {
      let fieldSchema: z.ZodTypeAny

      // Esquema según el tipo de campo
      if (field.type === 'checkbox') {
        fieldSchema = z.boolean({
          message: field.errorMessages.required || 'Este campo es obligatorio',
        })
        
        if (field.required) {
          fieldSchema = fieldSchema.refine((val) => val === true, {
            message: field.errorMessages.required || 'Este campo es obligatorio',
          })
        }
      } else if (field.type === 'email') {
        fieldSchema = z
          .string({
            message: field.errorMessages.required || 'Este campo es obligatorio',
          })
          .email({
            message: field.errorMessages.pattern || 'Formato de email inválido',
          })

        if (!field.required) {
          fieldSchema = fieldSchema.optional().or(z.literal(''))
        } else {
          fieldSchema = (fieldSchema as z.ZodString).min(1, {
            message: field.errorMessages.required || 'Este campo es obligatorio',
          })
        }
      } else {
        // Para text, password, number, tel, url, date
        fieldSchema = z.string({
          message: field.errorMessages.required || 'Este campo es obligatorio',
        })

        if (field.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(1, {
            message: field.errorMessages.required || 'Este campo es obligatorio',
          })
        } else {
          fieldSchema = fieldSchema.optional().or(z.literal(''))
        }

        // Aplicar validaciones adicionales solo si hay un valor
        if (field.validations && typeof fieldSchema !== 'undefined') {
          const { minLength, maxLength, pattern, hasNumber, hasUppercase } = field.validations

          if (minLength && field.required) {
            fieldSchema = (fieldSchema as z.ZodString).min(minLength, {
              message: field.errorMessages.minLength || `Debe tener al menos ${minLength} caracteres`,
            })
          }

          if (maxLength) {
            fieldSchema = (fieldSchema as z.ZodString).max(maxLength, {
              message: field.errorMessages.maxLength || `No puede exceder ${maxLength} caracteres`,
            })
          }

          if (pattern) {
            fieldSchema = (fieldSchema as z.ZodString).regex(new RegExp(pattern), {
              message: field.errorMessages.pattern || 'Formato inválido',
            })
          }

          if (hasNumber) {
            fieldSchema = (fieldSchema as z.ZodString).refine(
              (val) => !val || /\d/.test(val),
              {
                message: field.errorMessages.hasNumber || 'Debe contener al menos un número',
              }
            )
          }

          if (hasUppercase) {
            fieldSchema = (fieldSchema as z.ZodString).refine(
              (val) => !val || /[A-Z]/.test(val),
              {
                message: field.errorMessages.hasUppercase || 'Debe contener al menos una mayúscula',
              }
            )
          }
        }
      }

      schemaFields[field.name] = fieldSchema
    })

    // Crear el esquema base
    const schema = z.object(schemaFields)

    // Agregar validaciones de matchWith después de crear el esquema base
    return schema.superRefine((data, ctx) => {
      formConfig.fields.forEach((field) => {
        if (field.matchWith) {
          const fieldValue = data[field.name]
          const matchValue = data[field.matchWith]
          
          if (fieldValue !== matchValue) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [field.name],
              message: field.errorMessages.matchWith || 'Los valores no coinciden',
            })
          }
        }
      })
    })
  }, [formConfig])

  // Validar un campo específico usando Zod
  const validateField = (field: FormField, value: string | boolean): string | null => {
    if (!validationSchema) return null

    try {
      // Crear un objeto con todos los valores del formulario para validación completa
      const dataToValidate = {
        ...formValues,
        [field.name]: value,
      }

      // Validar todo el formulario
      validationSchema.parse(dataToValidate)
      
      return null
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Buscar el error específico de este campo
        const fieldError = error.issues.find((err) => err.path[0] === field.name)
        return fieldError?.message || null
      }
      return null
    }
  }

  // Manejar cambio de valor
  const handleChange = (field: FormField, e: ChangeEvent<HTMLInputElement>) => {
    const value = field.type === 'checkbox' ? e.target.checked : e.target.value
    
    setFormValues((prev) => ({
      ...prev,
      [field.name]: value,
    }))

    // Validar solo si el campo ya fue tocado
    if (touched[field.name]) {
      const error = validateField(field, value)
      setFormErrors((prev) => ({
        ...prev,
        [field.name]: error || '',
      }))
    }
  }

  // Manejar blur (cuando el usuario sale del campo)
  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({
      ...prev,
      [field.name]: true,
    }))

    const value = formValues[field.name] ?? (field.type === 'checkbox' ? false : '')
    const error = validateField(field, value)
    
    setFormErrors((prev) => ({
      ...prev,
      [field.name]: error || '',
    }))
  }

  // Manejar envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!formConfig || !validationSchema) return

    // Marcar todos los campos como tocados
    const allTouched: Record<string, boolean> = {}
    formConfig.fields.forEach((field) => {
      allTouched[field.name] = true
    })
    setTouched(allTouched)

    // Preparar los datos para validación
    const dataToValidate: Record<string, string | boolean> = {}
    formConfig.fields.forEach((field) => {
      dataToValidate[field.name] = formValues[field.name] ?? (field.type === 'checkbox' ? false : '')
    })

    // Validar con Zod
    try {
      validationSchema.parse(dataToValidate)
      
      // Si no hay errores, enviar el formulario
      console.log('Formulario válido:', dataToValidate)
      alert('Formulario enviado correctamente')
      setFormErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convertir los errores de Zod al formato que usamos
        const errors: Record<string, string> = {}
        error.issues.forEach((err) => {
          const fieldName = err.path[0] as string
          if (fieldName) {
            errors[fieldName] = err.message
          }
        })
        
        setFormErrors(errors)
        console.log('Formulario con errores:', errors)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-lg">Cargando formulario...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    )
  }

  if (!formConfig) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-600 dark:text-gray-400">
          No hay configuración de formulario disponible
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Información de la app */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{formConfig.app.name}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          v{formConfig.app.version} - {formConfig.app.environment}
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{formConfig.form.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {formConfig.form.description}
        </p>

        {/* Renderizar campos dinámicamente */}
        {formConfig.fields.map((field) => (
          <div key={field.name} className="mb-4">
            {field.type === 'checkbox' ? (
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id={field.name}
                  name={field.name}
                  checked={!!formValues[field.name]}
                  onChange={(e) => handleChange(field, e)}
                  onBlur={() => handleBlur(field)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                />
                <label htmlFor={field.name} className="ml-2 text-sm">
                  {field.label}
                  {field.required && formConfig.ui.showRequiredAsterisk && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
              </div>
            ) : (
              <>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium mb-2"
                >
                  {field.label}
                  {field.required && formConfig.ui.showRequiredAsterisk && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(formValues[field.name] as string) || ''}
                  onChange={(e) => handleChange(field, e)}
                  onBlur={() => handleBlur(field)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 ${
                    touched[field.name] && formErrors[field.name]
                      ? 'border-red-500 dark:border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              </>
            )}

            {/* Mostrar mensaje de error */}
            {touched[field.name] && formErrors[field.name] && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {formErrors[field.name]}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          {formConfig.form.submitText}
        </button>
      </form>
    </div>
  )
}
