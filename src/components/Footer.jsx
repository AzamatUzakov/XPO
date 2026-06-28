export default function Footer() {
  return (
    <footer className="bg-white text-[#0D0D0D]">
      <div className="mx-auto max-w-[1920px] px-[12px]  py-10  sm:py-12 ">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:flex-wrap lg:gap-y-10">

          {/* Logo */}
          <div className="">
            <img
              src="/header-logo.svg"
              alt="XPOTrans"
              className="h-[100px] w-auto  md:h-[110px] lg:h-[130px] xl:h-[150px]"
            />
          </div>

          {/* Навигация + Соцсети (рядом друг с другом на мобиле/планшете) */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 md:gap-x-16 lg:contents">

            {/* Навигация */}
            <nav aria-label="Навигация по сайту" className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[28px]">
              <a href="https://agl.uz/o-kompanii/" className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]">О компании</a>
              <a href="https://agl.uz/news/" className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]">Новости</a>
              <a href="https://agl.uz/project/" className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]">Проекты</a>
              <a href="https://agl.uz/nashi-partnery/" className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]">Партнеры</a>
              <a href="https://agl.uz/vakansii/" className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]">Вакансии</a>
              <a href="https://agl.uz/kontakty/" className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]">Контакты</a>
            </nav>

            {/* Соцсети */}
            <nav aria-label="Социальные сети" className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[28px]">
              <a
                href="https://www.instagram.com/agl.uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/share/1AasRMECCz/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]"
              >
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@ArrowGreenLogistics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]"
              >
                Youtube
              </a>
            </nav>

            {/* Контакты */}
            <div className="col-span-2 flex lg:col-span-1">
              <div className="mr-6 w-[2px] shrink-0 self-stretch bg-[#00a8cc] sm:mr-8 lg:mr-10" />

              <div className="flex flex-col gap-5 sm:gap-6 lg:gap-[24px]">
                <div>
                  <p className="mb-2 text-[12px] leading-none text-[#0D0D0D]/40 sm:text-[13px] lg:text-[14px]">Наш адрес</p>
                  <a
                    href="https://maps.google.com/maps?q=41.345498,69.364679&ll=41.345498,69.364679&z=16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block max-w-[260px] text-[15px] leading-[22px] text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:max-w-[280px] sm:text-[16px] sm:leading-[24px] lg:text-[18px] lg:leading-[27px]"
                  >
                    г. Ташкент, Мирзо-Улугбекский район, 2-й проезд Шуртепа, 14
                  </a>
                </div>

                <div>
                  <p className="mb-2 text-[12px] leading-none text-[#0D0D0D]/40 sm:text-[13px] lg:text-[14px]">Телефонный номер</p>
                  <a href="tel:+998555181900" className="text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]">
                    +998 55 518-19-00
                  </a>
                </div>

                <div>
                  <p className="mb-2 text-[12px] leading-none text-[#0D0D0D]/40 sm:text-[13px] lg:text-[14px]">Электронная почта</p>
                  <a href="mailto:info@agl.uz" className="block text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]">
                    info@agl.uz
                  </a>
                  <a href="mailto:sales@agl.uz" className="mt-2 block text-[15px] leading-none text-[#0D0D0D] hover:text-[#0D0D0D]/70 transition-colors sm:text-[16px] lg:text-[18px]">
                    sales@agl.uz
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-10 text-center sm:mt-12 lg:mt-[60px] lg:text-left">
          <p className="text-[12px] leading-none text-[#0D0D0D]/40 sm:text-[13px] lg:text-[14px]">2026 Все права защищены</p>
        </div>

      </div>
    </footer>
  );
}