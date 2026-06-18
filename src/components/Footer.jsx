export default function Footer() {
  return (
    <div className="lg:ml-[64px] lg:mr-[64px] mx-[20px] lg:flex lg:justify-between lg:mb-[88px] max-w-[1280px]">

      <div className="mb-[24px] lg:mb-0">
        <span className="text-[16px] font-normal tracking-normal align-middle text-[#001E40]">
          XPOTrans
        </span>
        <p className="hidden lg:block mt-[24px] text-[16px] font-normal tracking-normal align-middle text-[#43474F] max-w-[240px]">
          © 2026 XPOTrans. Precision in Motion. Все права защищены.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-y-[40px] gap-x-[10%] md:flex md:gap-[120px] lg:contents">

        <div>
          <p className="mb-[20px] text-[10px] font-normal leading-[15px] uppercase align-middle text-[#003366] lg:text-[16px] lg:text-[#001E40] lg:normal-case">Навигация</p>
          <a href="#services" className="block mb-[20px] text-[11px] font-normal leading-[16.5px] tracking-normal align-middle text-[#43474F] lg:text-[16px]">Services</a>
          <a href="#global-network" className="block mb-[20px] text-[11px] font-normal leading-[16.5px] tracking-normal align-middle text-[#43474F] lg:text-[16px]">Global Network</a>
          <a href="#site-map" className="block text-[11px] font-normal leading-[16.5px] tracking-normal align-middle text-[#43474F] lg:text-[16px]">Site Map</a>
        </div>

        <div>
          <p className="mb-[20px] text-[10px] font-normal leading-[15px] uppercase align-middle text-[#003366] lg:text-[16px] lg:text-[#001E40] lg:normal-case">Юридический блок</p>
          <a href="#privacy-policy" className="block mb-[20px] text-[11px] font-normal leading-[16.5px] tracking-normal align-middle text-[#43474F] lg:text-[16px]">Privacy Policy</a>
          <a href="#terms-of-service" className="block text-[11px] font-normal leading-[16.5px] tracking-normal align-middle text-[#43474F] lg:text-[16px]">Terms of Service</a>
        </div>

        <div>
          <p className="mb-[20px] text-[10px] font-normal leading-[15px] uppercase align-middle text-[#003366] lg:text-[16px] lg:text-[#001E40] lg:normal-case">Контакты</p>
          <a href="#linkedin" className="block mb-[20px] text-[11px] font-normal leading-[16.5px] tracking-normal align-middle text-[#43474F] lg:text-[16px]">LinkedIn</a>
          <a href="#contact-us" className="block text-[11px] font-normal leading-[16.5px] tracking-normal align-middle text-[#43474F] lg:text-[16px]">Contact Us</a>
        </div>

      </div>

      <div className="lg:hidden mt-[40px]">
        <p className="text-[10px] font-normal leading-[15px] uppercase align-middle text-[#43474F]/60 mb-[32px]">
          © 2026 XPOTrans. Precision in Motion.
        </p>
      </div>

    </div>
  );
}