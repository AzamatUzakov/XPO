import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Boxes,
  Truck,
  FileText,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionInner from "./SectionInner";

const projectsData = [
  {
    id: 1,
    idTag: "XP-8829",
    type: "Авиафрахт",
    route: "Пекин — Ташкент",
    cargo: "Электроника",
    img: "https://images.pexels.com/photos/32856535/pexels-photo-32856535.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: [
      { label: "Тоннаж", value: "14.5 т", icon: <Boxes size={14} /> },
      { label: "Срок", value: "36 часов", icon: <Calendar size={14} /> },
      { label: "Транспорт", value: "Boeing 747-F", icon: <Truck size={14} /> },
    ],
    gallery: [
      {
        src: "https://images.pexels.com/photos/29358895/pexels-photo-29358895.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Погрузка в Пекине",
      },
      {
        src: "https://images.pexels.com/photos/32069273/pexels-photo-32069273.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Таможенный склад",
      },
      {
        src: "https://images.pexels.com/photos/20179536/pexels-photo-20179536.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Накладные Air Waybill",
      },
      {
        src: "https://images.pexels.com/photos/1056528/pexels-photo-1056528.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Разгрузка Ташкент",
      },
    ],
  },
  {
    id: 2,
    idTag: "XP-5401",
    type: "Ж/Д Перевозка",
    route: "Шанхай — Варшава",
    cargo: "Автозапчасти",
    img: "https://images.pexels.com/photos/12196578/pexels-photo-12196578.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: [
      { label: "Состав", value: "42 вагона", icon: <LayoutGrid size={14} /> },
      { label: "Срок", value: "18 дней", icon: <Calendar size={14} /> },
      { label: "Тоннаж", value: "840 тонн", icon: <Boxes size={14} /> },
    ],
    gallery: [
      {
        src: "https://images.pexels.com/photos/13876842/pexels-photo-13876842.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Формирование состава",
      },
      {
        src: "https://images.pexels.com/photos/14776383/pexels-photo-14776383.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Пломбировка ТС",
      },
      {
        src: "https://images.pexels.com/photos/30858911/pexels-photo-30858911.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Транзит Казахстан",
      },
      {
        src: "https://images.pexels.com/photos/8584622/pexels-photo-8584622.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Документы СМГС",
      },
    ],
  },
  {
    id: 3,
    idTag: "XP-9932",
    type: "Морской фрахт",
    route: "Нинбо — Санкт-Петербург",
    cargo: "Сборный (LCL)",
    img: "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: [
      {
        label: "Контейнеры",
        value: "12 × 40ft",
        icon: <LayoutGrid size={14} />,
      },
      { label: "Статус", value: "Выполнено", icon: <FileText size={14} /> },
      { label: "Срок", value: "32 дня", icon: <Calendar size={14} /> },
    ],
    gallery: [
      {
        src: "https://images.pexels.com/photos/28438334/pexels-photo-28438334.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Погрузка судна",
      },
      {
        src: "https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Портовый терминал",
      },
      {
        src: "https://images.pexels.com/photos/16699137/pexels-photo-16699137.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Коносамент B/L",
      },
      {
        src: "https://images.pexels.com/photos/3075996/pexels-photo-3075996.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Склад расформирования",
      },
    ],
  },
  {
    id: 4,
    idTag: "XP-6215",
    type: "Автоперевозка",
    route: "Стамбул — Ташкент",
    cargo: "Текстиль",
    img: "https://images.pexels.com/photos/13520550/pexels-photo-13520550.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: [
      { label: "Фуры", value: "6 × Тент", icon: <LayoutGrid size={14} /> },
      { label: "Срок", value: "9 дней", icon: <Calendar size={14} /> },
      { label: "Тоннаж", value: "132 т", icon: <Boxes size={14} /> },
    ],
    gallery: [
      {
        src: "https://images.pexels.com/photos/13008065/pexels-photo-13008065.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Загрузка на складе",
      },
      {
        src: "https://images.pexels.com/photos/5410923/pexels-photo-5410923.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Пограничный пост",
      },
      {
        src: "https://images.pexels.com/photos/11087837/pexels-photo-11087837.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "CMR накладная",
      },
      {
        src: "https://images.pexels.com/photos/13008064/pexels-photo-13008064.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Выгрузка Ташкент",
      },
    ],
  },
  {
    id: 5,
    idTag: "XP-7740",
    type: "Мультимодальная",
    route: "Гуанчжоу — Алматы",
    cargo: "Бытовая техника",
    img: "https://images.pexels.com/photos/3075996/pexels-photo-3075996.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: [
      {
        label: "Контейнеры",
        value: "8 × 20ft",
        icon: <LayoutGrid size={14} />,
      },
      { label: "Срок", value: "24 дня", icon: <Calendar size={14} /> },
      { label: "Транспорт", value: "Море + Ж/Д", icon: <Truck size={14} /> },
    ],
    gallery: [
      {
        src: "https://images.pexels.com/photos/16699137/pexels-photo-16699137.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Порт отгрузки",
      },
      {
        src: "https://images.pexels.com/photos/14023350/pexels-photo-14023350.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Перевалка на ж/д",
      },
      {
        src: "https://images.pexels.com/photos/8584622/pexels-photo-8584622.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Сертификат соответствия",
      },
      {
        src: "https://images.pexels.com/photos/12196579/pexels-photo-12196579.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Финальная доставка",
      },
    ],
  },
  {
    id: 6,
    idTag: "XP-3387",
    type: "Авиафрахт",
    route: "Дубай — Самарканд",
    cargo: "Фарм. продукция",
    img: "https://images.pexels.com/photos/31968365/pexels-photo-31968365.jpeg?auto=compress&cs=tinysrgb&w=800",
    specs: [
      { label: "Тоннаж", value: "3.2 т", icon: <Boxes size={14} /> },
      { label: "Срок", value: "18 часов", icon: <Calendar size={14} /> },
      { label: "Режим", value: "Temp-control", icon: <FileText size={14} /> },
    ],
    gallery: [
      {
        src: "https://images.pexels.com/photos/17772547/pexels-photo-17772547.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Термоконтейнеры",
      },
      {
        src: "https://images.pexels.com/photos/18459049/pexels-photo-18459049.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Погрузка на борт",
      },
      {
        src: "https://images.pexels.com/photos/12916439/pexels-photo-12916439.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Разрешение Минздрава",
      },
      {
        src: "https://images.pexels.com/photos/2258646/pexels-photo-2258646.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Приёмка на складе",
      },
    ],
  },
];

export default function ExperienceMegaBlock() {
  const [expandedCard, setExpandedCard] = useState(null);
  const scrollRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrowState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrowState();
    el.addEventListener("scroll", updateArrowState, { passive: true });
    window.addEventListener("resize", updateArrowState);
    return () => {
      el.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
    };
  }, []);

  const scrollByCard = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      // На мобилке — по одной карточке за клик
      const firstCard = container.firstElementChild;
      if (!firstCard) return;

      const gap = 16; // gap-4 = 16px на мобилке
      const amount =
        (firstCard.getBoundingClientRect().width + gap) * direction;

      container.scrollBy({ left: amount, behavior: "smooth" });
    } else {
      // На десктопе — сразу в конец/начало
      const target = direction > 0 ? container.scrollWidth : 0;
      container.scrollTo({ left: target, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="relative w-full mt-8 md:mt-16 mb-20 md:mb-[120px]">
      <SectionInner>
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#2BB3C0] font-bold uppercase tracking-widest text-sm block mb-1">
              Галерея и проекты
            </span>
            <h2 className="text-2xl text-[#003366] font-normal">
Наш опыт в деталях
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Предыдущий слайд"
              className="p-3 border cursor-pointer border-gray-200 bg-white hover:bg-gray-50 transition-all rounded-sm shadow-sm active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              <ArrowRight className="rotate-180  text-[#1B3A6B]" size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Следующий слайд"
              className="p-3 border cursor-pointer border-gray-200 bg-white hover:bg-gray-50 transition-all rounded-sm shadow-sm active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              <ArrowRight className="text-[#1B3A6B] cursor-pointer" size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex items-start gap-4 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projectsData.map((project) => {
            const isExpanded = expandedCard === project.id;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-sm flex flex-col shrink-0 snap-start w-[78vw] xs:w-[75vw] sm:w-[360px] md:w-[380px]"
              >
                <div className="relative h-64 overflow-hidden pointer-events-none">
                  <img
                    src={project.img}
                    alt={project.type}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#2BB3C0] text-white text-xs font-normal uppercase tracking-wide">
                    {project.type}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                          {project.route}
                        </h3>
                        <p className="text-xl font-semibold text-[#1B3A6B]">
                          {project.cargo}
                        </p>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono bg-gray-50 px-2 py-0.5 border border-gray-100 rounded-sm">
                        {project.idTag}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-100 py-4 my-4">
                      {project.specs.map((spec, i) => (
                        <div key={i} className="space-y-1">
                          <div className="text-[10px] uppercase text-gray-500 flex items-center gap-1">
                            {spec.icon} <span>{spec.label}</span>
                          </div>
                          <p className="font-semibold text-xs text-[#1B3A6B] truncate">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedCard(isExpanded ? null : project.id)
                      }
                      className="w-full cursor-pointer py-2.5 px-4 bg-[#00A8CC] text-white hover:bg-[#008ba8] font-bold text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {isExpanded
                        ? "Скрыть медиагалерею"
                        : "Показать документы и фото"}
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-5 border-t border-gray-100 mt-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">
                              Фотоотчет и документы рейса:
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {project.gallery.map((media, index) => (
                                <div
                                  key={index}
                                  className="group/item relative h-24 bg-gray-100 overflow-hidden rounded-sm border border-gray-200"
                                >
                                  <img
                                    src={media.src}
                                    alt={media.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-[#1B3A6B]/80 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 p-2 flex items-end">
                                    <span className="text-[9px] font-bold text-white uppercase tracking-tighter leading-tight">
                                      {media.title}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionInner>
    </section>
  );
}