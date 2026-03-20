import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { ContactSection as ContactSectionType } from '../../types/homeContent'

interface ContactSectionProps {
  contactSection: ContactSectionType
}

export function ContactSection({ contactSection }: Readonly<ContactSectionProps>) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const normalizeSpaces = (value: string) => value.trim().replaceAll(/\s+/g, ' ')

  const validateName = (value: string) => {
    const normalized = normalizeSpaces(value)

    if (normalized.length > 25) return false
    if (normalized && !/^[\p{L} ]+$/u.test(normalized)) return false
    return true
  }

  const fieldValidators: Record<string, (value: string) => boolean> = {
    firstName: validateName,
    lastName: validateName,
    phone: (value) => {
      const normalized = normalizeSpaces(value)

      // Allow optional formatting symbols but validate only the amount of digits.
      if (normalized && !/^[+\d\s-]+$/.test(normalized)) return false

      const digitsOnly = normalized.replaceAll(/\D/g, '')
      if (!digitsOnly) return true

      return digitsOnly.length >= 8 && digitsOnly.length <= 15
    },
    country: (value) => {
      const normalized = normalizeSpaces(value)

      if (normalized.length > 20) return false
      if (normalized && !/^[\p{L} ]+$/u.test(normalized)) return false
      return true
    },
    address: (value) => {
      if (value.length < 8) return false
      if (value.length > 100) return false
      if (value && !/^[A-Za-z0-9\s\-#]+$/.test(value)) return false
      return true
    },
    message: () => true,
  }

  const validateField = (fieldName: string, value: string) => {
    const validator = fieldValidators[fieldName]
    if (!validator) return true
    return validator(value)
  }

  const fieldErrors: Record<string, string> = {}
  const invalidFields = new Set<string>()

  contactSection.formCard.fields.forEach((field) => {
    const rawValue = values[field.name] || ''
    const value = normalizeSpaces(rawValue)

    if (field.required && !value) {
      invalidFields.add(field.name)
      fieldErrors[field.name] = field.validation?.message || 'Campo invalido.'
      return
    }

    const isValid = validateField(field.name, value)
    if (!isValid) {
      invalidFields.add(field.name)
      fieldErrors[field.name] = field.validation?.message || 'Campo invalido.'
    }
  })

  const requiredFields = contactSection.formCard.fields.filter((field) => field.required)
  const allRequiredHaveValue = requiredFields.every((field) => (values[field.name] || '').trim().length > 0)
  const isFormValid = requiredFields.length === 0 || (allRequiredHaveValue && invalidFields.size === 0)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
    const nextValue = event.target.value
    setValues((prev) => ({ ...prev, [fieldName]: nextValue }))
    setSuccessMessage('')
  }

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    if (!isFormValid) return

    setSuccessMessage(contactSection.formCard.successMessage)
  }

  const shouldShowError = (fieldName: string) => {
    return Boolean((submitted || touched[fieldName]) && invalidFields.has(fieldName))
  }

  const getFieldLayoutClass = (fieldName: string, fieldType: string) => {
    if (fieldType === 'textarea') return 'md:col-span-2'
    if (fieldName === 'address' || fieldName === 'message') return 'md:col-span-2'
    return 'md:col-span-1'
  }

  return (
    <section id={contactSection.sectionId || 'contacto'} className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-4 scroll-mt-28">
      <div className="grid lg:grid-cols-2 gap-7">
        <article className="rounded-2xl border border-slate-200 bg-white p-7 md:p-8 space-y-5 shadow-sm">
          <h2 className="text-2xl font-bold text-lm-blue">{contactSection.infoCard.title}</h2>
          <p className="text-base leading-relaxed text-slate-600">{contactSection.infoCard.description}</p>
          <div className="space-y-3">
            {contactSection.infoCard.contactData.map((item) => (
              <p key={item.label} className="text-base text-slate-600">
                <span className="font-semibold text-slate-700">{item.label}: </span>
                {item.value}
              </p>
            ))}
          </div>
          <div className="rounded-xl bg-red-50/70 border border-red-100 border-l-4 border-l-red-600 p-4 md:p-5">
            <p className="text-lg font-semibold text-slate-800">{contactSection.infoCard.highlight.title}:</p>
            <p className="text-lg text-slate-700 mt-1">{contactSection.infoCard.highlight.text}</p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-7 md:p-8 space-y-5 shadow-sm">
          <h3 className="text-2xl font-bold text-lm-blue">{contactSection.formCard.title}</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit} noValidate>
            {contactSection.formCard.fields.map((field) => {
              const showError = shouldShowError(field.name)
              const errorMessage = fieldErrors[field.name]
              const isTextarea = field.type === 'textarea'
              const inputClass = showError
                ? 'w-full h-12 rounded-xl border px-4 text-base outline-none border-red-500 ring-1 ring-red-500'
                : 'w-full h-12 rounded-xl border px-4 text-base outline-none border-slate-300'
              const textareaClass = showError
                ? 'w-full rounded-xl border px-4 py-3 min-h-40 outline-none border-red-500 ring-1 ring-red-500 resize-y'
                : 'w-full rounded-xl border px-4 py-3 min-h-40 outline-none border-slate-300 resize-y'

              return (
                <div key={field.id} className={`space-y-2 ${getFieldLayoutClass(field.name, field.type)}`}>
                  <label htmlFor={field.id} className="text-base font-semibold text-slate-800">
                    {field.label}
                    {field.required && <span className="text-red-600"> *</span>}
                  </label>
                  {isTextarea && (
                    <textarea
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={values[field.name] || ''}
                      onChange={(event) => handleChange(event, field.name)}
                      onBlur={() => handleBlur(field.name)}
                      className={textareaClass}
                      required={field.required}
                    />
                  )}
                  {!isTextarea && (
                    <input
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={values[field.name] || ''}
                      onChange={(event) => handleChange(event, field.name)}
                      onBlur={() => handleBlur(field.name)}
                      className={inputClass}
                      required={field.required}
                    />
                  )}

                  {showError && errorMessage && (
                    <p className="text-xs text-red-600">{errorMessage}</p>
                  )}
                </div>
              )
            })}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`h-12 rounded-full font-semibold px-6 transition-colors ${isFormValid ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-300 text-slate-600 cursor-not-allowed'}`}
              >
                {contactSection.formCard.submitButton.label}
              </button>
            </div>

            {successMessage && (
              <div className="md:col-span-2">
              <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            )}
          </form>
        </article>
      </div>
    </section>
  )
}
