import { motion, useReducedMotion } from "framer-motion";
import { RiTelegram2Fill } from "react-icons/ri";
import { Button } from "./ui/button";
import { TbRouteSquare } from "react-icons/tb";
import { useI18n, I18nProvider } from "./I18nProvider";
import TypewriterText from "./TypewriterText";
import SectionInner from "./SectionInner";

// Hero-специфичные variants: stagger-контейнер
const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function HeroSectionInner() {
  const { translations } = useI18n();
  const hero = translations.hero || {};
  const shouldReduce = useReducedMotion();

  return (
    <section className="mt-[60px]">
      <SectionInner>
        <motion.div
          variants={heroContainer}
          initial={shouldReduce ? false : "hidden"}
          animate="visible"
        >
          {/* Заголовок */}
          <motion.h1 variants={heroItem} className="font-black">
            <span className="text-white text-4xl md:text-[44px] lg:text-[64px]">
              {hero.headlinePrefix ?? "ГЛОБАЛЬНАЯ"}
            </span>{" "}
            <br />
            <div className="relative inline-block text-2xl md:text-[44px] lg:text-[64px] whitespace-nowrap">
              <span className="invisible opacity-0 pr-3">
                {hero.headlineMain ?? "НАДЁЖНАЯ ЛОГИСТИКА"}
              </span>
              <div className="absolute left-0 top-0 w-full h-full">
                <TypewriterText />
              </div>
            </div>
          </motion.h1>

          {/* Подзаголовок */}
          <motion.div
            variants={heroItem}
            className="mt-6 border-l-[3px] border-[#00A8CC] pl-4"
          >
            <p className="text-[16px] text-white font-normal leading-[26px]">
              <span className="md:hidden">
                {hero.introShort ??
                  "Статус премиального оператора полного цикла. Мы обеспечиваем бесперебойные цепочки поставок для мировых лидеров."}
              </span>
              <span className="hidden md:block max-w-[70%] lg:max-w-[50%]">
                {hero.introLong ??
                  "Статус премиального оператора полного цикла. Мы обеспечиваем бесперебойные цепочки поставок для мировых лидеров индустрии, объединяя континенты с точностью часового механизма."}
              </span>
            </p>
          </motion.div>

          {/* CTA-кнопки */}
          <motion.div
            variants={heroItem}
            className="mb-[40px] flex flex-col w-full mt-9 md:flex-row md:items-stretch gap-3 md:gap-4"
          >
            <Button className="w-full md:w-auto py-7 cursor-pointer border border-[#007A99] rounded-none text-[13px] bg-[#007A99] hover:bg-[#005F77] hover:border-[#005F77] text-white transition-colors md:h-[66px] md:px-[40px] flex items-center justify-center">
              <RiTelegram2Fill className="mr-2 text-xl" />
              {hero.buttonTelegram ?? "Связаться в Telegram"}
            </Button>
            <Button className="w-full md:w-auto py-7 bg-transparent cursor-pointer border border-white rounded-none text-[13px] hover:bg-white/10 transition-colors md:h-[66px] flex items-center md:px-[40px] justify-center">
              <TbRouteSquare className="mr-2 text-xl" />
              {hero.buttonRoutes ?? "Наши Маршруты"}
            </Button>
          </motion.div>
        </motion.div>
      </SectionInner>
    </section>
  );
}

export default function HeroSection({ locale = "ru", translations = {} }) {
  return (
    <I18nProvider locale={locale} translations={translations}>
      <HeroSectionInner />
    </I18nProvider>
  );
}
