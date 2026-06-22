import { motion } from "motion/react";
import { useState, useEffect } from "react";

const PHRASES = [
  "НАДЁЖНАЯ ЛОГИСТИКА",
  "БЫСТРАЯ ДОСТАВКА",
  "УМНЫЙ СЕРВИС"
];

export default function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[index];
    let timeout;

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % PHRASES.length);
        timeout = setTimeout(() => {}, 500);
      } else {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
        }, 50); // Erasing speed
      }
    } else {
      if (text === currentPhrase) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500); // Pause before erasing
      } else {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, 100); // Typing speed
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <span className="text-[#00A8CC] inline-flex items-center min-h-[1.2em]">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[4px] h-[1em] bg-[#00A8CC] ml-1 rounded-[2px]"
      />
    </span>
  );
}
