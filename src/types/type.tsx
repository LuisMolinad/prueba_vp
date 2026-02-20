// Información de la aplicación
export interface AppInfo {
  name: string
  version: string
  environment: string
}

// Configuración del formulario
export interface FormConfig {
  id: string
  title: string
  description: string
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
  submitUrl: string
  submitText: string
}

// Validaciones de campos
export interface FieldValidations {
  minLength?: number
  maxLength?: number
  pattern?: string
  hasNumber?: boolean
  hasUppercase?: boolean
}

// Mensajes de error
export interface ErrorMessages {
  required?: string
  minLength?: string
  maxLength?: string
  pattern?: string
  hasNumber?: string
  hasUppercase?: string
  matchWith?: string
}

// Campo del formulario
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'checkbox' | 'number' | 'tel' | 'url' | 'date'
  placeholder?: string
  required: boolean
  defaultValue?: string | boolean | number
  validations?: FieldValidations
  errorMessages: ErrorMessages
  matchWith?: string
}

// Configuración de UI
export interface UIConfig {
  layout: 'vertical' | 'horizontal'
  theme: 'light' | 'dark'
  showRequiredAsterisk: boolean
}

// Respuestas del servidor
export interface SuccessResponse {
  status: number
  message: string
}

export interface ErrorResponse {
  status: number
  message: string
  errors?: Record<string, string[]>
}

export interface ResponseConfig {
  success: SuccessResponse
  error: ErrorResponse
}

// Interfaz principal que recibe la API
export interface FormAPIResponse {
  app: AppInfo
  form: FormConfig
  fields: FormField[]
  ui: UIConfig
  responses: ResponseConfig
}
