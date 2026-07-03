import { motion, useReducedMotion } from "framer-motion";
import SectionInner from "./SectionInner";
import { useI18n } from "./I18nProvider";
import { simpleFade, defaultViewport } from "../lib/animations";

export default function Footer() {
  const { translations } = useI18n();
  const shouldReduce = useReducedMotion();

  const handleScroll = (e, item) => {
    e.preventDefault();
    const map = {
      "О компании": "about",
      Проекты: "projects",
      Партнеры: "partners",
      Вакансии: "contacts",
      Контакты: "contacts",
      "Ответы на вопросы ": "faq",
      "Ответы на вопросы": "faq",
      "Карта перевозок": "geography",
    };
    const id = map[item];
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };
  const footer = translations.footer || {};
  const navItems = footer.nav || [
    "О компании",
    "Проекты",
    "Партнеры",
    "Вакансии",
    "Контакты",
  ];
  const socials = footer.socials || ["Instagram", "Facebook", "Youtube"];
  const addressLabel = footer.addressLabel ?? "Наш адрес";
  const phoneLabel = footer.phoneLabel ?? "Телефонный номер";
  const emailLabel = footer.emailLabel ?? "Электронная почта";
  const address =
    footer.address ?? "г. Самарканд, Самаркандская область, улица Гагарина, 36";
  const phone = footer.phone ?? "+998 95 233-83-27";
  const email = footer.email ?? "xpotrans_group@mail.ru";
  const copyright = footer.copyright ?? "2026 Все права защищены";

  return (
    <motion.footer
      className="bg-white text-[#0D0D0D] mt-10"
      variants={simpleFade}
      initial={shouldReduce ? false : "hidden"}
      whileInView="visible"
      viewport={defaultViewport}
    >
      <SectionInner className="mx-auto max-w-[1920px] py-10 sm:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:flex-wrap lg:gap-y-10">
          {/* Logo */}
          <div className="">
            <img
              src="/header-logo.svg"
              alt="XPOTrans"
              className="h-[100px] ml-[-14px] w-auto  md:h-[110px] lg:h-[130px] xl:h-[150px]"
            />
          </div>

          {/* Навигация + Соцсети (рядом друг с другом на мобиле/планшете) */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 md:gap-x-16 lg:contents">
            {/* Навигация */}
            <nav
              aria-label="Навигация по сайту"
              className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[28px]"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleScroll(e, item)}
                  className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Соцсети */}
            <nav
              aria-label="Социальные сети"
              className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[28px]"
            >
              {socials.map((social) => (
                <a
                  key={social}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]"
                >
                  {social}
                </a>
              ))}
            </nav>

            {/* Контакты */}
            <div className="col-span-2 flex lg:col-span-1">
              <div className="mr-6 w-[2px] shrink-0 self-stretch bg-[#00a8cc] sm:mr-8 lg:mr-10" />

              <div className="flex flex-col gap-5 sm:gap-6 lg:gap-[24px]">
                <div>
                  <p className="mb-2 text-[12px] leading-none text-[#0D0D0D]/40 sm:text-[13px] lg:text-[14px]">
                    {addressLabel}
                  </p>
                  <a
                    href="https://maps.app.goo.gl/98xCDDPKY5ncLqcWA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block max-w-[260px] text-[15px] leading-[22px] text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:max-w-[280px] sm:text-[16px] sm:leading-[24px] lg:text-[18px] lg:leading-[27px]"
                  >
                    {address}
                  </a>
                </div>

                <div>
                  <p className="mb-2 text-[12px] leading-none text-[#0D0D0D]/40 sm:text-[13px] lg:text-[14px]">
                    {phoneLabel}
                  </p>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]"
                  >
                    {phone}
                  </a>
                </div>

                <div>
                  <p className="mb-2 text-[12px] leading-none text-[#0D0D0D]/40 sm:text-[13px] lg:text-[14px]">
                    {emailLabel}
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="block text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center sm:mt-12 lg:mt-[60px] lg:text-left">
          <p className="text-[12px] leading-none text-[#0D0D0D]/40 sm:text-[13px] lg:text-[14px]">
            {copyright}
          </p>
        </div>
      </SectionInner>
    </motion.footer>
  );
}
