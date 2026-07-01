import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
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
import CrmPromo from "./CrmPromo";
import Advantages from "./Advantages";

export default function App() {
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
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative flex flex-col md:min-h-[95vh] min-h-[100%] w-full overflow-hidden bg-slate-900  shadow-xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex flex-col flex-grow w-full">
          <TopNavBar />
          <HeroSection />
        </div>
      </div>
      <main className="py-0 flex flex-col">
        <Services />
        <Geography />
        <Workflow />
        <Advantages />
        <div className="flex flex-col">
          <AboutUs />
        </div>
        <Marquee />
        <ContactForm />
        <GeographyMap />
        <AI_Chat />
        <CrmPromo />
      </main>
      <Footer />
    </div>
  );
}
