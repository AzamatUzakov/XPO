export default function AboutUs() {
  return (
    <div className="w-[calc(100%+40px)] mx-[-20px] min-h-screen md:min-h-[100dvh] bg-[#001E40] text-white px-[12px] py-12 sm:py-16 md:py-0 flex flex-col md:flex-row md:justify-between md:items-center gap-10 md:gap-12">
      <div className="md:max-w-[50%]">
        <div>
          <p className="text-[26px] sm:text-[28px] md:text-[32px] leading-tight tracking-normal font-black uppercase text-white">
            О Компании
          </p>
          <p className="text-[26px] sm:text-[28px] md:text-[32px] leading-tight tracking-normal font-black uppercase text-[#00A8CC] mb-4">
            XPOTrans
          </p>
          <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] tracking-normal font-normal text-white mb-8">
            Мы являемся экспертами в области сложной международной логистики.
            Устраняем барьеры для бизнеса.
          </p>
        </div>

        <div className="flex items-start gap-4 border-l border-white/20 pl-[24px] mb-[24px]">
          <img src="/reliability.png" alt="reliability" className="shrink-0" />
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
          <img src="/individuality.png" alt="individuality" className="shrink-0" />
          <div className="space-y-1">
            <p className="text-[16px] leading-[24px] font-medium text-white">
              Индивидуальность
            </p>
            <p className="text-[11px] leading-[16.5px] tracking-normal font-normal text-white/70">
              Адаптируем processes под ваши требования.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 border-l border-white/20 pl-[24px]">
          <img src="/safety.png" alt="safety" className="shrink-0" />
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

      <div className="w-full md:max-w-[50%]">
        <div className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px]">
          <img
            src="/about-logo.png"
            alt="about-logo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#001E40]/40 pointer-events-none" />
          <div className="absolute left-0 bottom-0 md:-left-12 md:-bottom-10 bg-[#00A8CC] text-center w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] lg:w-[185px] lg:h-[185px] p-3 sm:p-4 flex flex-col justify-center items-center select-none">
            <p className="text-white text-[32px] sm:text-[40px] md:text-[50px] lg:text-[56px] font-black leading-none mb-1">
              12+
            </p>
            <p className="text-white text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-bold uppercase leading-tight tracking-tight px-1">
              Лет опыта на рынке
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}