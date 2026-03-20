export interface LooginDataResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  background: Background
  brand: Brand
  content: Content
  form: Form
}

export interface Background {
  image: string
  overlay: Overlay
}

export interface Overlay {
  startColor: string
  endColor: string
}

export interface Brand {
  logoText: string
  title: string
  subtitle: string
}

export interface Content {
  title: string
  description: string
}

export interface Form {
  fields: Field[]
  submitButton: SubmitButton
  helperText: string
}

export interface Field {
  id: string
  name: string
  label: string
  type: string
  placeholder: string
  required: boolean
}

export interface SubmitButton {
  label: string
  action: string
}
