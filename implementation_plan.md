# План оптимизации производительности — galactic-graham

## Контекст

Сайт построен на Astro + React (SSR/server output), хостинг Vercel. Вся страница рендерится через единый `<App client:load>` — это означает, что весь React-бандл (включая Framer Motion, Lenis, react-simple-maps, cobe-globe, @google/genai и др.) загружается и гидратируется **сразу при загрузке**, блокируя интерактивность.

---

## Статус выполнения

| # | Проблема | Файл / компонент | Влияние | Статус |
|---|----------|-----------------|---------| -------|
| 1 | 8 изображений сервисов — PNG по **2–2.5 МБ** каждый; итого ~18 МБ | `Services.jsx` | 🔴 Критично — LCP | ✅ **DONE** — WebP используются, `loading`, `decoding`, `width/height` добавлены |
| 2 | `about-logo.png` — **2 МБ** PNG | `AboutUs.jsx` | 🔴 Критично — LCP | ✅ **DONE** — `about-logo.webp` используется, теги обновлены |
| 3 | `hero_video.mp4` — **6.66 МБ**, нет `preload="none"`, нет `poster` | `App.jsx` / `MainPage.astro` | 🔴 Критично — LCP, TTI | ✅ **DONE** — `preload="none"`, `poster` и `playsinline` заданы |
| 4 | `CRM-1.png` — **1.1 МБ** | `CrmPromo.jsx` | 🟠 Высокое | ✅ **DONE** — `CRM-1.webp` используется |
| 5 | `header-logo.svg` — **195 КБ** (раздутый SVG) | `public/header-logo.svg` | 🟠 Высокое | ✅ **DONE** — используется `header-logo.webp` |
| 6 | **Внешний fetch** GeoJSON карты при каждом рендере | `GeographyMap.tsx` | 🟠 Высокое | ✅ **DONE** — файл локализован в `/data/countries-110m.json` |
| 7 | **Дублирующиеся пакеты**: `framer-motion` + `motion` | `package.json` | 🟡 Среднее | ✅ **DONE** — лишний пакет убран |
| 8 | Preload критичного шрифта Geist Variable | `Layout.astro` | 🟡 Среднее | ✅ **DONE** — добавлены preload-теги |
| 9 | `font-display: swap` не задан | `global.css` | 🟡 Среднее | ✅ **DONE** — добавлен `font-display: swap` |
| 10 | `lenis/dist/lenis.css` импортируется in App.jsx | `App.jsx` | 🟡 Среднее | ✅ **DONE** — стили вынесены в глобальный CSS |
| 11 | **Весь React-бандл** гидратируется через `client:load` | `pages/index.astro` | 🔴 Критично — TBT, TTI | ✅ **DONE** — переведено на Astro острова и `client:visible` |
| 12 | `output: "server"` при отсутствии SSR-логики на главных страницах | `astro.config.mjs` | 🟡 Среднее | ✅ **DONE** — переведено на `output: static` |
| 13 | Изображения в **Marquee** без `loading="lazy"` | `Marquee.jsx` | 🟢 Низкое | ✅ **DONE** — `loading="lazy"` и WebP используются |
| 14 | `@vercel/speed-insights` — проверить async | `Layout.astro` | 🟢 Низкое | ✅ **DONE** — интегрирован асинхронно |
| 15 | Изображения без явных `width`/`height` — CLS | `Services.jsx`, `AboutUs.jsx` | 🟠 Высокое — CLS | ✅ **DONE** — атрибуты добавлены |
| 16 | А11y: язык/скрытый input/контраст CTA | `TopNavBar.jsx`, `CrmPromo.jsx`, `HeroSection.jsx` | 🟠 Среднее | ✅ **DONE** — добавлены `aria-label`, скрытый label и более контрастные цвета |
| 17 | Анимация `ripple` с `box-shadow` | `AI_Chat.jsx` | 🟠 Среднее | ✅ **DONE** — анимация переведена на `transform`/`opacity` |

---

## Итог

План в основном выполнен: основные узкие места по медиа, гидратации и CLS закрыты. После внесённых правок сборка проекта сохраняет работоспособность.
