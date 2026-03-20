import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLoginEndpointData } from '../services/api'
import type { Field, LooginDataResponse } from '../types/login'

export function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [fields, setFields] = useState<Field[]>([])
  const [title, setTitle] = useState('Iniciar sesion')
  const [description, setDescription] = useState(
    'Ingresa para visualizar un portal demo inspirado en beneficios, aliados y experiencias.'
  )
  const [helperText, setHelperText] = useState('')
  const [brandTitle, setBrandTitle] = useState('Club Website')
  const [brandSubtitle, setBrandSubtitle] = useState('Demo portal LifeMiles & Avianca')
  const [brandLogoText, setBrandLogoText] = useState('CW')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [overlayStart, setOverlayStart] = useState('rgba(0, 48, 135, 0.88)')
  const [overlayEnd, setOverlayEnd] = useState('rgba(215, 25, 32, 0.78)')
  const [values, setValues] = useState<Record<string, string>>({
    email: '',
    password: '',
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({
    email: false,
    password: false,
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fetchLoginContent = async () => {
      try {
        const response = await getLoginEndpointData<LooginDataResponse>()
        setFields(response?.data?.form?.fields || [])
        setTitle(response?.data?.content?.title || 'Iniciar sesion')
        setDescription(response?.data?.content?.description || '')
        setHelperText(response?.data?.form?.helperText || '')
        setBrandTitle(response?.data?.brand?.title || 'Club Website')
        setBrandSubtitle(response?.data?.brand?.subtitle || '')
        setBrandLogoText(response?.data?.brand?.logoText || 'CW')
        setBackgroundImage(response?.data?.background?.image || '')
        setOverlayStart(response?.data?.background?.overlay?.startColor || 'rgba(0, 48, 135, 0.88)')
        setOverlayEnd(response?.data?.background?.overlay?.endColor || 'rgba(215, 25, 32, 0.78)')
      } catch {
        setFields([
          {
            id: 'loginEmail',
            name: 'email',
            label: 'Correo electronico',
            type: 'email',
            placeholder: 'ejemplo@correo.com',
            required: true,
          },
          {
            id: 'loginPassword',
            name: 'password',
            label: 'Contrasena',
            type: 'password',
            placeholder: '********',
            required: true,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchLoginContent().catch(() => {})
  }, [])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email.trim()) return 'El correo es obligatorio.'
    if (!emailRegex.test(email)) return 'Debe tener formato de correo valido. Ej: lifemiles@avianca.com'

    return ''
  }

  const validatePassword = (password: string) => {
    if (!password.trim()) return 'La contrasena es obligatoria.'
    if (password.length < 8) return 'Debe tener minimo 8 caracteres.'
    if (!/[A-Z]/.test(password)) return 'Debe incluir al menos una mayuscula.'
    if (!/\d/.test(password)) return 'Debe incluir al menos un numero.'
    if (/[^A-Za-z\d*%\-#$]/.test(password)) {
      return 'Solo se permiten letras, numeros y los caracteres especiales * % - $ #.'
    }

    return ''
  }

  const emailError = validateEmail(values.email)
  const passwordError = validatePassword(values.password)

  const isFormValid = useMemo(
    () => emailError === '' && passwordError === '',
    [emailError, passwordError]
  )

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const getErrorByField = (fieldName: string) => {
    if (fieldName === 'email') return emailError
    if (fieldName === 'password') return passwordError

    return ''
  }

  const showError = (fieldName: string) => {
    return Boolean((touched[fieldName] || submitted) && getErrorByField(fieldName))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    if (!isFormValid) return

    navigate('/home')
  }

  const backgroundStyle = {
    backgroundImage: `linear-gradient(135deg, ${overlayStart}, ${overlayEnd}), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10" style={backgroundStyle}>
      <section className="w-full max-w-md rounded-2xl border border-slate-200/70 bg-white/95 shadow-xl p-6 md:p-8 space-y-5 backdrop-blur-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-red-600 flex items-center justify-center text-white font-bold text-sm select-none shadow-md">
          {/*   <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold"> */}
              {brandLogoText}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{brandTitle}</p>
              <p className="text-xs text-slate-600">{brandSubtitle}</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-600">{description}</p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          {fields.map((field) => {
            const invalid = showError(field.name)
            const errorMessage = getErrorByField(field.name)

            return (
              <div key={field.id} className="space-y-1">
                <label className="text-sm font-medium text-slate-700" htmlFor={field.id}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  value={values[field.name] || ''}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  placeholder={field.placeholder}
                  className={`w-full text-gray-800 rounded-lg border px-3 py-2 outline-none transition-colors ${invalid ? ' bg-red-100 border-red-500 ring-1 ring-red-500' : 'border-slate-300 focus:border-blue-500'}`}
                  required={field.required}
                />
                {invalid && (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                )}
              </div>
            )
          })}

          {helperText && <p className="text-xs text-slate-500">{helperText}</p>}

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
             className="mt-6 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm rounded-full px-7 py-3 transition-all duration-150 shadow-md"
          >
            Entrar
          </button>
        </form>
      </section>
    </main>
  )
}
