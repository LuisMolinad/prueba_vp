export interface Root {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  brand: Brand
  navigation: Navigation[]
  actions: Action[]
}

export interface Brand {
  logoText: string
  name: string
  subtitle: string
  url: string
}

export interface Navigation {
  id: number
  label: string
  href: string
  visible: boolean
  order: number
}

export interface Action {
  id: number
  label: string
  type: string
  variant: string
  action: string
  visible: boolean
  order: number
}
