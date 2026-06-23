import TopNavBar from "./TopNavBar";
import HeroSection from "./HeroSection";
import Services from "./Services";
import Geography from "./Geography";
import Workflow from "./Workflow";
import AboutUs from "./AboutUs";
import Marquee from "./Marquee";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="relative flex flex-col md:min-h-[95vh] min-h-[100%] w-full overflow-hidden bg-slate-900 rounded-b-3xl shadow-xl">
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
      <main className="px-[12px] py-0 flex flex-col gap-8">
        <Services />
        <Geography />
        <Workflow />
        <AboutUs />
        <Marquee />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
