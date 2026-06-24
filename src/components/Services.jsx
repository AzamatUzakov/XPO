export default function Services() {
  return (
    <section className="rounded-lg mt-[80px]  pb-4 md:mt-[120px]  ">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl text-[#003366] font-normal">
          Логистические решения
        </h2>{" "}
        <p className="text-[#00A8CC] text-[12px] md:text-[16px]">
          Professional Services
        </p>
      </div>
      <hr className="border-t-2 mt-6 border-[#C3C6D1]" />

      <div className="mt-10 md:grid md:grid-cols-6 md:gap-4 lg:gap-6">
        <div className="relative w-full md:col-span-2 overflow-hidden group cursor-pointer shadow-md">
          <img
            className="w-full h-auto block transition-transform duration-700 md:group-hover:scale-105"
            src="/service-1.png"
            alt="Авиафрахт"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/90 via-black/20 to-transparent pointer-events-none"></div>

          <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 pb-5 md:pb-7 z-10 text-white">
            <h3 className="text-[18px] md:text-[20px] lg:text-[26px] font-normal">
              АВИАФРАХТ
            </h3>
            <div className="grid grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 transition-all duration-500">
              <div className="overflow-hidden">
                <p className="text-[14px] lg:text-[16px] text-white/80 font-normal pt-1">
                  <span className="md:hidden">
                    Срочная доставка по всему миру
                  </span>
                  <span className="hidden md:inline">
                    Экспресс-доставка по всему миру с приоритетной обработкой
                    грузов.
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* Анимированная полоса */}
          <div className="absolute bottom-0 left-0 h-[4px] bg-[#00A8CC] w-full md:w-0 transition-all duration-500 ease-out md:group-hover:w-full z-20"></div>
        </div>

        <div className="relative w-full mt-6 md:mt-0 md:col-span-2 overflow-hidden group cursor-pointer shadow-md">
          <img
            className="w-full h-auto block transition-transform duration-700 md:group-hover:scale-105"
            src="/service-2.png"
            alt="Ж/Д перевозки"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/90 via-black/20 to-transparent pointer-events-none"></div>

          <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 pb-5 md:pb-7 z-10 text-white">
            <h3 className="text-[18px] md:text-[20px] lg:text-[26px] font-normal">
              Ж/Д ПЕРЕВОЗКИ
            </h3>
            <div className="grid grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 transition-all duration-500">
              <div className="overflow-hidden">
                <p className="text-[14px] lg:text-[16px] text-white/80 font-normal pt-1">
                  <span className="md:hidden">
                    Надежные перевозки по СНГ и Европе
                  </span>
                  <span className="hidden md:inline">
                    Экономичные трансконтинентальные решения через Евразийские
                    коридоры.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-[4px] bg-[#00A8CC] w-full md:w-0 transition-all duration-500 ease-out md:group-hover:w-full z-20"></div>
        </div>

        <div className="relative w-full mt-6 md:mt-0 md:col-span-2 overflow-hidden group cursor-pointer shadow-md">
          <img
            className="w-full h-auto block transition-transform duration-700 md:group-hover:scale-105"
            src="/service-3.png"
            alt="Морской фрахт"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/90 via-black/20 to-transparent pointer-events-none"></div>

          <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 pb-5 md:pb-7 z-10 text-white">
            <h3 className="text-[18px] md:text-[20px] lg:text-[26px] font-normal">
              МОРСКОЙ ФРАХТ
            </h3>
            <div className="grid grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 transition-all duration-500">
              <div className="overflow-hidden">
                <p className="text-[14px] lg:text-[16px] text-white/80 font-normal pt-1">
                  <span className="md:hidden">
                    Экономичные контейнерные перевозки
                  </span>
                  <span className="hidden md:inline">
                    Прямые контракты с крупнейшими линиями (FCL/LCL) по всем
                    океанским путям.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-[4px] bg-[#00A8CC] w-full md:w-0 transition-all duration-500 ease-out md:group-hover:w-full z-20"></div>
        </div>

        <div className="relative w-full mt-6 md:mt-0 md:col-span-3 overflow-hidden group cursor-pointer shadow-md">
          <img
            className="w-full h-auto block transition-transform duration-700 md:group-hover:scale-105"
            src="/service-4.png"
            alt="СБОРНЫЕ ГРУЗЫ "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/90 via-black/20 to-transparent pointer-events-none"></div>

          <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 pb-5 md:pb-7 z-10 text-white">
            <h3 className="text-[18px] md:text-[20px] lg:text-[26px] font-normal">
              СБОРНЫЕ ГРУЗЫ (LCL)
            </h3>
            <div className="grid grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 transition-all duration-500">
              <div className="overflow-hidden">
                <p className="text-[14px] lg:text-[16px] text-white/80 font-normal pt-1">
                  <span className="md:hidden">
                    Оптимизация затрат для малых партий
                  </span>
                  <span className="hidden md:inline">
                    Оптимизация затрат для небольших партий товаров с регулярным
                    графиком отправок.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-[4px] bg-[#00A8CC] w-full md:w-0 transition-all duration-500 ease-out md:group-hover:w-full z-20"></div>
        </div>

        <div className="relative w-full mt-6 md:mt-0 md:col-span-3 overflow-hidden group cursor-pointer shadow-md">
          <img
            className="w-full h-auto block transition-transform duration-700 md:group-hover:scale-105"
            src="/service-5.png"
            alt="Негабаритные грузы  "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/90 via-black/20 to-transparent pointer-events-none"></div>

          <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 pb-5 md:pb-7 z-10 text-white">
            <h3 className="text-[18px] md:text-[20px] lg:text-[26px] font-normal">
              НЕГАБАРИТНЫЕ ГРУЗЫ
            </h3>
            <div className="grid grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 transition-all duration-500">
              <div className="overflow-hidden">
                <p className="text-[14px] lg:text-[16px] text-white/80 font-normal pt-1">
                  <span className="md:hidden">
                    Проектная логистика любой сложности
                  </span>
                  <span className="hidden md:inline">
                    Проектная логистика повышенной сложности для индустриальных
                    гигантов.
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-[4px] bg-[#00A8CC] w-full md:w-0 transition-all duration-500 ease-out md:group-hover:w-full z-20"></div>
        </div>
      </div>
    </section>
  );
}
