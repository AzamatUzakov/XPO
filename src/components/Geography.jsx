import { Globe } from "@/components/ui/globe";
import AnimatedNumber from "./AnimatedNumber";
import { useI18n } from "./I18nProvider";
import SectionInner from "./SectionInner";

export default function Geography() {
  const { translations } = useI18n();
  const geography = translations.geography || {};
  const stats = geography.stats || {};

  return (
    <section className="bg-[#f7f9ff] mt-[80px] md:mt-[120px] py-24">
      <SectionInner>
        <div className="flex flex-col md:grid md:grid-cols-2 md:items-center gap-10 md:gap-8 max-w-7xl mx-auto">
          <div>
            <h2 className="text-2xl text-[#003366] font-normal">
              {geography.title ?? "Глобальное присутствие"}
            </h2>
            <p className="text-[16px] text-[#43474F] mt-6">
              {geography.description ??
                "Мы расширяем границы возможного, открывая прямые трансконтинентальные коридоры в Северную Америку (США, Канада) и по всей Евразии."}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-white p-6 shadow-sm ">
                <p className="flex flex-col">
                  <span className="text-[#00A8CC] font-black text-[32px]">
                    <AnimatedNumber value={50} suffix="+" />
                  </span>
                  <span className="text-[12px] mt-1 text-[#43474F]">
                    {stats.countries ?? "Стран охвата"}
                  </span>
                </p>
              </div>

              <div className="bg-white p-6 shadow-sm ">
                <p className="flex flex-col">
                  <span className="text-[#00A8CC] font-black text-[32px]">
                    <AnimatedNumber value={1000} suffix="+" />
                  </span>
                  <span className="text-[12px] mt-1 text-[#43474F]">
                    {stats.routes ?? "Маршрутов"}
                  </span>
                </p>
              </div>

              <div className="bg-white p-6 shadow-sm ">
                <p className="flex flex-col">
                  <span className="text-[#00A8CC] font-black text-[32px]">
                    <AnimatedNumber value={24} suffix="/7" />
                  </span>
                  <span className="text-[12px] mt-1 text-[#43474F]">
                    {stats.monitoring ?? "Мониторинг"}
                  </span>
                </p>
              </div>

              <div className="bg-white p-6 shadow-sm ">
                <p className="flex flex-col">
                  <span className="text-[#00A8CC] font-black text-[32px]">
                    <AnimatedNumber value={15} />
                  </span>
                  <span className="text-[12px] mt-1 text-[#43474F]">
                    {stats.hubs ?? "Хабов"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-square max-w-[400px] md:max-w-[500px] mx-auto">
            <Globe />
          </div>
        </div>
      </SectionInner>
    </section>
  );
}
