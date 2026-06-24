import GlobeComponent from "./GlobeComponent";

import React, { useState, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const activeNumericIds = {
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
  "804": "Украина"
};

// Настройки проекции по брейкпоинтам.
// На мобилке мы не показываем весь мир (он становится нечитаемой точкой),
// а зумим и сдвигаем поворот так, чтобы в кадре оставалась Евразия —
// именно там сосредоточены все активные страны.
function getMapConfig(width) {
  if (width < 480) {
    return { scale: 480, rotate: [-65, -18, 0], aspect: "4 / 5" };
  }
  if (width < 640) {
    return { scale: 540, rotate: [-65, -18, 0], aspect: "4 / 5" };
  }
  if (width < 768) {
    return { scale: 420, rotate: [-40, -8, 0], aspect: "1 / 1" };
  }
  if (width < 1024) {
    return { scale: 190, rotate: [-10, 0, 0], aspect: "1400 / 700" };
  }
  if (width < 1280) {
    return { scale: 210, rotate: [-10, 0, 0], aspect: "1400 / 700" };
  }
  return { scale: 230, rotate: [-10, 0, 0], aspect: "1400 / 700" };
}

export default function GeographyMap() {
  const [tooltip, setTooltip] = useState(null);
  const [config, setConfig] = useState(() =>
    getMapConfig(typeof window !== "undefined" ? window.innerWidth : 1400)
  );

  useEffect(() => {
    function update() {
      setConfig(getMapConfig(window.innerWidth));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center py-12 sm:py-16 md:py-0 md:min-h-[100dvh]">
      <div
        className="relative w-full max-w-[1400px] px-4 sm:px-6 md:px-12 flex items-center justify-center"
        style={{ aspectRatio: config.aspect }}
      >
        <ComposableMap
          width={1400}
          height={700}
          projectionConfig={{
            rotate: config.rotate,
            scale: config.scale
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryId = geo.id;
                const displayName = activeNumericIds[countryId];
                const isTarget = Boolean(displayName);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() =>
                      setTooltip(displayName || geo.properties.name)
                    }
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        fill: isTarget ? "#004d5e" : "#1a1a1a",
                        stroke: "#000000",
                        strokeWidth: 0.6,
                        outline: "none",
                        transition: "fill 0.2s ease"
                      },
                      hover: {
                        fill: isTarget ? "#00A8CC" : "#252525",
                        stroke: "#000000",
                        strokeWidth: 0.6,
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: {
                        fill: "#007a94",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {tooltip && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gray-300 text-slate-900 px-4 sm:px-5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold shadow-2xl border border-slate-200 pointer-events-none transition-all z-10 max-w-[80%] text-center">
            {tooltip}
          </div>
        )}
      </div>
    </section>
  );
}