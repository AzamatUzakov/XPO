import { useMemo, useState, useRef } from "react";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { motion, useInView } from "framer-motion";
import { useI18n } from "./I18nProvider";
import SectionInner from "./SectionInner";
import { withI18n } from "./I18nProvider";

const NAME_RE = /^[A-Za-zА-ЯЁа-яёÀ-ÿ]+([\s-][A-Za-zА-ЯЁа-яёÀ-ÿ]+)+$/;
const defaultServiceOptions = [
  "Авиафрахт",
  "Морской фрахт",
  "Автомобильные перевозки",
  "Железнодорожные перевозки",
  "Мультимодальные перевозки",
];
const defaultContacts = [
  { icon: "/phone-icon.png", alt: "phone-icon", label: "Телефон", value: "+998 95 233 83 27", rounded: "rounded" },
  { icon: "/email-icon.png", alt: "email-icon", label: "Email", value: "xpotrans_group@mail.ru", rounded: "rounded-full" },
];

function ContactForm() {
  const { translations } = useI18n();
  const contact = translations.contact || {};
  const serviceOptions = useMemo(
    () => (contact.serviceOptions?.length ? contact.serviceOptions : defaultServiceOptions),
    [contact.serviceOptions]
  );
  const contacts = useMemo(() => contact.contactInfo || defaultContacts, [contact.contactInfo]);

  const [form, setForm] = useState({ name: "", phone: "", serviceType: serviceOptions[0] ?? defaultServiceOptions[0] });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const leftRef = useRef(null);
  const formRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-60px 0px" });
  const formInView = useInView(formRef, { once: true, margin: "-60px 0px" });

  function handlePhoneChange(e) {
    const value = e.target.value.replace(/[^\d+\s()-]/g, "");
    setForm((f) => ({ ...f, phone: value }));
  }

  function handleNameChange(e) {
    const value = e.target.value.replace(/[^A-Za-zА-ЯЁа-яёÀ-ÿ\s-]/g, "");
    setForm((f) => ({ ...f, name: value }));
  }

  function validate() {
    const e = {};
    const validation = contact.validation || {};
    if (!NAME_RE.test(form.name.trim())) e.name = validation.name ?? "Введите имя и фамилию";
    const phone = form.phone.trim();
    if (!phone.startsWith("+")) {
      e.phone = validation.phonePrefix ?? "Укажите номер с кодом страны, например +998...";
    } else if (!isValidPhoneNumber(phone)) {
      e.phone = validation.phoneInvalid ?? "Введите корректный номер телефона";
    }
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setStatus("submitting");
    setServerError("");
    const parsed = parsePhoneNumber(form.phone.trim());
    const normalizedPhone = parsed.number;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), phone: normalizedPhone, serviceType: form.serviceType }),
      });
      const data = await res.json();
      if (!res.ok) {
        const serverMessage = data.errorCode
          ? {
              invalid_json: contact.validation?.serverError,
              invalid_name: contact.validation?.name,
              invalid_phone_prefix: contact.validation?.phonePrefix,
              invalid_phone: contact.validation?.phoneInvalid,
              invalid_service_type: contact.validation?.serverError,
              telegram_not_configured: contact.validation?.serverError,
              telegram_api_error: contact.validation?.serverError,
            }[data.errorCode]
          : null;
        setServerError(
          serverMessage || data.error || (contact.validation?.serverError ?? "Произошла ошибка, попробуйте позже")
        );
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", phone: "", serviceType: serviceOptions[0] ?? defaultServiceOptions[0] });
    } catch {
      setServerError(contact.validation?.networkError ?? "Нет соединения с сервером");
      setStatus("error");
    }
  }



  return (
    <div id="contacts">
      <SectionInner>
      <div className="w-full flex justify-center lg:mb-[110px]">
        <div className="w-full max-w-[1040px] lg:flex lg:justify-between lg:items-center lg:gap-[60px]">

          {/* Левая колонка (десктоп) */}
          <div ref={leftRef} className="hidden lg:flex flex-col lg:order-1 lg:flex-1">
            <motion.p
              className="font-normal text-[12px] leading-[16px] tracking-[0.12em] uppercase text-[#003B73] mb-[16px]"
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {contact.feedbackLabel ?? "Обратная связь"}
            </motion.p>

            <motion.div
              className="w-[48px] h-[3px] bg-[#001E40] mb-[24px]"
              initial={{ scaleX: 0, originX: 0 }}
              animate={leftInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              style={{ transformOrigin: "left" }}
            />

            <motion.p
              className="text-[40px] font-normal leading-[48px] uppercase text-[#001E40] mb-[20px] max-w-[480px]"
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
            >
              {contact.formTitle ?? "Запросить расчет"}
            </motion.p>

            <motion.p
              className="font-normal text-[16px] leading-[26px] text-[#43474F] max-w-[440px] mb-[48px]"
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.22 }}
            >
              {contact.formSubtitle ?? "Получите детальное предложение и расчет стоимости перевозки в течение 2 часов."}
            </motion.p>

            <motion.div
              className="h-px w-full max-w-[440px] bg-[#001E40]/10 mb-[40px]"
              initial={{ scaleX: 0 }}
              animate={leftInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.28 }}
              style={{ transformOrigin: "left" }}
            />

            <div className="flex flex-col gap-[28px]">
              {contacts.map((c, i) => (
                <motion.div
                  key={c.alt}
                  className="flex items-center gap-[16px]"
                  initial={{ opacity: 0, x: -16 }}
                  animate={leftInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 + i * 0.1 }}
                >
                  <div className={`flex items-center justify-center w-[44px] h-[44px] ${c.rounded} bg-[#F4F7FC] shrink-0`}>
                    <img src={c.icon} alt={c.alt} />
                  </div>
                  <div>
                    <p className="font-normal text-[10px] leading-[15px] uppercase text-[#003B73] mb-[2px]">{c.label}</p>
                    <p className="font-bold text-[15px] leading-none text-[#003366]">{c.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Форма */}
          <motion.div
            ref={formRef}
            className="lg:order-2 w-full shrink-0 lg:w-[480px]"
            initial={{ opacity: 0, y: 32 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <div className="bg-[#F4F7FC] shadow-xl p-[16px] sm:p-[24px] lg:p-[48px] w-full max-w-[500px] mb-[48px] lg:mb-0 mx-auto lg:mx-0 lg:sticky lg:top-[120px]">
              <div className="lg:hidden mb-[16px]">
                <p className="text-[20px] font-medium leading-[26px] uppercase text-[#001E40] mb-[8px]">
                  {contact.formTitle ?? "Запросить расчет"}
                </p>
                <p className="font-normal text-[14px] leading-[21px] text-[#43474F]">
                  {contact.formSubtitle ?? "Получите детальное предложение и расчет стоимости перевозки в течение 2 часов."}
                </p>
              </div>

              {status === "success" ? (
                <motion.div
                  className="mt-[16px] lg:mt-0 text-center py-[24px]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="text-[17px] lg:text-[18px] font-medium text-[#001E40] mb-[8px]">
                    {contact.successTitle ?? "Заявка отправлена!"}
                  </p>
                  <p className="text-[14px] text-[#43474F]">
                    {contact.successMessage ?? "Наш специалист свяжется с вами в течение 2 часов."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-[12px] lg:mt-0 flex flex-col gap-[14px] lg:gap-[32px] mb-[8px] lg:mb-[25px]" noValidate>
                  <div className="flex flex-col gap-[6px] lg:gap-[0px]">
                    <label htmlFor="name" className="font-medium text-[12px] lg:text-[10px] leading-[16px] lg:leading-[15px] uppercase text-[#003B73]">
                      {contact.nameLabel ?? "Ваше имя"}
                    </label>
                    <input
                      id="name" name="name" type="text" placeholder={contact.namePlaceholder ?? "Иван Иванов"}
                      value={form.name} onChange={handleNameChange} maxLength={60} aria-invalid={!!errors.name}
                      className={`w-full h-[46px] lg:h-[46px] bg-white border border-[#E2E8F0] px-[16px] text-[15px] lg:text-[14px] text-[#001E40] placeholder:text-[#9098A8] outline-none focus:ring-2 transition rounded-xl lg:rounded-xl ${errors.name ? "ring-2 ring-red-400" : "focus:ring-[#001E40]/20"}`}
                    />
                    {errors.name && <p className="text-red-500 text-[12px] lg:text-[11px] mt-[3px]">{errors.name}</p>}
                  </div>

                  <div className="flex flex-col gap-[6px] lg:gap-[0px]">
                    <label htmlFor="phone" className="font-medium text-[12px] lg:text-[10px] leading-[16px] lg:leading-[15px] uppercase text-[#003B73]">
                      {contact.phoneLabel ?? "Телефон / Telegram"}
                    </label>
                    <input
                      id="phone" name="phone" type="tel" inputMode="tel" placeholder={contact.phonePlaceholder ?? "+998 90 123 45 67"}
                      value={form.phone} onChange={handlePhoneChange} maxLength={20} aria-invalid={!!errors.phone}
                      className={`w-full h-[46px] lg:h-[46px] bg-white border border-[#E2E8F0] px-[16px] text-[15px] lg:text-[14px] text-[#001E40] placeholder:text-[#9098A8] outline-none focus:ring-2 transition rounded-xl lg:rounded-xl ${errors.phone ? "ring-2 ring-red-400" : "focus:ring-[#001E40]/20"}`}
                    />
                    {errors.phone && <p className="text-red-500 text-[12px] lg:text-[11px] mt-[3px]">{errors.phone}</p>}
                  </div>

                  <div className="flex flex-col gap-[6px] lg:gap-[0px]">
                    <label htmlFor="serviceType" className="font-medium text-[12px] lg:text-[10px] leading-[16px] lg:leading-[15px] uppercase text-[#003B73]">
                      {contact.serviceTypeLabel ?? "Тип услуги"}
                    </label>
                    <div className="relative">
                      <select
                        id="serviceType" name="serviceType" value={form.serviceType}
                        onChange={(e) => setForm((f) => ({ ...f, serviceType: e.target.value }))}
                        className="w-full h-[46px] lg:h-[46px] appearance-none bg-white border border-[#E2E8F0] px-[16px] pr-[48px] text-[15px] lg:text-[14px] font-medium text-[#001D3D] outline-none focus:ring-2 focus:ring-[#001E40]/20 cursor-pointer transition rounded-xl lg:rounded-xl"
                      >
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <svg className="pointer-events-none absolute right-[20px] top-1/2 -translate-y-1/2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#001E40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  {serverError && <p className="text-red-500 text-[13px] lg:text-[12px] text-center">{serverError}</p>}

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ backgroundColor: "#00264D" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center gap-[8px] w-full h-[48px] lg:h-[52px] bg-[#001E40] text-white font-medium text-[15px] lg:font-normal lg:text-[12px] leading-[20px] lg:leading-[16px] lg:tracking-[0.12em] uppercase disabled:opacity-60 disabled:cursor-not-allowed rounded-xl lg:rounded-xl mt-[8px] lg:mt-[8px]"
                  >
                    {status === "submitting" ? contact.submitting ?? "Отправка..." : contact.submitButton ?? "Получить расчет"}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </motion.button>

                  <p className="text-center text-[11px] lg:text-[9px] uppercase tracking-wide text-[#9098A8] leading-[16px] lg:leading-[14px]">
                    {contact.disclaimer ?? "Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности"}
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Контакты мобилка */}
          <div className="lg:hidden flex flex-col gap-[20px]">
            {contacts.map((c, i) => (
              <motion.div
                key={c.alt}
                className={`flex items-center gap-[12px] ${i === 1 ? "mb-[80px]" : ""}`}
                initial={{ opacity: 0, x: -16 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + i * 0.1 }}
              >
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-xl bg-[#F4F7FC] shrink-0">
                  <img src={c.icon} alt={c.alt} className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <p className="font-medium text-[11px] text-[#003B73] mb-[2px]">{c.label}</p>
                  <p className="font-bold text-[15px] leading-none text-[#003366]">{c.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </SectionInner>
    </div>
  );
}

export default withI18n(ContactForm);