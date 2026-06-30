import React, { useState, useEffect, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Truck, TrainFront, Plane, Share2 } from "lucide-react";
import { useI18n } from "./I18nProvider";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryNames: Record<string, string> = {
  "643": "Россия",
  "156": "Китай",
  "398": "Казахстан",
  "860": "Узбекистан",
  "417": "Кыргызстан",
  "762": "Таджикистан",
  "795": "Туркменистан",
  "112": "Беларусь",
  "031": "Азербайджан",
  "051": "Армения",
  "276": "Германия",
  "250": "Франция",
  "616": "Польша",
  "380": "Италия",
  "724": "Испания",
  "826": "Великобритания",
  "804": "Украина",
  "840": "США",
  "124": "Канада",
  "484": "Мексика",
  "076": "Бразилия",
  "036": "Австралия",
  "356": "Индия",
  "392": "Япония",
  "410": "Южная Корея",
  "784": "ОАЭ",
  "792": "Турция",
  "528": "Нидерланды",
};

const modes = [
  {
    key: "auto",
    label: "Авто",
    icon: Truck,
    countries: [
      "643",
      "398",
      "860",
      "417",
      "762",
      "795",
      "112",
      "031",
      "051",
      "804",
      "616",
      "276",
      "250",
      "380",
      "724",
    ],
  },
  {
    key: "rail",
    label: "Ж/Д",
    icon: TrainFront,
    countries: [
      "643",
      "156",
      "398",
      "860",
      "417",
      "762",
      "795",
      "112",
      "804",
      "616",
      "276",
    ],
  },
  {
    key: "air",
    label: "Авиа",
    icon: Plane,
    countries: [
      "643",
      "156",
      "826",
      "276",
      "250",
      "724",
      "380",
      "840",
      "784",
      "392",
      "410",
      "356",
      "076",
      "036",
    ],
  },
  {
    key: "multimodal",
    label: "Мультимодальные",
    icon: Share2,
    countries: [
      "643",
      "156",
      "398",
      "860",
      "417",
      "762",
      "795",
      "112",
      "031",
      "051",
      "804",
      "276",
      "250",
      "616",
      "380",
      "724",
      "826",
      "840",
      "124",
      "484",
      "784",
      "792",
      "528",
    ],
  },
];

function getMapConfig(width: number): {
  scale: number;
  rotate: [number, number, number];
  aspect: string;
  isMobile: boolean;
} {
  if (width < 480)
    return {
      scale: 480,
      rotate: [-65, -18, 0],
      aspect: "4 / 5",
      isMobile: true,
    };
  if (width < 640)
    return {
      scale: 540,
      rotate: [-65, -18, 0],
      aspect: "4 / 5",
      isMobile: true,
    };
  if (width < 768)
    return {
      scale: 420,
      rotate: [-40, -8, 0],
      aspect: "1 / 1",
      isMobile: true,
    };
  if (width < 1024)
    return {
      scale: 190,
      rotate: [-10, 0, 0],
      aspect: "1400 / 700",
      isMobile: false,
    };
  if (width < 1280)
    return {
      scale: 210,
      rotate: [-10, 0, 0],
      aspect: "1400 / 700",
      isMobile: false,
    };
  return {
    scale: 230,
    rotate: [-10, 0, 0],
    aspect: "1400 / 700",
    isMobile: false,
  };
}

export default function GeographyMap() {
  const { translations } = useI18n();
  const mapTranslations = translations.map || {};
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState(modes[0].key);
  const [config, setConfig] = useState(() =>
    getMapConfig(typeof window !== "undefined" ? window.innerWidth : 1400),
  );

  const translatedModeLabels = mapTranslations.modes || {
    auto: "Авто",
    rail: "Ж/Д",
    air: "Авиа",
    multimodal: "Мультимодальные",
  };

  const sectionTitle = mapTranslations.title ?? "География перевозок";
  const sectionDescription = mapTranslations.description ??
    "Осуществляем доставку в более чем 60 стран мира. Используем автотранспорт, авиа, железную дорогу и мультимодальные решения. Обеспечиваем точную логистику, оптимальные маршруты и контроль на всех этапах перевозки.";
  const tooltipUnknown = mapTranslations.tooltipUnknown ?? "Неизвестно";
  const translatedCountryNames = mapTranslations.countryNames || {};
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);

  useEffect(() => {
    function update() {
      const next = getMapConfig(window.innerWidth);
      setConfig(next);
      // Сброс зума при переходе на десктоп
      if (!next.isMobile) {
        setZoom(1);
        setCenter([0, 20]);
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const activeCountries = useMemo(() => {
    const current = modes.find((m) => m.key === activeMode);
    return new Set(current ? current.countries : []);
  }, [activeMode]);

  function handleGeoClick(name: string | undefined, countryId: string) {
    const displayName = translatedCountryNames[countryId] || countryNames[countryId] || name || tooltipUnknown;
    setTooltip((prev) => (prev === displayName ? null : displayName));
  }

  const mapContent = (
    <Geographies geography={geoUrl}>
      {({ geographies }) =>
        geographies.map((geo) => {
          const countryId = geo.id;
          const isTarget = activeCountries.has(countryId);
          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onClick={() => handleGeoClick(geo.properties.name, countryId)}
              onMouseEnter={() => {
                if (!config.isMobile) {
                  setTooltip(translatedCountryNames[countryId] || countryNames[countryId] || geo.properties.name);
                }
              }}
              onMouseLeave={() => {
                if (!config.isMobile) setTooltip(null);
              }}
              style={{
                default: {
                  fill: isTarget ? "#2DBE6C" : "#1a1a1a",
                  stroke: "#000000",
                  strokeWidth: 0.5,
                  outline: "none",
                  transition: "fill 0.3s ease",
                },
                hover: {
                  fill: isTarget ? "#4DD988" : "#252525",
                  stroke: "#000000",
                  strokeWidth: 0.5,
                  outline: "none",
                  cursor: "pointer",
                },
                pressed: {
                  fill: isTarget ? "#229c57" : "#2a2a2a",
                  outline: "none",
                },
              }}
            />
          );
        })
      }
    </Geographies>
  );

  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen bg-[#001E40] text-white overflow-hidden flex flex-col items-center py-12 sm:py-16 md:py-20">
      {/* Заголовок */}
      <div className="max-w-3xl px-4 text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5">
          {sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-white/70 leading-relaxed">
          {sectionDescription}
        </p>
      </div>

      {/* Переключатели режимов */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 mb-12 sm:mb-16">
        {modes.map(({ key, label, icon: Icon }) => {
          const isActive = key === activeMode;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveMode(key)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm sm:text-base font-medium border transition-colors duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-[#2DBE6C] border-[#2DBE6C] text-white"
                    : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                }`}
            >
              <Icon size={18} className="shrink-0" />
              {translatedModeLabels[key] ?? label}
            </button>
          );
        })}
      </div>

      <div
        className="relative w-full max-w-[1400px] cursor-pointer px-4 sm:px-6 md:px-12 overflow-hidden"
        style={{ aspectRatio: config.aspect }}
      >
        <ComposableMap
          projectionConfig={{ rotate: config.rotate, scale: config.scale }}
          style={{ width: "100%", height: "100%" }}
        >
          {config.isMobile ? (
            <ZoomableGroup
              zoom={zoom}
              center={center}
              minZoom={1}
              maxZoom={6}
              onMoveEnd={({ zoom: z, coordinates }) => {
                setZoom(z);
                setCenter(coordinates);
              }}
            >
              {mapContent}
            </ZoomableGroup>
          ) : (
            mapContent
          )}
        </ComposableMap>

        {/* Тултип */}
        {tooltip && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gray-300 text-slate-900 px-4 sm:px-5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold shadow-2xl border border-slate-200 pointer-events-none z-10 max-w-[80%] text-center">
            {tooltip}
          </div>
        )}
      </div>
    </section>
  );
}
