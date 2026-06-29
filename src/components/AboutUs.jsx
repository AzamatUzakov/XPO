"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionInner from "./SectionInner";

export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, ease: "easeOut", delay },
  });

  const fadeLeft = (delay = 0) => ({
    initial: { opacity: 0, x: -20 },
    animate: isInView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.45, ease: "easeOut", delay },
  });

  const features = [
    {
      src: "/reliability.png",
      alt: "reliability",
      title: "Надежность",
      desc: "Гарантируем исполнение в любых условиях.",
    },
    {
      src: "/individuality.png",
      alt: "individuality",
      title: "Индивидуальность",
      desc: "Адаптируем processes под ваши требования.",
    },
    {
      src: "/safety.png",
      alt: "safety",
      title: "Безопасность",
      desc: "Высшие стандарты защиты грузов.",
    },
  ];

  return (
    <div className="w-full bg-[#001E40] text-white" ref={ref}>
      <SectionInner className="min-h-full md:min-h-[100dvh] py-12 sm:py-16 md:py-0 flex flex-col md:flex-row md:justify-between md:items-center gap-10 md:gap-12">
        {/* Левая колонка */}
        <div className="md:max-w-[50%]">
          {/* Заголовок */}
          <motion.div {...fadeUp(0)}>
            <p className="text-[26px] sm:text-[28px] md:text-[32px] leading-tight tracking-normal font-black uppercase text-white">
              О Компании
            </p>
            <p className="text-[26px] sm:text-[28px] md:text-[32px] leading-tight tracking-normal font-black uppercase text-[#00A8CC] mb-4">
              XPOTrans
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] tracking-normal font-normal text-white mb-8">
              Мы являемся экспертами в области сложной международной логистики.
              Устраняем барьеры для бизнеса.
            </p>
          </motion.div>

          {/* Фичи — каждая чуть позже */}
          {features.map((f, i) => (
            <motion.div
              key={f.alt}
              {...fadeLeft(0.2 + i * 0.12)}
              className={`flex items-start gap-4 border-l border-white/20 pl-[24px] ${i < features.length - 1 ? "mb-[24px]" : ""}`}
            >
              <img src={f.src} alt={f.alt} className="shrink-0" />
              <div className="space-y-1">
                <p className="text-[16px] leading-[24px] font-medium text-white">
                  {f.title}
                </p>
                <p className="text-[11px] leading-[16.5px] tracking-normal font-normal text-white/70">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Правая колонка — фото появляется справа */}
        <motion.div
          className="w-full md:max-w-[50%]"
          initial={{ opacity: 0, x: 32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <div className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px]">
            <img
              src="/about-logo.png"
              alt="about-logo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#001E40]/40 pointer-events-none" />

            {/* Бейдж "12+ лет" — появляется последним с лёгким scale */}
            <motion.div
              className="absolute left-0 bottom-0 md:-left-12 md:-bottom-10 bg-[#00A8CC] text-center w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] lg:w-[185px] lg:h-[185px] p-3 sm:p-4 flex flex-col justify-center items-center select-none"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.55 }}
            >
              <p className="text-white text-[32px] sm:text-[40px] md:text-[50px] lg:text-[56px] font-black leading-none mb-1">
                12+
              </p>
              <p className="text-white text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-bold uppercase leading-tight tracking-tight px-1">
                Лет опыта на рынке
              </p>
            </motion.div>
          </div>
        </motion.div>
      </SectionInner>
    </div>
  );
}
