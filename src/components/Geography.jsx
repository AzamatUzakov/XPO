import GlobeComponent from "./GlobeComponent";
import { Globe } from "@/components/ui/globe";
import AnimatedNumber from "./AnimatedNumber";
export default function Geography() {
  return (
    <section className="bg-[#f7f9ff] py-24 -mx-[12px] px-[12px]">
      <div className="md:grid md:grid-cols-2 md:items-center md:gap-8 max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl text-[#003366] font-normal">
            Глобальное присутствие{" "}
          </h2>
          <p className="text-[16px] text-[#43474F] mt-6">
            Мы расширяем границы возможного, открывая прямые
            трансконтинентальные коридоры в Северную Америку (США, Канада) и по
            всей Евразии.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-white p-6 shadow-sm ">
              <p className="flex flex-col">
                <span className="text-[#00A8CC] font-black text-[32px]">
                  <AnimatedNumber value={50} suffix="+" />
                </span>
                <span className="text-[12px] mt-1 text-[#43474F]">
                  Стран охвата
                </span>
              </p>
            </div>

            <div className="bg-white p-6 shadow-sm ">
              <p className="flex flex-col">
                <span className="text-[#00A8CC] font-black text-[32px]">
                  <AnimatedNumber value={1000} suffix="+" />
                </span>
                <span className="text-[12px] mt-1 text-[#43474F]">
                  Маршрутов
                </span>
              </p>
            </div>

            <div className="bg-white p-6 shadow-sm ">
              <p className="flex flex-col">
                <span className="text-[#00A8CC] font-black text-[32px]">
                  <AnimatedNumber value={24} suffix="/7" />
                </span>
                <span className="text-[12px] mt-1 text-[#43474F]">
                  Мониторинг
                </span>
              </p>
            </div>

            <div className="bg-white p-6 shadow-sm ">
              <p className="flex flex-col">
                <span className="text-[#00A8CC] font-black text-[32px]">
                  <AnimatedNumber value={15} />
                </span>
                <span className="text-[12px] mt-1 text-[#43474F]">Хабов</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-[300px] mt-8 md:h-[500px]">
          <Globe  />
        </div>
      </div>
    </section>
  );
}
