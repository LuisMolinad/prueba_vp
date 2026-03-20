import { useEffect, useState } from 'react'
import { getHomeContentEndpointData } from '../services/api'
import type { Footer as FooterContent, HomeContentResponse } from '../types/homeContent'

const FALLBACK_FOOTER: FooterContent = {
  brand: {
    title: 'Club Website',
    description: 'Portal demo inspirado en LifeMiles y Avianca.',
  },
  socialLinks: [],
  contactInfo: {
    title: 'Contactanos',
    items: [],
  },
  quickLinks: {
    title: 'Enlaces',
    items: [],
  },
  partnerLogos: {
    title: 'Aliados / Logos',
    items: [],
  },
  copyright: '© 2026 Club Website.',
}

const normalizeHref = (href: string) => {
  if (href.startsWith('#')) return `/home${href}`
  return href
}

const getSocialLabel = (value: string) => {
  const normalized = value.toLowerCase()
  if (normalized === 'facebook') return 'f'
  if (normalized === 'instagram') return 'o'
  if (normalized === 'x') return 'x'
  if (normalized === 'linkedin') return 'in'
  return value.slice(0, 1).toLowerCase()
}

export function Footer() {
  const [footerData, setFooterData] = useState<FooterContent>(FALLBACK_FOOTER)

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await getHomeContentEndpointData<HomeContentResponse>()
        if (response?.data?.footer) {
          setFooterData(response.data.footer)
        }
      } catch {
        setFooterData(FALLBACK_FOOTER)
      }
    }

    fetchFooter().catch(() => {})
  }, [])

  return (
    <footer className="mt-12 bg-bgFooter text-white">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{footerData.brand.title}</h3>
            <p className="text-base leading-relaxed text-slate-200">{footerData.brand.description}</p>
            <div className="flex items-center gap-3 pt-1">
              {footerData.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-[#1A2F5D] hover:bg-[#284072] transition-colors text-sm font-semibold flex items-center justify-center"
                  aria-label={social.name}
                >
                  {getSocialLabel(social.name)}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">{footerData.contactInfo.title}</h3>
            {footerData.contactInfo.items.map((item) => (
              <p key={item} className="text-base text-slate-200">
                {item}
              </p>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">{footerData.quickLinks.title}</h3>
            {footerData.quickLinks.items.map((item) => (
              <a
                key={item.label}
                href={normalizeHref(item.href)}
                className="block text-base text-slate-200 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{footerData.partnerLogos.title}</h3>
            <div className="grid grid-cols-2 gap-3">
              {footerData.partnerLogos.items.map((partner) => (
                <div
                  key={partner.id}
                  className="min-h-12 rounded-2xl bg-[#1A2F5D] text-sm font-semibold flex items-center justify-center px-3 text-center"
                >
                  {partner.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-sm text-slate-300">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
