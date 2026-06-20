export default function ContactForm() {
  return (
    <div className="max-w-[1200px] mx-auto px-[24px] lg:px-[40px] lg:mb-[110px]">
      <div className="lg:grid lg:grid-cols-[1fr_500px] lg:gap-x-[72px] lg:items-center">

        <div className="hidden lg:block lg:order-1 lg:pr-[24px]">
          <p className="font-normal text-[12px] leading-[16px] tracking-[0.12em] uppercase text-[#003B73] mb-[16px]">
            Обратная связь
          </p>

          <div className="w-[48px] h-[3px] bg-[#001E40] mb-[24px]" />

          <p className="text-[40px] font-normal leading-[48px] uppercase text-[#001E40] mb-[20px] max-w-[480px]">
            Запросить расчет
          </p>

          <p className="font-normal text-[16px] leading-[26px] text-[#43474F] max-w-[440px] mb-[48px]">
            Получите детальное предложение и расчет стоимости перевозки в течение 2 часов.
          </p>

          <div className="h-px w-full bg-[#001E40]/10 mb-[40px]" />

          <div className="flex flex-col gap-[28px]">
            <div className="flex items-center gap-[16px]">
              <div className="flex items-center justify-center w-[44px] h-[44px] rounded-full bg-[#F7F9FF] shrink-0">
                <img src="/phone-icon.png" alt="phone-icon" />
              </div>
              <div>
                <p className="font-normal text-[10px] leading-[15px] uppercase text-[#003B73] mb-[2px]">
                  Телефон
                </p>
                <p className="font-bold text-[15px] leading-none text-[#003366]">
                  +998 71 000 00 00
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[16px]">
              <div className="flex items-center justify-center w-[44px] h-[44px] rounded-full bg-[#F7F9FF] shrink-0">
                <img src="/email-icon.png" alt="email-icon" />
              </div>
              <div>
                <p className="font-normal text-[10px] leading-[15px] uppercase text-[#003B73] mb-[2px]">
                  Email
                </p>
                <p className="font-bold text-[15px] leading-none text-[#003366]">
                  info@xpotrans.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:order-2">
          <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,30,64,0.15)] p-[40px] lg:p-[48px] w-full max-w-[500px] mb-[48px] lg:mb-0 mx-auto lg:mx-0 lg:sticky lg:top-[120px]">

            <div className="lg:hidden">
              <p className="text-[24px] font-normal leading-[36px] uppercase text-[#001E40] mb-[24px]">
                Запросить расчет
              </p>
              <p className="font-normal text-base leading-[26px] text-[#43474F]">
                Получите детальное предложение и расчет стоимости перевозки в течение 2 часов.
              </p>
            </div>

            <form className="mt-[40px] lg:mt-0 flex flex-col gap-[32px] mb-[25px]">
              {/* ВАШЕ ИМЯ */}
              <div>
                <label htmlFor="name" className="font-normal text-[10px] leading-[15px] uppercase text-[#003B73]">
                  Ваше имя
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Иван Иванов"
                  required
                  pattern="[A-Za-zА-ЯЁа-яё]+([\s-][A-Za-zА-ЯЁа-яё]+)+"
                  title="Введите имя и фамилию, только буквы"
                  className="w-full h-[46px] bg-[#F7F9FF] px-[16px] text-[14px] text-[#001E40] placeholder:text-[#9098A8] outline-none focus:ring-2 focus:ring-[#001E40]/20 transition"
                />
              </div>

              {/* ТЕЛЕФОН / TELEGRAM */}
              <div>
                <label htmlFor="phone" className="font-normal text-[10px] leading-[15px] uppercase text-[#003B73]">
                  Телефон / Telegram
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+998 (__) ___-_-__"
                  required
                  pattern="\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}"
                  title="Формат: +998 (XX) XXX-XX-XX"
                  className="w-full h-[46px] bg-[#F7F9FF] px-[16px] text-[14px] text-[#001E40] placeholder:text-[#9098A8] outline-none focus:ring-2 focus:ring-[#001E40]/20 transition"
                />
              </div>

              {/* ТИП УСЛУГИ */}
              <div>
                <label htmlFor="serviceType" className="font-normal text-[10px] leading-[15px] uppercase text-[#003B73]">
                  Тип услуги
                </label>
                <div className="relative">
                  <select
                    id="serviceType"
                    name="serviceType"
                    defaultValue="Авиафрахт"
                    className="w-full h-[46px] appearance-none bg-[#F7F9FF] px-[16px] pr-[48px] text-[14px] font-medium text-[#001D3D] outline-none focus:ring-2 focus:ring-[#001E40]/20 cursor-pointer transition"
                  >
                    <option value="Авиафрахт">Авиафрахт</option>
                    <option value="Морской фрахт">Морской фрахт</option>
                    <option value="Автомобильные перевозки">Автомобильные перевозки</option>
                    <option value="Железнодорожные перевозки">Железнодорожные перевозки</option>
                    <option value="Мультимодальные перевозки">Мультимодальные перевозки</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-[20px] top-1/2 -translate-y-1/2"
                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#001E40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* КНОПКА */}
              <button
                type="submit"
                className="flex items-center justify-center gap-[8px] w-full h-[52px] bg-[#001E40] text-white font-normal text-[12px] leading-[16px] tracking-[0.12em] uppercase hover:bg-[#00264D] transition">
                Получить расчет
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>

              <p className="text-center text-[9px] uppercase tracking-wide text-[#9098A8] leading-[18px]">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex items-center gap-[16px] mb-[24px]">
            <div><img src="/phone-icon.png" alt="phone-icon" /></div>
            <div><p className="font-bold text-[14px] leading-none text-[#003366]">+998 71 000 00 00</p></div>
          </div>

          <div className="flex items-center gap-[16px] mb-[80px]">
            <div><img src="/email-icon.png" alt="email-icon" /></div>
            <div><p className="font-bold text-[14px] leading-none text-[#003366]">info@xpotrans.com</p></div>
          </div>
        </div>

      </div>
    </div>
  );
}