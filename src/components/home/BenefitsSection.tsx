import { useEffect, useMemo, useState } from "react";
import type { Benefits } from "../../types/homeContent";

interface BenefitsSectionProps {
  benefits: Benefits;
}

export function BenefitsSection({ benefits }: Readonly<BenefitsSectionProps>) {
  const getPerView = () => {
    if (globalThis.window === undefined) return 3;
    if (globalThis.window.innerWidth < 768) return 1;
    if (globalThis.window.innerWidth < 1024) return 2;
    return 3;
  };

  const [perView, setPerView] = useState(getPerView);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setPerView(getPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(benefits.cards.length - perView, 0),
    [benefits.cards.length, perView],
  );

  const safeIndex = Math.min(currentIndex, maxIndex);

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const canSlide = benefits.cards.length > perView;
  const selectedCard =
    benefits.cards.find((card) => card.id === selectedCardId) || null;

  useEffect(() => {
    if (!selectedCard) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCardId(null);
      }
    };

    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [selectedCard]);

  return (
    <section
      id={benefits.sectionId || "beneficios"}
      className="max-w-7xl mx-auto px-4 md:px-6 scroll-mt-28"
    >
      <div className="space-y-3 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-lm-blue">
          {benefits.title}
        </h2>
        <p className="text-slate-600 max-w-3xl">{benefits.description}</p>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${safeIndex * (100 / perView)}%)`,
            }}
          >
            {benefits.cards.map((card) => (
              <div
                key={card.id}
                className="px-2.5"
                style={{ flex: `0 0 ${100 / perView}%` }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedCardId(card.id)}
                  className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow h-full text-left w-full"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4 space-y-3">
                    <span className="inline-flex text-xs font-semibold bg-blue-50 text-lm-blue px-2.5 py-1 rounded-full">
                      {card.tag}
                    </span>
                    <h3 className="text-lg font-semibold text-lm-blue">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600">{card.shortText}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {canSlide && (
          <>
            <button
              type="button"
              onClick={goPrev}
              disabled={safeIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 w-10 h-10 rounded-full bg-white border border-slate-200 shadow disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Tarjeta anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={safeIndex === maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 w-10 h-10 rounded-full bg-white border border-slate-200 shadow disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Siguiente tarjeta"
            >
              ›
            </button>
          </>
        )}
      </div>

      {selectedCard && (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            aria-label="Cerrar modal"
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
            onClick={() => setSelectedCardId(null)}
          />

          <div className="relative z-[71] min-h-full flex items-center justify-center p-4">
            <article className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 md:p-7 space-y-4">
              <div>
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="inline-flex text-xs font-semibold bg-blue-50 text-lm-blue px-2.5 py-1 rounded-full">
                    {selectedCard.tag}
                  </p>
                  <h3 className="text-2xl font-bold  text-lm-blue mt-2">
                    {selectedCard.detail.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCardId(null)}
                  className="w-9 h-9 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100"
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>

              <p className="text-slate-600">
                {selectedCard.detail.description}
              </p>

              <ul className="space-y-2">
                {selectedCard.detail.benefits.map((item) => (
                  <li key={item} className="text-slate-700 text-sm flex gap-2">
                    <span className="text-lm-blue">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCardId(null)}
                  className="rounded-full bg-av-red text-white font-semibold px-5 py-2.5 hover:bg-av-red-dark transition-colors"
                >
                  {selectedCard.detail.buttonLabel}
                </button>
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
}
