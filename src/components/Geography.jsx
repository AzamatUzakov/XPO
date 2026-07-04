import { motion, useReducedMotion } from "framer-motion";
import { Globe } from "@/components/ui/globe";
import AnimatedNumber from "./AnimatedNumber";
import { useI18n } from "./I18nProvider";
import SectionInner from "./SectionInner";
import { withI18n } from "./I18nProvider";
import {
  fadeUp,
  fadeScale,
  staggerContainer,
  defaultViewport,
} from "../lib/animations";

// Stagger-контейнер специально для стат-карточек
const statsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

function Geography() {
  const { translations } = useI18n();
  const geography = translations.geography || {};
  const stats = geography.stats || {};
  const shouldReduce = useReducedMotion();

  return (
    <section className="bg-[#f7f9ff] mt-[80px] md:mt-[120px] py-24">
      <SectionInner>
        <div className="flex flex-col md:grid md:grid-cols-2 md:items-center gap-10 md:gap-8 max-w-7xl mx-auto">
          <div>
            {/* Заголовок — fadeUp */}
            <motion.h2
              className="text-2xl text-[#003366] font-normal"
              variants={fadeUp}
              initial={shouldReduce ? false : "hidden"}
              whileInView="visible"
              viewport={defaultViewport}
            >
              {geography.title ?? "Глобальное присутствие"}
            </motion.h2>

            {/* Описание — fadeUp с задержкой */}
            <motion.p
              className="text-[16px] text-[#43474F] mt-6"
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              {geography.description ??
                "Мы расширяем границы возможного, открывая прямые трансконтинентальные коридоры в Северную Америку (США, Канада) и по всей Евразии."}
            </motion.p>

            {/* Стат-карточки — stagger с scale */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-10"
              variants={statsContainer}
              initial={shouldReduce ? false : "hidden"}
              whileInView="visible"
              viewport={defaultViewport}
            >
              <motion.div variants={fadeScale} className="bg-white p-6 shadow-sm">
                <p className="flex flex-col">
                  <span className="text-[#00A8CC] font-black text-[32px]">
                    <AnimatedNumber value={50} suffix="+" />
                  </span>
                  <span className="text-[12px] mt-1 text-[#43474F]">
                    {stats.countries ?? "Стран охвата"}
                  </span>
                </p>
              </motion.div>

              <motion.div variants={fadeScale} className="bg-white p-6 shadow-sm">
                <p className="flex flex-col">
                  <span className="text-[#00A8CC] font-black text-[32px]">
                    <AnimatedNumber value={1000} suffix="+" />
                  </span>
                  <span className="text-[12px] mt-1 text-[#43474F]">
                    {stats.routes ?? "Маршрутов"}
                  </span>
                </p>
              </motion.div>

              <motion.div variants={fadeScale} className="bg-white p-6 shadow-sm">
                <p className="flex flex-col">
                  <span className="text-[#00A8CC] font-black text-[32px]">
                    <AnimatedNumber value={24} suffix="/7" />
                  </span>
                  <span className="text-[12px] mt-1 text-[#43474F]">
                    {stats.monitoring ?? "Мониторинг"}
                  </span>
                </p>
              </motion.div>

              <motion.div variants={fadeScale} className="bg-white p-6 shadow-sm">
                <p className="flex flex-col">
                  <span className="text-[#00A8CC] font-black text-[32px]">
                    <AnimatedNumber value={15} />
                  </span>
                  <span className="text-[12px] mt-1 text-[#43474F]">
                    {stats.hubs ?? "Хабов"}
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Глобус — fadeUp с задержкой */}
          <motion.div
            className="relative w-full aspect-square max-w-[400px] md:max-w-[500px] mx-auto"
            initial={shouldReduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <Globe />
          </motion.div>
        </div>
      </SectionInner>
    </section>
  );
}

export default withI18n(Geography);
