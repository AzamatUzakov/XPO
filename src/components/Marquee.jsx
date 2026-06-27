const LOGOS = [
  { src: "/orion.svg", alt: "Orion" },
  { src: "/agromir.png", alt: "Agromir" },
  { src: "/smz.svg", alt: "SMZ" },
  { src: "/uzairways.jpg", alt: "Uzbekistan Airways" },
  { src: "/samauto.png", alt: "SamAuto" },
  { src: "/sag-gilamlar.png", alt: "SAG Gilamlar" },
];

export default function LogoMarquee() {
  const doubledLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="mt-[64px] md:mt-[96px]">
      <div className="mb-[52px] sm:mb-[50px] md:mb-[49px] lg:mb-[48px] xl:mb-[48px] 2xl:mb-[48px]">
        <h2 className="text-2xl text-[#003366] font-normal">
          Стратегические партнеры
        </h2>
      </div>

      <div className="w-[calc(100%+40px)] mx-[-20px] overflow-hidden select-none mb-[164px]">
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

          <div
            className="flex animate-custom-marquee items-center shrink-0 space-x-16 pr-16"
            aria-hidden="true"
          >
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
    </section>
  );
}
