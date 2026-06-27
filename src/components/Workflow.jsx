import { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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

export default function Workflow() {
  const sectionRef = useRef(null);

  // Линия и кружки рендерятся ДВАЖДЫ в DOM — отдельный набор для мобилки
  // и отдельный для десктопа (переключаются через hidden/md:flex).
  // Поэтому у каждого набора свой wrapRef и свой массив circleRefs,
  // чтобы измерения не перезатирали друг друга.
  const mobileLineWrapRef = useRef(null);
  const mobileCircleRefs = useRef([]);
  const [mobileThresholds, setMobileThresholds] = useState(
    STEPS.map((_, i) => i / (STEPS.length - 1 || 1)),
  );

  const desktopLineWrapRef = useRef(null);
  const desktopCircleRefs = useRef([]);
  const [desktopThresholds, setDesktopThresholds] = useState(
    STEPS.map((_, i) => i / (STEPS.length - 1 || 1)),
  );

  // offset смещён так, что прогресс 0→1 проходит раньше:
  // старт считается, когда верх секции доходит до низа экрана (а не до центра),
  // конец — когда низ секции доходит до 30% высоты экрана (а не до центра).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end 30%"],
  });

  const lineProgress = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 300, damping: 40, mass: 0.5 },
  );

  // Измеряем РЕАЛЬНУЮ позицию каждого кружка относительно высоты линии,
  // вместо равномерного деления (index / totalSteps). Так threshold всегда
  // точно совпадает с физическим местом кружка, даже если блоки разной высоты
  // из-за разной длины текста.
  useLayoutEffect(() => {
    function measureSet(wrapRef, refsArr, setFn) {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wrapRect = wrap.getBoundingClientRect();
      const totalHeight = wrapRect.height;
      if (!totalHeight) return;

      const next = refsArr.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        const circleCenter = r.top + r.height / 2;
        const fraction = (circleCenter - wrapRect.top) / totalHeight;
        return Math.min(1, Math.max(0, fraction));
      });

      setFn(next);
    }

    function measureAll() {
      measureSet(mobileLineWrapRef, mobileCircleRefs, setMobileThresholds);
      measureSet(desktopLineWrapRef, desktopCircleRefs, setDesktopThresholds);
    }

    // небольшая задержка, чтобы шрифты/layout успели применится перед первым замером
    const raf = requestAnimationFrame(measureAll);
    window.addEventListener("resize", measureAll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measureAll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-[640px] flex-col gap-16  md:max-w-[768px] md:gap-20">
        {/* Label */}
        <h2 className="text-2xl text-[#003366] font-normal text-center  ">ПРОЦЕСС РАБОТЫ</h2>

        {/* Steps list */}
        <div className="relative flex flex-col">
          {/* ===== Линии: мобильная (слева) и десктопная (по центру) ===== */}
          <div
            ref={mobileLineWrapRef}
            className="absolute left-[18px] top-[18px] bottom-[18px] md:hidden"
            aria-hidden="true"
          />
          <div
            ref={desktopLineWrapRef}
            className="absolute left-1/2 top-8 bottom-8 hidden -translate-x-1/2 md:block"
            aria-hidden="true"
          />

          {/* Трек — серый */}
          <div
            className="absolute left-[18px] top-[18px] bottom-[18px] w-[1px] bg-gray-200 md:left-1/2 md:top-8 md:bottom-8 md:-translate-x-1/2"
            aria-hidden="true"
          />
          {/* Заполняемая линия */}
          <motion.div
            className="absolute left-[18px] top-[18px] w-[1px] origin-top bg-[#2BB3C0] md:left-1/2 md:top-8 md:-translate-x-1/2"
            style={{
              scaleY: lineProgress,
              height: "calc(100% - 36px)",
            }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const isLeft = i % 2 === 0; // десктоп: 01, 03 — текст слева; 02 — текст справа
            return (
              <div
                key={step.num}
                className={`relative flex items-start gap-6 ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                } ${i === 0 ? "" : "mt-16 md:mt-20"} md:gap-8`}
              >
                {/* ===== МОБИЛКА: кружок слева, текст справа ===== */}
                <div className="flex w-full items-start gap-6 md:hidden">
                  <Circle
                    circleRef={(el) => (mobileCircleRefs.current[i] = el)}
                    num={step.num}
                    lineProgress={lineProgress}
                    threshold={mobileThresholds[i]}
                  />
                  <div className="flex flex-col justify-center pt-1 text-left">
                    <h3 className="mb-2 text-xl font-semibold text-[#1B3A6B]">
                      {step.title}
                    </h3>
                    <p className="max-w-[420px] text-[15px] leading-relaxed text-gray-500">
                      {step.text}
                    </p>
                  </div>
                </div>

                {/* ===== ДЕСКТОП: зигзаг ===== */}
                {isLeft ? (
                  <>
                    <div className="hidden w-[calc(50%-32px)] flex-col items-end justify-center pt-1 text-right md:flex">
                      <h3 className="mb-2 text-2xl font-semibold text-[#1B3A6B]">
                        {step.title}
                      </h3>
                      <p className="max-w-[540px] text-[17px] leading-relaxed text-gray-500">
                        {step.text}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <Circle
                        circleRef={(el) => (desktopCircleRefs.current[i] = el)}
                        num={step.num}
                        lineProgress={lineProgress}
                        threshold={desktopThresholds[i]}
                      />
                    </div>
                    <div
                      className="hidden w-[calc(50%-32px)] md:block"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <>
                    <div
                      className="hidden w-[calc(50%-32px)] md:block"
                      aria-hidden="true"
                    />
                    <div className="hidden md:block">
                      <Circle
                        circleRef={(el) => (desktopCircleRefs.current[i] = el)}
                        num={step.num}
                        lineProgress={lineProgress}
                        threshold={desktopThresholds[i]}
                      />
                    </div>
                    <div className="hidden w-[calc(50%-32px)] flex-col items-start justify-center pt-1 text-left md:flex">
                      <h3 className="mb-2 text-2xl font-semibold text-[#1B3A6B]">
                        {step.title}
                      </h3>
                      <p className="max-w-[540px] text-[17px] leading-relaxed text-gray-500">
                        {step.text}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Circle({ circleRef, num, lineProgress, threshold }) {
  // threshold — реальная измеренная доля высоты линии, на которой стоит этот кружок.
  // Прилетает сверху уже точным числом (0..1), посчитанным от фактического DOM,
  // а не предположением о равных интервалах.
  const background = useTransform(lineProgress, (v) =>
    v >= threshold ? "#2BB3C0" : "#ffffff",
  );
  const color = useTransform(lineProgress, (v) =>
    v >= threshold ? "#ffffff" : "#1B3A6B",
  );

  return (
    <motion.div
      ref={circleRef}
      style={{ backgroundColor: background, color }}
      className="
        relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center
        rounded-full border-2 border-[#2BB3C0]
        text-xs font-bold
        md:h-16 md:w-16 md:text-xl
      "
    >
      {num}
    </motion.div>
  );
}
