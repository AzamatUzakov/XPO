import { RiTelegram2Fill } from "react-icons/ri";
import { Button } from "./ui/button";
import { TbRouteSquare } from "react-icons/tb";
import TypewriterText from "./TypewriterText";

export default function HeroSection() {
  return (
    <section className="px-3 mt-[60px]">
      <div>
        <h1 className=" font-black">
          <span className="text-white text-4xl md:text-[44px] lg:text-[64px]">
            ГЛОБАЛЬНАЯ
          </span>{" "}
          <br />
          <span className="text-2xl md:text-[44px] lg:text-[64px]">
            <TypewriterText />
          </span>
        </h1>

        <div className="mt-6 border-l-[3px] border-[#00A8CC] pl-4">
          <p className="text-[16px] text-white font-normal leading-[26px]">
            <span className="md:hidden">
              Статус премиального оператора полного цикла. Мы обеспечиваем
              бесперебойные цепочки поставок для мировых лидеров.
            </span>
            <span className="hidden md:block max-w-[70%] lg:max-w-[50%]">
              Статус премиального оператора полного цикла. Мы обеспечиваем
              бесперебойные цепочки поставок для мировых лидеров индустрии,
              объединяя континенты с точностью часового механизма.
            </span>
          </p>
        </div>

        <div className="mb-[40px] flex flex-col w-full mt-9 md:flex-row md:items-stretch gap-3 md:gap-4">
          <Button className="w-full md:w-auto py-7 cursor-pointer border border-[#00A8CC] rounded-none text-[13px] bg-[#00A8CC] hover:bg-[#008ba8] hover:border-[#008ba8] transition-colors md:h-[66px] md:px-[40px] flex items-center justify-center">
            <RiTelegram2Fill className="mr-2 text-xl" />
            Связаться в Telegram
          </Button>
          <Button className="w-full md:w-auto py-7 bg-transparent cursor-pointer border border-white rounded-none text-[13px] hover:bg-white/10 transition-colors md:h-[66px] flex items-center md:px-[40px] justify-center">
            <TbRouteSquare className="mr-2 text-xl" /> Наши Маршруты
          </Button>
        </div>
      </div>
    </section>
  );
}
