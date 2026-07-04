import { useEffect } from "react";

/**
 * LenisInit — инициализирует smooth scroll только после того,
 * как основной поток освободится или пользователь начнёт взаимодействие.
 */
export default function LenisInit() {
  useEffect(() => {
    let cancelled = false;
    let lenis = null;
    let rafId = null;

    const startLenis = async () => {
      if (cancelled) return;

      const mediaQuery = window.matchMedia("(min-width: 768px)");
      if (!mediaQuery.matches) return;

      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      });

      const raf = (time) => {
        if (cancelled || !lenis) return;
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    const scheduleStart = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => startLenis());
      } else {
        window.setTimeout(() => startLenis(), 150);
      }
    };

    const handleFirstInteraction = () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      scheduleStart();
    };

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (mediaQuery.matches) {
      scheduleStart();
    } else {
      window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
      window.addEventListener("keydown", handleFirstInteraction, { once: true });
    }

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  return null;
}
