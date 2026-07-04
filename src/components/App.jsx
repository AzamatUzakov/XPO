import { useEffect } from "react";
import Lenis from "lenis";
import { I18nProvider } from "./I18nProvider";
import TopNavBar from "./TopNavBar";
import HeroSection from "./HeroSection";
import Services from "./Services";
import Geography from "./Geography";
import Workflow from "./Workflow";
import AboutUs from "./AboutUs";
import Marquee from "./Marquee";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import GeographyMap from "./GeographyMap";
import AI_Chat from "./AI_Chat";
import ProjectsAndMedia from "./ProjectsAndMedia";
import FAQSection from "./Faq";
import CrmPromo from "./CrmPromo";
import Advantages from "./Advantages";

export default function App({ locale, translations, currentPath }) {
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

  return (
    <I18nProvider locale={locale} translations={translations}>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Шапка и фоновое видео */}
        <div className="relative flex flex-col md:min-h-[95vh] min-h-[100%] w-full overflow-hidden bg-slate-900 shadow-xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/video/hero_poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/hero_video-Second.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 flex flex-col flex-grow w-full">
            <TopNavBar locale={locale} currentPath={currentPath} />
            <HeroSection />
          </div>
        </div>

        {/* Главный контент страницы (теперь один общий) */}
        <main className="py-0 flex flex-col">
          <Services />
          <Geography />
          <Workflow />
          <Advantages />
          <ProjectsAndMedia />
          
          <div className="flex flex-col">
            <AboutUs />
          </div>
          
          <Marquee />
          <ContactForm />
          <GeographyMap />
          <AI_Chat />
          <FAQSection />
          <CrmPromo />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}