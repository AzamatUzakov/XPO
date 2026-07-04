import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SectionInner from './SectionInner';
import { fadeUp, defaultViewport } from '../lib/animations';
import { useI18n, I18nProvider } from './I18nProvider';

function AccordionItem({ item, isOpen, onToggle, index }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div className="border-b border-gray-200 last:border-b-0" initial={shouldReduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}>
      <button type="button" onClick={onToggle} className="w-full cursor-pointer py-6 flex items-center justify-between gap-4 text-left group">
        <span className="text-base md:text-lg font-semibold text-[#1B3A6B] group-hover:text-[#00A8CC] transition-colors duration-200">{item.question}</span>
        <ChevronDown size={20} className={`shrink-0 text-[#00A8CC] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
            <p className="pb-6 pr-8 text-sm md:text-[15px] leading-relaxed text-gray-600">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQSectionInner() {
  const { translations } = useI18n();
  const faqData = (translations.faq?.items || []).map((item, index) => ({ id: index + 1, ...item }));
  const [openId, setOpenId] = useState(faqData[0]?.id ?? 1);
  const shouldReduce = useReducedMotion();

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative w-full mt-20 md:mt-30 mb-20 md:mb-[120px]">
      <SectionInner>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[720px]">
            <motion.div className="mb-12 text-center" variants={fadeUp} initial={shouldReduce ? false : "hidden"} whileInView="visible" viewport={defaultViewport}>
              <span className="text-[#2BB3C0] font-bold uppercase tracking-widest text-sm block mb-1">{translations.faq?.eyebrow || 'Questions and answers'}</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1B3A6B]">{translations.faq?.title || 'Frequently asked questions'}</h2>
            </motion.div>

            <div className="w-full cursor-pointer">
              {faqData.map((item, index) => (
                <AccordionItem key={item.id} item={item} isOpen={openId === item.id} onToggle={() => handleToggle(item.id)} index={index} />
              ))}
            </div>
          </div>
        </div>
      </SectionInner>
    </section>
  );
}

export default function FAQSection({ locale = "ru", translations = {} }) {
  return (
    <I18nProvider locale={locale} translations={translations}>
      <FAQSectionInner />
    </I18nProvider>
  );
}