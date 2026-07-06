import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 8000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [0 / 255, 168 / 255, 204 / 255],
  glowColor: [0.8, 0.9, 0.95],      // намного слабее
  markers: [
    // СНГ
    { location: [41.2995, 69.2401], size: 0.07 }, // Ташкент
    { location: [55.7558, 37.6173], size: 0.08 }, // Москва
    { location: [59.9343, 30.3351], size: 0.06 }, // Санкт-Петербург
    { location: [51.1801, 71.4460], size: 0.06 }, // Астана
    { location: [43.2220, 76.8512], size: 0.05 }, // Алматы
    { location: [42.8777, 74.5938], size: 0.05 }, // Бишкек
    { location: [37.9601, 58.3261], size: 0.05 }, // Ашхабад
    { location: [38.5598, 68.7738], size: 0.05 }, // Душанбе
    { location: [40.4093, 49.8671], size: 0.06 }, // Баку
    { location: [41.7151, 44.8271], size: 0.05 }, // Тбилиси
    { location: [40.1792, 44.4991], size: 0.05 }, // Ереван
    { location: [53.9045, 27.5615], size: 0.06 }, // Минск
    { location: [50.4501, 30.5234], size: 0.07 }, // Киев
    { location: [56.8796, 53.2039], size: 0.05 }, // Ижевск
    { location: [43.1155, 131.8855], size: 0.05 }, // Владивосток

    // Европа
    { location: [51.5074, -0.1278], size: 0.07 },  // Лондон
    { location: [48.8566, 2.3522], size: 0.07 },   // Париж
    { location: [52.5200, 13.4050], size: 0.07 },  // Берлин
    { location: [41.9028, 12.4964], size: 0.06 },  // Рим
    { location: [40.4168, -3.7038], size: 0.06 },  // Мадрид
    { location: [52.3676, 4.9041], size: 0.06 },   // Амстердам
    { location: [50.0755, 14.4378], size: 0.05 },  // Прага
    { location: [48.2082, 16.3738], size: 0.05 },  // Вена
    { location: [47.3769, 8.5417], size: 0.05 },   // Цюрих
    { location: [59.3293, 18.0686], size: 0.05 },  // Стокгольм
    { location: [55.6761, 12.5683], size: 0.05 },  // Копенгаген
    { location: [60.1699, 24.9384], size: 0.05 },  // Хельсинки
    { location: [52.2297, 21.0122], size: 0.05 },  // Варшава
    { location: [47.4979, 19.0402], size: 0.05 },  // Будапешт
    { location: [44.8176, 20.4569], size: 0.05 },  // Белград
    { location: [41.0082, 28.9784], size: 0.06 },  // Стамбул

    // Америка
    { location: [40.7128, -74.0060], size: 0.08 },  // Нью-Йорк
    { location: [34.0522, -118.2437], size: 0.07 }, // Лос-Анджелес
    { location: [41.8781, -87.6298], size: 0.06 },  // Чикаго
    { location: [29.7604, -95.3698], size: 0.06 },  // Хьюстон
    { location: [33.4484, -112.0740], size: 0.05 }, // Феникс
    { location: [47.6062, -122.3321], size: 0.06 }, // Сиэтл
    { location: [43.6532, -79.3832], size: 0.06 },  // Торонто
    { location: [45.5017, -73.5673], size: 0.05 },  // Монреаль
    { location: [19.4326, -99.1332], size: 0.06 },  // Мехико
    { location: [-23.5505, -46.6333], size: 0.07 }, // Сан-Паулу
    { location: [-34.6037, -58.3816], size: 0.06 }, // Буэнос-Айрес
    { location: [-12.0464, -77.0428], size: 0.05 }, // Лима
    { location: [4.7110, -74.0721], size: 0.05 },   // Богота

    // Азия
    { location: [39.9042, 116.4074], size: 0.08 },  // Пекин
    { location: [31.2304, 121.4737], size: 0.07 },  // Шанхай
    { location: [22.3193, 114.1694], size: 0.06 },  // Гонконг
    { location: [35.6762, 139.6503], size: 0.07 },  // Токио
    { location: [37.5665, 126.9780], size: 0.06 },  // Сеул
    { location: [25.2048, 55.2708], size: 0.07 },   // Дубай
    { location: [24.6877, 46.7219], size: 0.06 },   // Эр-Рияд
    { location: [1.3521, 103.8198], size: 0.06 },   // Сингапур
    { location: [13.7563, 100.5018], size: 0.06 },  // Бангкок
    { location: [28.6139, 77.2090], size: 0.07 },   // Дели
    { location: [19.0760, 72.8777], size: 0.07 },   // Мумбаи

    // Африка
    { location: [30.0444, 31.2357], size: 0.06 },   // Каир
    { location: [6.5244, 3.3792], size: 0.05 },     // Лагос
    { location: [-26.2041, 28.0473], size: 0.06 },  // Йоханнесбург
    { location: [-4.4419, 15.2663], size: 0.05 },   // Киншаса
  ],
}

export function Globe({
  className,  
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005
        state.phi = phiRef.current + rs.get()
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}