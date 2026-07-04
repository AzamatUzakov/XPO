import { useState, useEffect, useRef } from "react";
import { Box, FileText, Bell } from "lucide-react";
import { motion } from "framer-motion";
import SectionInner from "./SectionInner";

export default function CrmPromo() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [honeypot, setHoneypot] = useState("");
  const startedAtRef = useRef(Date.now());

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          website: honeypot,
          startedAt: startedAtRef.current,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setStatus("success");
      setPhone("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <SectionInner>
      <section className="w-full my-12 md:my-16">
        <div className="max-w-7xl mx-auto rounded-2xl md:rounded-[2rem] grid lg:grid-cols-2 border border-border/50 overflow-hidden">
          <div className="w-full bg-[#f4f7fc] p-6 sm:p-10 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-[#00a8cc]/10 text-[#00a8cc] text-xs font-bold uppercase tracking-widest"
            >
              В разработке
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#003366] font-normal mb-4 leading-tight"
            >
              Отслеживайте свой груз в реальном времени
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl leading-relaxed"
            >
              Личный кабинет клиента: статус груза онлайн, документы, история
              отправок и мгновенные уведомления в одном месте.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-10"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00a8cc]/10 flex items-center justify-center text-[#00a8cc]">
                  <Box className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground text-sm md:text-base leading-tight">
                  Трекинг груза
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00a8cc]/10 flex items-center justify-center text-[#00a8cc]">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground text-sm md:text-base leading-tight">
                  Документы онлайн
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00a8cc]/10 flex items-center justify-center text-[#00a8cc]">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground text-sm md:text-base leading-tight">
                  Уведомления
                </span>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {/* Honeypot — скрыт от людей, виден ботам-парсерам */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="relative flex-1 max-w-md">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ваш телефон"
                  pattern="^[+]?[0-9\s\-()]{7,20}$"
                  className="w-full h-12 md:h-14 px-5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00a8cc]/50 transition-all"
                  disabled={status === "success" || status === "loading"}
                />
              </div>
              <button
                type="submit"
                disabled={status === "success" || status === "loading"}
                className="h-12 md:h-14 px-8 rounded-xl bg-[#00a8cc] text-white font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center min-w-[220px]"
              >
                {status === "loading"
                  ? "Отправка..."
                  : status === "success"
                    ? "Заявка принята!"
                    : "Ранний доступ"}
              </button>
            </motion.form>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm font-medium text-[#00a8cc] flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Спасибо! Мы сообщим вам первыми о запуске.
              </motion.p>
            )}

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm font-medium text-red-500"
              >
                Не удалось отправить заявку. Попробуйте ещё раз.
              </motion.p>
            )}
          </div>

          {/* Mockup Image */}
          <div className="hidden lg:flex w-full h-full bg-[#003366] p-6 sm:p-10 md:p-12 lg:p-16 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, rotateY: 10, x: 20 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-2xl border border-border/60 shadow-2xl shadow-black/5 overflow-hidden relative flex items-center justify-center max-w-full max-h-full"
            >
              <img
                src="/CRM-1.webp"
                alt="Интерфейс CRM"
                className="max-w-full max-h-full w-auto h-auto object-contain"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </SectionInner>
  );
}