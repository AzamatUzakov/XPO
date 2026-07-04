import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiMenu, FiX, FiPhone, FiMail } from "react-icons/fi";
import ReactCountryFlag from "react-country-flag";
import { Button } from "./ui/button";
import SectionInner from "./SectionInner";
import { I18nProvider, useI18n } from "./I18nProvider";

function TopNavBarInner({ locale }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();
  const { translations } = useI18n();
  const header = translations.header || {};
  const navItems = header.nav || [];
  const mobileItems = header.mobileMenu || navItems;
  const contactLabel = header.contact || "Contact";
  const languageLabel = header.language || "Language";
  const languages = header.languages || { ru: "RU", en: "EN", uz: "UZ" };
  const contactPhone = header.contactPhone || "+7 (999) 123-45-67";
  const contactEmail = header.contactEmail || "info@logistic.com";

  const scrollTargets = {
    services: "services",
    about: "about",
    values: "workflow",
    careers: "contacts",
    faq: "faq",
    contacts: "contacts",
    geography: "geography",
    partners: "partners",
    "О нас": "about",
    "Услуги": "services",
    "Ценности": "workflow",
    "Вакансии": "contacts",
    FAQ: "faq",
    Контакты: "contacts",
    География: "geography",
    Партнёры: "partners",
    Services: "services",
    About: "about",
    Values: "workflow",
    Careers: "contacts",
    Contacts: "contacts",
    Geography: "geography",
    Partners: "partners",
    Xizmatlar: "services",
    "Biz haqimizda": "about",
    Qadriyatlar: "workflow",
    "Bo'sh ish o'rinlari": "contacts",
    Kontaktlar: "contacts",
    Geografiya: "geography",
    Hamkorlar: "partners",
  };

  const handleScroll = (e, item) => {
    e.preventDefault();
    const id = scrollTargets[item];
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`relative z-[100] transition-all duration-300 ${
        isMobileMenuOpen
          ? "bg-[#17384e]/95 backdrop-blur-md border-b border-transparent"
          : "bg-transparent border-b border-white/20"
      }`}
    >
      <SectionInner className="flex items-center justify-between py-3">
        <div className="relative z-[101] flex-1">
          <img
            className="w-[80px] md:w-[90px] lg:w-[100px]"
            src="/header-logo.webp"
            alt="header-logo"
            width={200}
            height={60}
            fetchpriority="high"
            decoding="async"
          />
        </div>
        <nav
          className="hidden md:flex items-center justify-center shrink-0 gap-4 lg:gap-8 xl:gap-12 text-sm lg:text-base text-white font-medium"
          style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)" }}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={scrollTargets[item] ? `#${scrollTargets[item]}` : "#"}
              onClick={(e) => handleScroll(e, item)}
              className="hover:text-[#00A8CC] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="relative z-[101] flex-1 flex items-center justify-end gap-4 cursor-pointer">
          <Select defaultValue={locale} onValueChange={(val) => {
            if (val === locale) return;
            if (val === "ru") {
              window.location.href = "/";
            } else {
              window.location.href = `/${val}`;
            }
          }}>
            <SelectTrigger
              aria-label={languageLabel}
              className="w-fit px-3 h-10 cursor-pointer rounded-lg bg-transparent border border-slate-400 shadow-none focus:ring-0 md:border-0 md:text-xl font-heading text-white"
              style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              <SelectValue placeholder={languageLabel} />
            </SelectTrigger>
            <SelectContent
              alignItemWithTrigger={false}
              side="bottom"
              sideOffset={8}
              className="min-w-0 w-fit rounded-xl cursor-pointer border-slate-300 bg-white/50 backdrop-blur-md shadow-lg"
            >
              <SelectItem value="ru" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <ReactCountryFlag countryCode="RU" svg style={{ width: "1.2em", height: "1.2em", borderRadius: "2px" }} />
                  <span>{languages.ru || "RU"}</span>
                </div>
              </SelectItem>
              <SelectItem value="en" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <ReactCountryFlag countryCode="GB" svg style={{ width: "1.2em", height: "1.2em", borderRadius: "2px" }} />
                  <span>{languages.en || "EN"}</span>
                </div>
              </SelectItem>
              <SelectItem value="uz" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <ReactCountryFlag countryCode="UZ" svg style={{ width: "1.2em", height: "1.2em", borderRadius: "2px" }} />
                  <span>{languages.uz || "UZ"}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative flex cursor-pointer items-center justify-center w-10 h-10 text-2xl text-white hover:text-slate-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <FiMenu className={`absolute transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
              <FiX className={`absolute text-3xl transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} />
            </button>
          </div>

          <Button onClick={(e) => handleScroll(e, contactLabel)} className="hidden md:block px-4 lg:px-10 cursor-pointer h-[40px] lg:h-[45px] bg-[#00A8CC] hover:bg-[#008ba8] text-white rounded-none border-none text-sm lg:text-base">
            {contactLabel}
          </Button>
        </div>
      </SectionInner>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full md:hidden bg-[#17384e]/95 backdrop-blur-md border-b border-white/10 shadow-2xl z-[90] overflow-hidden"
            initial={shouldReduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-8 pt-6 flex flex-col items-center">
              <nav className="flex flex-col items-center gap-2 text-lg font-medium w-full">
                {mobileItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={scrollTargets[item] ? `#${scrollTargets[item]}` : "#"}
                    onClick={(e) => handleScroll(e, item)}
                    className="w-full text-center py-3 hover:bg-white/10 hover:text-white transition-all text-white/90"
                    initial={shouldReduce ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              <motion.div className="mt-6 pt-6 border-t border-white/10 flex flex-col items-center gap-4 text-white/80 w-full" initial={shouldReduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
                <a href={`tel:${contactPhone}`} className="flex items-center gap-3 hover:text-white hover:scale-105 transition-all w-fit">
                  <FiPhone className="text-xl text-[#00A8CC]" />
                  <span className="text-base tracking-wider">{contactPhone}</span>
                </a>
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 hover:text-white hover:scale-105 transition-all w-fit">
                  <FiMail className="text-xl text-[#00A8CC]" />
                  <span className="text-base tracking-wider">{contactEmail}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function TopNavBar({ locale = "ru", translations = {}, currentPath }) {
  return (
    <I18nProvider locale={locale} translations={translations}>
      <TopNavBarInner locale={locale} />
    </I18nProvider>
  );
}