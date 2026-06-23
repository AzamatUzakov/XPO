import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Заявка и расчет",
    text: "Оставьте заявку, и наши специалисты подготовят детальное коммерческое предложение с расчетом стоимости и сроков в течение 2 часов.",
  },
  {
    num: "02",
    title: "Подбор транспорта",
    text: "Мы подбираем оптимальный вид транспорта и маршрут, учитывая специфику вашего груза и требования к безопасности.",
  },
  {
    num: "03",
    title: "Доставка до двери",
    text: "Осуществляем забор груза, таможенное оформление и доставку до конечного пункта назначения с полным сопровождением.",
  },
];

const stepVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -24 },
};

const transition = { duration: 0.3, ease: "easeInOut" };

export default function Workflow() {
  const sectionRef = useRef(null);
  // useRef to avoid stale closure in scroll callback
  const activeStepRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Subscribe directly to avoid stale closure — no useMotionValueEvent needed
  useEffect(() => {
    // Set correct step on mount in case page starts mid-scroll
    const compute = (v) => Math.max(0, Math.min(2, Math.floor(v * 3)));

    const unsub = scrollYProgress.on("change", (v) => {
      const next = compute(v);
      if (next !== activeStepRef.current) {
        activeStepRef.current = next;
        setActiveStep(next);
      }
    });

    // Sync on mount
    const initial = compute(scrollYProgress.get());
    activeStepRef.current = initial;
    setActiveStep(initial);

    return unsub;
  }, [scrollYProgress]);

  // Per-bar progress: each bar fills during its own third of scroll
  const p1 = useSpring(
    useTransform(scrollYProgress, [0, 1 / 3], [0, 1]),
    { stiffness: 200, damping: 30 }
  );
  const p2 = useSpring(
    useTransform(scrollYProgress, [1 / 3, 2 / 3], [0, 1]),
    { stiffness: 200, damping: 30 }
  );
  const p3 = useSpring(
    useTransform(scrollYProgress, [2 / 3, 1], [0, 1]),
    { stiffness: 200, damping: 30 }
  );
  const bars = [p1, p2, p3];

  return (
    /*
      mx-[-20px] w-[calc(100%+40px)] breaks out of parent's px-[20px] padding
      so the sticky section spans the full viewport width.
    */
    <section
      ref={sectionRef}
      className="relative h-[300vh] mx-[-20px] w-[calc(100%+40px)]"
    >
      {/* Sticky container — must NOT have overflow:hidden, or sticky breaks */}
      <div className="sticky top-0 h-screen w-full flex flex-col">
        {/* Inner layout — centred, max-width, same horizontal padding as the rest of the page */}
        <div className="mx-auto flex h-full w-full max-w-[640px] flex-col justify-between px-6 py-12 md:max-w-[768px] md:py-16">

          {/* Label */}
          <div className="text-[13px] font-bold tracking-wider text-[#1B3A6B] md:text-[15px]">
            ПРОЦЕСС РАБОТЫ
          </div>

          {/* Active step — AnimatePresence mode="wait" ensures only ONE step visible at a time */}
          <div className="relative flex flex-1 items-center w-full min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="flex gap-6 md:gap-8 items-start w-full"
              >
                {/* Circle — filled #2BB3C0 with white text */}
                <div className="
                  flex-shrink-0
                  flex h-[50px] w-[50px] items-center justify-center
                  rounded-full border-2 border-[#2BB3C0] bg-[#2BB3C0]
                  font-bold text-white
                  md:h-16 md:w-16 md:text-xl
                ">
                  {STEPS[activeStep].num}
                </div>

                {/* Text content */}
                <div className="flex flex-col justify-center">
                  <h3 className="mb-2 text-xl font-semibold text-[#1B3A6B] md:text-2xl">
                    {STEPS[activeStep].title}
                  </h3>
                  <p className="max-w-[420px] text-[15px] leading-relaxed text-gray-500 md:max-w-[540px] md:text-[17px]">
                    {STEPS[activeStep].text}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bars — 3 horizontal bars filling left→right */}
          <div className="flex gap-3 w-full">
            {bars.map((scaleX, i) => (
              <div
                key={i}
                className="relative h-[4px] flex-1 rounded-full bg-gray-200 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-[#2BB3C0] origin-left"
                  style={{ scaleX }}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}