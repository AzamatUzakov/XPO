import { useEffect } from "react";
import Lenis from "lenis";

/**
 * LenisInit — минимальный компонент для инициализации smooth scroll.
 * Рендерит null, монтируется с client:load.
 * Вынесен из App.jsx чтобы не тянуть за собой весь React-бандл.
 */
export default function LenisInit() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
