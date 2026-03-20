import type { InformationSection } from '../../types/homeContent'

interface ExperienceSectionProps {
  informationSection: InformationSection
}

export function ExperienceSection({ informationSection }: Readonly<ExperienceSectionProps>) {
  return (
    <section id={informationSection.sectionId || 'experiencias'} className="max-w-7xl mx-auto px-4 md:px-6 scroll-mt-28">
      <div className="grid lg:grid-cols-2 gap-7 items-stretch">
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
          <img
            src={informationSection.image}
            alt={informationSection.title}
            className="w-full h-full min-h-[280px] object-cover"
            loading="lazy"
          />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-lm-blue">{informationSection.title}</h2>
          {informationSection.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-slate-600">
              {paragraph}
            </p>
          ))}
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {informationSection.features.map((feature) => (
              <div key={feature.id} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                <p className="font-semibold text-av-red">{feature.title}</p>
                <p className="text-sm text-slate-600 mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
