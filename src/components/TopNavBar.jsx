import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiMenu, FiX, FiPhone, FiMail } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

import ReactCountryFlag from "react-country-flag";
import { Button } from "./ui/button";

export default function TopNavBar() {
  return (
    <header className="flex items-center justify-between bg-transparent py-3 px-2 border-b border-white/20">
      <div className="flex-1">
        <img
          className="w-[80px] md:w-[90px] lg:w-[100px]"
          src="../../public/header-logo.svg"
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
          География
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
          Партнеры
        </a>
      </nav>

      <div className="flex-1 flex items-center justify-end gap-4 cursor-pointer">
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
          <Sheet>
            <SheetTrigger className="flex cursor-pointer items-center justify-center w-10 h-10 text-2xl text-white hover:text-slate-100">
              <FiMenu />
            </SheetTrigger>
            <SheetContent
              side="top"
              showCloseButton={false}
              className="bg-[#17384e] text-white border-b-0 px-6 pt-6 pb-6"
            >
              <SheetTitle className="sr-only">Навигация</SheetTitle>
              <div className="flex items-center justify-between ">
                <img
                  className="w-[80px]"
                  src="../../public/header-logo.svg"
                  alt="header-logo"
                />
                <SheetClose className="flex items-center justify-center w-10 h-10 text-3xl text-white hover:text-slate-300 transition-colors">
                  <FiX className="cursor-pointer" />
                </SheetClose>
              </div>

              <nav className="mt-8 flex flex-col items-center gap-2 text-lg font-medium w-full">
                {["О нас", "Услуги", "География", "Ценности", "Партнеры"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="w-full text-center py-3 rounded-xl hover:bg-white/5 hover:text-white/80 transition-all"
                    >
                      {item}
                    </a>
                  ),
                )}
              </nav>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-white/70">
                <a
                  href="tel:+79991234567"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <FiPhone className="text-lg" />
                  <span className="text-sm tracking-wider">
                    +7 (999) 123-45-67
                  </span>
                </a>
                <a
                  href="mailto:info@logistic.com"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <FiMail className="text-lg" />
                  <span className="text-sm tracking-wider">
                    info@logistic.com
                  </span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Button className="hidden md:block px-4 lg:px-10 cursor-pointer h-[40px] lg:h-[45px] bg-[#00A8CC] hover:bg-[#008ba8] text-white rounded-none border-none text-sm lg:text-base">
          Контакты
        </Button>
      </div>
    </header>
  );
}
