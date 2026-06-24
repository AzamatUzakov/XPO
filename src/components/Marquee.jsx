const LOGOS = [
  { src: '/orion.svg', alt: 'Orion' },
  { src: '/agromir.png', alt: 'Agromir' },
  { src: '/smz.svg', alt: 'SMZ' },
  { src: '/uzairways.svg', alt: 'Uzbekistan Airways' },
  { src: '/samauto.png', alt: 'SamAuto' },
  { src: '/sag-gilamlar.png', alt: 'SAG Gilamlar' },
];

export default function LogoMarquee() {
  const doubledLogos = [...LOGOS, ...LOGOS];

  return (
    <div>
      <div className="mb-[52px] sm:mb-[50px] md:mb-[49px] lg:mb-[48px] xl:mb-[48px] 2xl:mb-[48px]">
        <p className="
          /* Мобилки (базовый) */
          text-[9px] leading-[13.5px] tracking-[0.09em] font-normal uppercase text-[#4A505E] 
          
          /* sm (640px) */
          sm:text-[11px] sm:tracking-[0.12em] 
          
          /* md (768px) */
          md:text-[13px] md:tracking-[0.15em] 
          
          /* lg (1024px) - твой настроенный */
          lg:text-[16px] lg:leading-normal lg:tracking-[0.2em] lg:text-[#43474F] 
          
          /* xl (1280px) */
          xl:text-[16px] xl:tracking-[0.2em] 
          
          /* 2xl (1536px) */
          2xl:text-[16px] 2xl:tracking-[0.2em]
        ">
          Стратегические партнеры
        </p>
      </div>

      <div className="w-[calc(100%+40px)] mx-[-20px] overflow-hidden bg-[#F7F9FF] select-none mb-[164px]">
        <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-custom-marquee {
          animation: marquee 35s linear infinite;
        }
        `}</style>

        <div className="flex w-full overflow-hidden whitespace-nowrap">
          <div className="flex animate-custom-marquee items-center shrink-0 space-x-16 pr-16">
            {doubledLogos.map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="w-[140px] h-12 flex items-center justify-center shrink-0"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>

          <div className="flex animate-custom-marquee items-center shrink-0 space-x-16 pr-16" aria-hidden="true">
            {doubledLogos.map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="w-[140px] h-12 flex items-center justify-center shrink-0"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}