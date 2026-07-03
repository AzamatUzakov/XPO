import { useReducedMotion } from "framer-motion";

// ─── Стандартные настройки viewport ───────────────────────────────────
export const defaultViewport = { once: true, amount: 0.2 };

// ─── Stagger-контейнер ───────────────────────────────────────────────
// Используется как variants для родительского motion-элемента,
// чтобы дочерние элементы появлялись последовательно.
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ─── Fade up — универсальный вариант для секционных элементов ─────────
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Fade left — для элементов, появляющихся слева ───────────────────
export const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// ─── Fade scale — для карточек статистики и фич ──────────────────────
export const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─── Простой fade — для футера и минимальных эффектов ─────────────────
export const simpleFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ─── Хук: возвращает пустые motion-пропсы при включённом reduced motion ─
// Использование: const motionOk = useMotionOk();
// Затем: motionOk ? normalProps : {}
export function useMotionOk() {
  const shouldReduce = useReducedMotion();
  return !shouldReduce;
}

// ─── Хелпер: обнуляет анимации при reduced motion ────────────────────
// Принимает motion-пропсы и возвращает их же или «мгновенные» версии.
export function safeMotionProps(shouldReduce, props) {
  if (!shouldReduce) return props;
  return {
    ...props,
    initial: false,
    animate: undefined,
    whileInView: undefined,
    transition: { duration: 0 },
  };
}
