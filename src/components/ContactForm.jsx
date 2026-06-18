export default function ContactForm() {
  return (
    <div className="bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,30,64,0.15)] p-[40px] max-w-[500px]">
      <p className="text-[24px] font-normal leading-[36px] tracking-normal align-middle uppercase text-[#001E40] mb-[24px]">
        Запросить расчет
      </p>
      <p className="text-[16px] font-normal leading-[26px] tracking-normal align-middle text-[#43474F]">
        Получите детальное предложение и расчет стоимости перевозки в течение 2 часов.
      </p>

      <form className="mt-[40px] flex flex-col gap-[32px]">
        {/* ВАШЕ ИМЯ */}
        <div>
          <label htmlFor="name" className="block mb-[12px] text-[12px] font-medium uppercase tracking-[0.08em] text-[#001E40]">
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
            className="w-full bg-[#F4F6FB] rounded-[12px] px-[20px] py-[16px] text-[18px] text-[#001E40] placeholder:text-[#9098A8] outline-none focus:ring-2 focus:ring-[#001E40]/20 transition"
          />
        </div>

        {/* ТЕЛЕФОН / TELEGRAM */}
        <div>
          <label htmlFor="phone" className="block mb-[12px] text-[12px] font-medium uppercase tracking-[0.08em] text-[#001E40]">
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
            className="w-full bg-[#F4F6FB] rounded-[12px] px-[20px] py-[16px] text-[18px] text-[#001E40] placeholder:text-[#9098A8] outline-none focus:ring-2 focus:ring-[#001E40]/20 transition"
          />
        </div>

        {/* ТИП УСЛУГИ */}
        <div>
          <label htmlFor="serviceType" className="block mb-[12px] text-[12px] font-medium uppercase tracking-[0.08em] text-[#001E40]">
            Тип услуги
          </label>
          <div className="relative">
            <select
              id="serviceType"
              name="serviceType"
              defaultValue="Авиафрахт"
              className="w-full appearance-none bg-[#F4F6FB] rounded-[12px] px-[20px] py-[16px] pr-[48px] text-[18px] font-medium text-[#001E40] outline-none focus:ring-2 focus:ring-[#001E40]/20 cursor-pointer transition"
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
          className="w-full bg-[#001E40] text-white uppercase tracking-[0.12em] text-[15px] font-medium py-[18px] rounded-[12px] flex items-center justify-center gap-[10px] hover:bg-[#00264D] transition"
        >
          Получить расчет
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        <p className="text-center text-[12px] uppercase tracking-wide text-[#9098A8] leading-[18px]">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </form>
    </div>
  );
}