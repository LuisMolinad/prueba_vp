import { useEffect, useState } from 'react'
import { getHomeContentEndpointData } from '../services/api'
import type { HomeContentResponse } from '../types/homeContent'
import { HeroSection } from '../components/home/HeroSection'
import { BenefitsSection } from '../components/home/BenefitsSection'
import { ExperienceSection } from '../components/home/ExperienceSection'
import { ContactSection } from '../components/home/ContactSection'

export function Home() {
  const [data, setData] = useState<HomeContentResponse['data'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await getHomeContentEndpointData<HomeContentResponse>()
        setData(response.data)
      } catch (err) {
        const message =
          typeof err === 'object' && err !== null && 'message' in err
            ? String(err.message)
            : 'No fue posible obtener el contenido de home.'

        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent().catch(() => {})
  }, [])

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-slate-600">Cargando contenido de Home...</p>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-red-600">Error: {error || 'No hay contenido disponible.'}</p>
      </section>
    )
  }

  return (
    <div className="space-y-10 md:space-y-14 pb-10">
      <HeroSection hero={data.hero} />
      <BenefitsSection benefits={data.benefits} />
      <ExperienceSection informationSection={data.informationSection} />
      <ContactSection contactSection={data.contactSection} />
    </div>
  )
}
