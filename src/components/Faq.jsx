import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionInner from './SectionInner';

const faqData = [
  {
    id: 1,
    question: "Как рассчитывается стоимость перевозки?",
    answer: "Стоимость зависит от вида транспорта, веса и объёма груза, маршрута, срочности и условий поставки (Incoterms). Мы готовим индивидуальный расчёт с учётом всех затрат: доставка, таможенное оформление, страхование — без скрытых платежей."
  },
  {
    id: 2,
    question: "Сколько времени занимает доставка груза?",
    answer: "Сроки зависят от вида перевозки: авиафрахт — от 18 до 48 часов, автоперевозки — 5–12 дней, ж/д перевозки — 14–25 дней, морской фрахт — от 25 до 40 дней. Точный срок указываем в коммерческом предложении после расчёта маршрута."
  },
  {
    id: 3,
    question: "Какие документы нужны для оформления груза?",
    answer: "Базовый пакет включает инвойс, упаковочный лист, контракт (при внешнеэкономической сделке) и транспортные документы (CMR, AWB, коносамент — в зависимости от вида перевозки). Для отдельных категорий товаров могут потребоваться сертификаты соответствия. Помогаем подготовить полный пакет документов."
  },
  {
    id: 4,
    question: "Занимаетесь ли вы таможенным оформлением?",
    answer: "Да, полное таможенное оформление входит в наши услуги: декларирование груза, расчёт и уплата пошлин и налогов, взаимодействие с таможенными органами на всех этапах перевозки."
  },
  {
    id: 5,
    question: "Можно ли отследить груз в пути?",
    answer: "Да, по каждой перевозке предоставляем регулярные статус-отчёты и доступ к отслеживанию на основных этапах: погрузка, транзит, прибытие, таможенная очистка и доставка получателю."
  },
  {
    id: 6,
    question: "Страхуете ли вы грузы?",
    answer: "Да, предлагаем страхование груза на всех видах перевозок. Стоимость страхования рассчитывается индивидуально исходя из объявленной ценности и характера груза."
  },
  {
    id: 7,
    question: "Есть ли минимальный объём груза для перевозки?",
    answer: "Минимального объёма нет — работаем как с полными контейнерными и авиа-отправками (FCL/FTL), так и со сборными грузами (LCL/LTL) для небольших партий."
  },
  {
    id: 8,
    question: "Какие способы оплаты вы принимаете?",
    answer: "Оплата возможна по безналичному расчёту для юридических лиц, а также по индивидуальным условиям для постоянных клиентов, включая частичную предоплату и оплату по факту доставки."
  }
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between gap-4 text-left group"
      >
        <span className="text-base md:text-lg font-semibold text-[#1B3A6B] group-hover:text-[#00A8CC] transition-colors duration-200">
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#00A8CC] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-8 text-sm md:text-[15px] leading-relaxed text-gray-600">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState(faqData[0].id);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full mt-8 md:mt-16 mb-20 md:mb-[120px]">
      <SectionInner>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[720px]">
            <div className="mb-12 text-center">
              <span className="text-[#2BB3C0] font-bold uppercase tracking-widest text-sm block mb-1">
                Вопросы и ответы
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1B3A6B]">
                Часто задаваемые вопросы
              </h2>
            </div>

            <div className="w-full">
              {faqData.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionInner>
    </section>
  );
}