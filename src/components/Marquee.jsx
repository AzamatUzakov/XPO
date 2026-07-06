import { motion, useReducedMotion } from "framer-motion";
import SectionInner from "./SectionInner";
import { useI18n, I18nProvider } from "./I18nProvider";
import { fadeUp, defaultViewport } from "../lib/animations";

const LOGOS = [
  { src: "/orion.svg", alt: "Orion" },
  { src: "/agromir.webp", alt: "Agromir" },
  { src: "/smz.svg", alt: "SMZ" },
  { src: "/uzairways.webp", alt: "Uzbekistan Airways" },
  { src: "/samauto.webp", alt: "SamAuto" },
  { src: "/sag-gilamlar.webp", alt: "SAG Gilamlar" },
  { src: "/nestle.svg", alt: "Nestle" },
  { src: "/uzkimyoimpeks.webp", alt: "Uzkimyoimpeks" },
  { src: "/orientMotors.webp", alt: "OrientMotors" },
];

function LogoMarqueeInner() {
  const { translations } = useI18n();
  const partners = translations.partners || {};
  const marquee = translations.marquee || {};
  const doubledLogos = [...LOGOS, ...LOGOS];
  const shouldReduce = useReducedMotion();

  return (
    <section id="partners" className="mt-[64px] md:mt-[96px]">
      {/* Заголовок с отступами */}
      <SectionInner>
        <div className="mb-[52px] sm:mb-[50px] md:mb-[49px] lg:mb-[48px] xl:mb-[48px] 2xl:mb-[48px]">
          <motion.h2
            className="text-2xl text-[#003366] font-normal"
            variants={fadeUp}
            initial={shouldReduce ? false : "hidden"}
            whileInView="visible"
            viewport={defaultViewport}
          >
            {marquee.title ?? partners.title ?? "Стратегические партнеры"}
          </motion.h2>
        </div>
      </SectionInner>

      {/* Лента логотипов — edge-to-edge, без горизонтальных отступов */}
      <div className="w-full overflow-hidden select-none mb-[164px]">
        <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-custom-marquee {
          animation: marquee 35s linear infinite;
        }
        `}</style>

        <div className="flex w-full overflow-hidden whitespace-nowrap">
          <div className="flex animate-custom-marquee items-center shrink-0 space-x-16 pr-16">
            {doubledLogos.map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="w-[140px] h-12 flex items-center justify-center shrink-0"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          <div
            className="flex animate-custom-marquee items-center shrink-0 space-x-16 pr-16"
            aria-hidden="true"
          >
            {doubledLogos.map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="w-[140px] h-12 flex items-center justify-center shrink-0"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LogoMarquee({ locale = "ru", translations = {} }) {
  return (
    <I18nProvider locale={locale} translations={translations}>
      <LogoMarqueeInner />
    </I18nProvider>
  );
}
