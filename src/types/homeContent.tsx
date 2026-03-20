export interface  HomeContentResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  hero: Hero
  benefits: Benefits
  informationSection: InformationSection
  contactSection: ContactSection
  footer: Footer
}

export interface Hero {
  sectionId: string
  backgroundImage: string
  overlay: Overlay
  badge: string
  title: string
  description: string
  actions: Action[]
}

export interface Overlay {
  startColor: string
  endColor: string
}

export interface Action {
  id: number
  label: string
  href: string
  variant: string
}

export interface Benefits {
  sectionId: string
  title: string
  description: string
  cards: Card[]
}

export interface Card {
  id: number
  slug: string
  tag: string
  title: string
  shortText: string
  image: string
  detail: Detail
}

export interface Detail {
  title: string
  description: string
  benefits: string[]
  buttonLabel: string
}

export interface InformationSection {
  sectionId: string
  image: string
  title: string
  paragraphs: string[]
  features: Feature[]
}

export interface Feature {
  id: number
  title: string
  description: string
}

export interface ContactSection {
  sectionId: string
  infoCard: InfoCard
  formCard: FormCard
}

export interface InfoCard {
  title: string
  description: string
  contactData: ContactDaum[]
  highlight: Highlight
}

export interface ContactDaum {
  label: string
  value: string
}

export interface Highlight {
  title: string
  text: string
}

export interface FormCard {
  title: string
  submitButton: SubmitButton
  successMessage: string
  fields: Field[]
}

export interface SubmitButton {
  label: string
}

export interface Field {
  id: string
  name: string
  label: string
  type: string
  placeholder: string
  required: boolean
  validation?: Validation
}

export interface Validation {
  message: string
}

export interface Footer {
  brand: Brand
  socialLinks: SocialLink[]
  contactInfo: ContactInfo
  quickLinks: QuickLinks
  partnerLogos: PartnerLogos
  copyright: string
}

export interface Brand {
  title: string
  description: string
}

export interface SocialLink {
  id: number
  name: string
  icon: string
  url: string
}

export interface ContactInfo {
  title: string
  items: string[]
}

export interface QuickLinks {
  title: string
  items: Item[]
}

export interface Item {
  label: string
  href: string
}

export interface PartnerLogos {
  title: string
  items: Item2[]
}

export interface Item2 {
  id: number
  label: string
  image: string
}
