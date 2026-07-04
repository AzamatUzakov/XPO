
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionInner from "./SectionInner";
import { useI18n, I18nProvider } from "./I18nProvider";

const defaultCards = [
  { colSpan: "md:col-span-2", src: "/service-1.png", alt: "Air Freight", title: "AIR FREIGHT", mobileDesc: "Urgent delivery across the globe", desktopDesc: "Express global delivery with priority cargo handling." },
  { colSpan: "md:col-span-2", src: "/service-2.png", alt: "Rail Transport", title: "RAIL TRANSPORT", mobileDesc: "Reliable shipments across the CIS and Europe", desktopDesc: "Cost-efficient transcontinental solutions along Eurasian corridors." },
  { colSpan: "md:col-span-2", src: "/service-3.png", alt: "Sea Freight", title: "SEA FREIGHT", mobileDesc: "Economical container shipping", desktopDesc: "Direct contracts with leading lines (FCL/LCL) across all ocean routes." },
  { colSpan: "md:col-span-3", src: "/service-4.png", alt: "Less than Container Load", title: "LESS THAN CONTAINER LOAD (LCL)", mobileDesc: "Cost optimization for small shipments", desktopDesc: "Cost optimization for smaller consignments with a regular departure schedule." },
  { colSpan: "md:col-span-3", src: "/service-5.png", alt: "Oversized Cargo", title: "OVERSIZED CARGO", mobileDesc: "Project logistics of any complexity", desktopDesc: "Project logistics for industrial giants with increased complexity." },
  { colSpan: "md:col-span-2", src: "/service-8.png", alt: "Hazardous Cargo", title: "HAZARDOUS CARGO", mobileDesc: "Safe transportation of hazardous goods", desktopDesc: "Safe transport of dangerous chemicals and hazardous materials with license." },
  { colSpan: "md:col-span-2", src: "/service-7.png", alt: "Customs", title: "CUSTOMS", mobileDesc: "Declaration and certification", desktopDesc: "Brokerage, customs clearance and product certification." },
  { colSpan: "md:col-span-2", src: "/service-6.png", alt: "Warehousing", title: "WAREHOUSING", mobileDesc: "Storage and handling", desktopDesc: "Storage, consolidation and handling at modern warehouses." },
];

function ServiceCard({ children, index, colSpan, addTopMargin }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const fromLeft = index % 2 === 0;
  const baseClass = `relative w-full overflow-hidden group cursor-pointer shadow-md ${colSpan} ${addTopMargin ? "mt-6 md:mt-0" : ""}`;

  return (
    <div ref={ref} className={baseClass}>
      <motion.div className="hidden md:block w-full h-full" initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }} transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}>{children}</motion.div>
      <motion.div className="md:hidden w-full h-full" initial={{ opacity: 0, x: fromLeft ? -40 : 40 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromLeft ? -40 : 40 }} transition={{ duration: 0.45, ease: "easeOut" }}>{children}</motion.div>
    </div>
  );
}

function ServicesInner() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px 0px" });
  const { translations } = useI18n();
  const services = translations.services || {};
  const cards = (services.cards?.length ? services.cards : defaultCards).map((card, index) => ({ ...defaultCards[index], ...card }));
  const headerTitle = services.title || "Logistics Solutions";
  const headerSubtitle = services.subtitle || "Professional Services";

  return (
    <section id="services" className="rounded-lg mt-[80px] pb-4 md:mt-[120px]">
      <SectionInner>
        <motion.div ref={headerRef} className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between" initial={{ opacity: 0, y: -16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease: "easeOut" }}>
          <h2 className="text-2xl text-[#003366] font-normal">{headerTitle}</h2>
          <p className="text-[#00A8CC] text-[12px] md:text-[16px]">{headerSubtitle}</p>
        </motion.div>

        <hr className="border-t-2 mt-6 border-[#C3C6D1]" />

        <div className="mt-10 md:grid md:grid-cols-6 md:gap-4 lg:gap-6">
          {cards.map((card, i) => (
            <ServiceCard key={`${card.title}-${i}`} index={i} colSpan={card.colSpan} addTopMargin={i > 0}>
              <img className="w-full h-auto block transition-transform duration-700 md:group-hover:scale-105" src={(card.src || defaultCards[i]?.src || "/service-1.png").replace(/\.(png|jpg|jpeg)$/i, ".webp")} alt={card.alt || "service"} width={386} height={217} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 pb-5 md:pb-7 z-10 text-white">
                <h3 className="text-[18px] md:text-[20px] lg:text-[26px] font-normal">{card.title}</h3>
                <div className="grid grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 transition-all duration-500">
                  <div className="overflow-hidden">
                    <p className="text-[14px] lg:text-[16px] text-white/80 font-normal pt-1">
                      <span className="md:hidden">{card.mobileDesc}</span>
                      <span className="hidden md:inline">{card.desktopDesc}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[4px] bg-[#00A8CC] w-full md:w-0 transition-all duration-500 ease-out md:group-hover:w-full z-20" />
            </ServiceCard>
          ))}
        </div>
      </SectionInner>
    </section>
  );
}

export default function Services({ locale = "ru", translations = {} }) {
  return (
    <I18nProvider locale={locale} translations={translations}>
      <ServicesInner />
    </I18nProvider>
  );
}