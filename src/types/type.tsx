export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiError {
  status: number
  message: string
}

export interface ApiRequestConfig {
  endpoint: string
  method?: HttpMethod
  body?: unknown
  headers?: HeadersInit
}

export type EndpointPayload = Record<string, unknown> | unknown[] | null

export interface EndpointState {
  data: EndpointPayload
  isLoading: boolean
  error: string | null
}

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'number'
  | 'tel'
  | 'url'
  | 'date'

export type FormValues = Record<string, string | boolean>

export interface FieldValidations {
  minLength?: number
  maxLength?: number
  pattern?: string
  hasNumber?: boolean
  hasUppercase?: boolean
}

export interface FieldMessages {
  required?: string
  minLength?: string
  maxLength?: string
  pattern?: string
  hasNumber?: string
  hasUppercase?: string
  matchWith?: string
}

export interface FieldConfig {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  defaultValue?: string | boolean
  validations?: FieldValidations
  messages?: FieldMessages
  matchWith?: string
}

export type CustomValidator = (
  value: string | boolean,
  allValues: FormValues
) => string | null

export type CustomValidatorMap = Record<string, CustomValidator[]>
