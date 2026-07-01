import React, { useState } from "react";
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

export default function TopNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            src="/header-logo.svg"
            alt="header-logo"
          />
        </div>
        <nav
          className="hidden md:flex items-center justify-center shrink-0 gap-4 lg:gap-8 xl:gap-12 text-sm lg:text-base text-white font-medium"
          style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)" }}
        >
          <a
            href="#"
            className="hover:text-[#00A8CC] transition-colors duration-300"
          >
            Услуги
          </a>
         
          <a
            href="#"
            className="hover:text-[#00A8CC] transition-colors duration-300"
          >
            О нас
          </a>
          <a
            href="#"
            className="hover:text-[#00A8CC] transition-colors duration-300"
          >
            Ценности
          </a>
        
          <a
            href="#"
            className="hover:text-[#00A8CC] transition-colors duration-300"
          >
            Вакансии
          </a>
          <a
            href="#"
            className="hover:text-[#00A8CC] transition-colors duration-300"
          >
            FAQ
          </a>
        </nav>

        <div className="relative z-[101] flex-1 flex items-center justify-end gap-4 cursor-pointer">
          <Select defaultValue="ru">
            <SelectTrigger
              className="w-fit px-3 h-10 cursor-pointer rounded-lg bg-transparent border border-slate-400 shadow-none focus:ring-0 md:border-0 md:text-xl font-heading text-white"
              style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              <SelectValue placeholder="Язык" />
            </SelectTrigger>
            <SelectContent
              alignItemWithTrigger={false}
              side="bottom"
              sideOffset={8}
              className="min-w-0 w-fit rounded-xl cursor-pointer border-slate-300 bg-white/50 backdrop-blur-md shadow-lg"
            >
              <SelectItem value="ru" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode="RU"
                    svg
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                      borderRadius: "2px",
                    }}
                  />
                  <span>RU</span>
                </div>
              </SelectItem>
              <SelectItem value="en" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode="GB"
                    svg
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                      borderRadius: "2px",
                    }}
                  />
                  <span>EN</span>
                </div>
              </SelectItem>
              <SelectItem value="uz" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode="UZ"
                    svg
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                      borderRadius: "2px",
                    }}
                  />
                  <span>UZ</span>
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
              <FiMenu
                className={`absolute transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? "opacity-0 rotate-90 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <FiX
                className={`absolute text-3xl transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </button>
          </div>

          <Button className="hidden md:block px-4 lg:px-10 cursor-pointer h-[40px] lg:h-[45px] bg-[#00A8CC] hover:bg-[#008ba8] text-white rounded-none border-none text-sm lg:text-base">
            Контакты
          </Button>
        </div>
      </SectionInner>

      {/* Выезжающая шторка мобильного меню */}
      <div
        className={`absolute top-full left-0 w-full md:hidden bg-[#17384e]/95 backdrop-blur-md border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out z-[90] ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          display: "grid",
          gridTemplateRows: isMobileMenuOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-8 pt-6 flex flex-col items-center">
            <nav className="flex flex-col items-center gap-2 text-lg font-medium w-full">
              {["О нас", "Услуги", "География", "Ценности", "Партнеры"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="w-full text-center py-3 hover:bg-white/10 hover:text-white transition-all text-white/90"
                  >
                    {item}
                  </a>
                ),
              )}
            </nav>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col items-center gap-4 text-white/80 w-full">
              <a
                href="tel:+79991234567"
                className="flex items-center gap-3 hover:text-white hover:scale-105 transition-all w-fit"
              >
                <FiPhone className="text-xl text-[#00A8CC]" />
                <span className="text-base tracking-wider">
                  +7 (999) 123-45-67
                </span>
              </a>
              <a
                href="mailto:info@logistic.com"
                className="flex items-center gap-3 hover:text-white hover:scale-105 transition-all w-fit"
              >
                <FiMail className="text-xl text-[#00A8CC]" />
                <span className="text-base tracking-wider">
                  info@logistic.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
