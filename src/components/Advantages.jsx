import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Calculator, ShieldCheck, Umbrella, MapPin, Globe } from "lucide-react";
import SectionInner from "./SectionInner";

const advantages = [
  { icon: Clock, text: "Работа 24/7" },
  { icon: Calculator, text: "Быстрый расчёт стоимости" },
  { icon: ShieldCheck, text: "Безопасная перевозка" },
  { icon: Umbrella, text: "Страхование груза" },
  { icon: MapPin, text: "Онлайн-отслеживание" },
  { icon: Globe, text: "Международная сеть партнёров" },
];

function AnimatedLine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.9, once: false });

  return (
    <div ref={ref} className="w-full mt-6 flex justify-center">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ originX: 0.5 }}
        className="h-[2px] w-full max-w-screen-lg bg-[#00A8CC] rounded-full"
      />
    </div>
  );
}

export default function Advantages() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 overflow-hidden">
      <SectionInner>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl text-[#003366] font-normal">
            Наши преимущества
          </h2>
          <AnimatedLine />
        </motion.div>

        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="md:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] group"
            >
              <div className="h-full bg-[#f4f7fc] border border-border/50 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/5 group-hover:border-[#00A8CC]/20">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#00A8CC]/10 text-[#00A8CC] flex items-center justify-center mb-3 md:mb-6 transition-transform duration-300 group-hover:scale-110">
                  <adv.icon className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-[14px] sm:text-[17px] md:text-[19px] font-normal text-foreground leading-snug">
                  {adv.text}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionInner>
    </section>
  );
}