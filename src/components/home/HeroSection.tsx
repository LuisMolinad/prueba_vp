import type { Hero } from '../../types/homeContent'

interface HeroSectionProps {
  hero: Hero
}

export function HeroSection({ hero }: Readonly<HeroSectionProps>) {
  const heroStyle = {
    backgroundImage: `linear-gradient(135deg, ${hero.overlay.startColor}, ${hero.overlay.endColor}), url(${hero.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <section
      id={hero.sectionId || 'inicio'}
      className="max-w-7xl mx-auto rounded-3xl overflow-hidden min-h-[420px] md:min-h-[520px] px-6 md:px-10 py-10 md:py-14 flex items-center scroll-mt-28"
      style={heroStyle}
    >
      <div className="max-w-3xl text-white space-y-5">
        <span className="inline-flex rounded-full bg-white/15 border border-white/30 px-4 py-2 text-sm md:text-base font-medium">
          {hero.badge}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{hero.title}</h1>
        <p className="text-base md:text-lg text-slate-100">{hero.description}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          {hero.actions.map((action) => (
            <a
              key={action.id}
              href={action.href}
              className={
                action.variant === 'light'
                  ? 'rounded-full bg-white text-slate-900 font-semibold px-5 py-2.5 hover:bg-slate-200 transition-colors'
                  : 'rounded-full bg-red-600 text-white font-semibold px-5 py-2.5 hover:bg-red-700 transition-colors'
              }
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
