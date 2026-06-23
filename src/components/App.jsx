import TopNavBar from './TopNavBar';
import HeroSection from './HeroSection';
import Services from './Services';
import Geography from './Geography';
import Workflow from './Workflow';
import AboutUs from './AboutUs';
import Marquee from './Marquee';
import ContactForm from './ContactForm';
import Footer from './Footer';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <TopNavBar />
      {/* 20px padding sides, 0 on top and bottom */}
      <main className="px-[20px] py-0 flex flex-col gap-8 mt-8 mb-8">
        <HeroSection />
        <Services />
        <Workflow />
        <div className="flex flex-col">
          <AboutUs />
          <Geography />
        </div>

        <Marquee />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
