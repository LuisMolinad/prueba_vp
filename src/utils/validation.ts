import { z } from 'zod'
import type { CustomValidatorMap, FieldConfig, FormValues } from '../types/type'

export const getDefaultValues = (fields: FieldConfig[]): FormValues => {
  return fields.reduce<FormValues>((acc, field) => {
    if (typeof field.defaultValue !== 'undefined') {
      acc[field.name] = field.defaultValue
      return acc
    }

    acc[field.name] = field.type === 'checkbox' ? false : ''
    return acc
  }, {})
}

const buildSingleFieldSchema = (field: FieldConfig) => {
  const messages = field.messages ?? {}
  const validations = field.validations ?? {}

  if (field.type === 'checkbox') {
    let checkboxSchema = z.boolean()

    if (field.required) {
      checkboxSchema = checkboxSchema.refine((value) => value === true, {
        message: messages.required ?? 'Debes aceptar este campo',
      })
    }

    return checkboxSchema
  }

  let schema = z.string({
    message: messages.required ?? 'Este campo es obligatorio',
  })

  if (field.required) {
    schema = schema.min(1, {
      message: messages.required ?? 'Este campo es obligatorio',
    })
  } else {
    schema = schema.optional().or(z.literal('')) as unknown as z.ZodString
  }

  if (field.type === 'email') {
    schema = schema.email({
      message: messages.pattern ?? 'Formato de correo invalido',
    })
  }

  if (validations.minLength) {
    schema = schema.min(validations.minLength, {
      message:
        messages.minLength ??
        `Debe tener al menos ${validations.minLength} caracteres`,
    })
  }

  if (validations.maxLength) {
    schema = schema.max(validations.maxLength, {
      message:
        messages.maxLength ??
        `No puede exceder ${validations.maxLength} caracteres`,
    })
  }

  if (validations.pattern) {
    schema = schema.regex(new RegExp(validations.pattern), {
      message: messages.pattern ?? 'Formato invalido',
    })
  }

  if (validations.hasNumber) {
    schema = schema.refine((value) => /\d/.test(value), {
      message: messages.hasNumber ?? 'Debe incluir al menos un numero',
    })
  }

  if (validations.hasUppercase) {
    schema = schema.refine((value) => /[A-Z]/.test(value), {
      message: messages.hasUppercase ?? 'Debe incluir una mayuscula',
    })
  }

  return schema
}

export const buildFormSchema = (
  fields: FieldConfig[],
  customValidators: CustomValidatorMap = {}
) => {
  const shape = fields.reduce<Record<string, z.ZodTypeAny>>((acc, field) => {
    acc[field.name] = buildSingleFieldSchema(field)
    return acc
  }, {})

  return z.object(shape).superRefine((data, ctx) => {
    const values = data as FormValues

    fields.forEach((field) => {
      const fieldValue = values[field.name]
      const customChecks = customValidators[field.name] ?? []

      if (field.matchWith && values[field.matchWith] !== fieldValue) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field.name],
          message: field.messages?.matchWith ?? 'Los valores no coinciden',
        })
      }

      customChecks.forEach((validator) => {
        const errorMessage = validator(fieldValue, values)

        if (errorMessage) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field.name],
            message: errorMessage,
          })
        }
      })
    })
  })
}
