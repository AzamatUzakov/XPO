/**
 * SectionInner — единый контейнер с горизонтальными отступами.
 * Используется внутри всех секций как "единый источник правды" для X-отступов.
 *
 * mobile  < 768px  → px-4  (16px)
 * tablet  ≥ 768px  → px-8  (32px)
 * desktop ≥ 1024px → px-16 (64px)
 *
 * ВАЖНО: Не изменяй вертикальные отступы (py-*, pt-*, pb-*, my-*, mt-*, mb-*)
 * — управление по оси Y остаётся в каждом компоненте.
 */
export default function SectionInner({ children, className = "" }) {
  return (
    <div className={`px-4 md:px-8 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
