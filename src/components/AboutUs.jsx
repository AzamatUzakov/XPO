export default function AboutUs() {
  return (
    <div className="w-[calc(100%+40px)] mx-[-20px] bg-[#001E40] text-white px-5 py-[80px] md:flex md:justify-between md:items-center md:gap-12">

      <div className="md:max-w-[50%]">
        <div>
          <p className="text-[32px] leading-[40px] tracking-normal font-black uppercase text-[#FFFFFF]">
            О Компании
          </p>
          <p className="text-[32px] leading-[40px] tracking-normal font-black uppercase text-[#00A8CC] mb-4">
            XPOTrans
          </p>
          <p className="text-[16px] leading-[26px] tracking-normal font-normal text-[#FFFFFF] mb-8">
            Мы являемся экспертами в области сложной международной логистики.
            Устраняем барьеры для бизнеса.
          </p>
        </div>

        <div className="flex items-start gap-4 border-l border-white/20 pl-[24px] mb-[24px]">
          <img src="/reliability.png" alt="safity" className="shrink-0" />

          <div className="space-y-1">
            <p className="text-[16px] leading-[24px] font-medium text-white">
              Надежность
            </p>
            <p className="text-[11px] leading-[16.5px] tracking-normal font-normal text-white/70">
              Гарантируем исполнение в любых условиях.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 border-l border-white/20 pl-[24px] mb-[24px]">
          <img src="/individuality.png" alt="safity" className="shrink-0" />

          <div className="space-y-1">
            <p className="text-[16px] leading-[24px] font-medium text-white">
              Индивидуальность
            </p>
            <p className="text-[11px] leading-[16.5px] tracking-normal font-normal text-white/70">
              Адаптируем процессы под ваши требования.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 border-l border-white/20 pl-[24px] mb-[48px] md:mb-0">
          <img src="/safety.png" alt="safity" className="shrink-0" />

          <div className="space-y-1">
            <p className="text-[16px] leading-[24px] font-medium text-white">
              Безопасность
            </p>
            <p className="text-[11px] leading-[16.5px] tracking-normal font-normal text-white/70">
              Высшие стандарты защиты грузов.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:max-w-[50%] px-5 md:px-0">
        <div className="md:hidden">
          <img src="/mobile-about-logo.png" alt="about-logo" className="w-full" />
        </div>

        <div className="hidden md:block">
          <img src="/pc-about-logo.png" alt="pc-about-logo" className="w-full" />
        </div>
      </div>
    </div>
  );
}