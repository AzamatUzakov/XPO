import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useI18n } from "./I18nProvider";

export default function TypewriterText() {
  const { translations } = useI18n();
  const phrases = translations.hero?.typewriter ?? [
    "НАДЁЖНАЯ ЛОГИСТИКА",
    "БЫСТРАЯ ДОСТАВКА",
    "УМНЫЙ СЕРВИС",
  ];

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];
    let timeout;

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
        timeout = setTimeout(() => {}, 500);
      } else {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
        }, 50);
      }
    } else {
      if (text === currentPhrase) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, phrases]);

  return (
    <span className="text-[#00A8CC] inline-block whitespace-nowrap">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[4px] h-[0.9em] bg-[#00A8CC] ml-1 rounded-[2px] align-baseline"
      />
    </span>
  );
}
