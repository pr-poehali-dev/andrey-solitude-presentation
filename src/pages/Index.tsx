import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  {
    id: 0,
    section: "Титул",
    label: "01",
    title: "Как Андрей Соколов преодолевает своё одиночество",
    subtitle: "Анализ образа главного героя",
    content: null,
    isCover: true,
  },
  {
    id: 1,
    section: "Основное содержание",
    label: "02",
    title: "Ключевые тезисы",
    subtitle: "Основные идеи и положения",
    content: [
      {
        heading: "Первый тезис",
        text: "Здесь размещается описание первого ключевого положения вашей презентации. Расскажите, что важно знать аудитории.",
      },
      {
        heading: "Второй тезис",
        text: "Подробное раскрытие второго важного аспекта. Добавьте факты, цифры или примеры для убедительности.",
      },
      {
        heading: "Третий тезис",
        text: "Завершающий аргумент раздела. Свяжите его с общей идеей и подготовьте аудиторию к выводам.",
      },
    ],
    isCover: false,
  },
  {
    id: 2,
    section: "Выводы",
    label: "03",
    title: "Итоги",
    subtitle: "Что важно запомнить",
    content: [
      {
        heading: "Главный вывод",
        text: "Сформулируйте самое важное, что должна усвоить аудитория после вашего выступления.",
      },
      {
        heading: "Дальнейшие шаги",
        text: "Предложите конкретные действия или рекомендации, вытекающие из представленного материала.",
      },
      {
        heading: "Призыв к действию",
        text: "Завершите призывом — что аудитория должна сделать прямо сейчас или в ближайшее время.",
      },
    ],
    isCover: false,
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [visible, setVisible] = useState(true);

  const goTo = (index: number) => {
    if (animating || index === current) return;
    const dir = index > current ? "next" : "prev";
    setDirection(dir);
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
      setTimeout(() => setAnimating(false), 700);
    }, 300);
  };

  const goNext = () => goTo(Math.min(current + 1, slides.length - 1));
  const goPrev = () => goTo(Math.max(current - 1, 0));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, animating]);

  const slide = slides[current];

  return (
    <div
      className="min-h-screen bg-[#F7F5F0] flex flex-col"
      style={{ fontFamily: "'Golos Text', sans-serif" }}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-[#E0DDD6]">
        <div className="flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "bg-[#1A1714] w-8 h-2"
                  : "bg-[#C8C4BB] w-2 h-2 hover:bg-[#888480]"
              }`}
              aria-label={s.section}
            />
          ))}
        </div>
        <span className="text-xs tracking-[0.2em] uppercase text-[#888480]">
          {slide.label} / {String(slides.length).padStart(2, "0")}
        </span>
      </header>

      {/* Main slide */}
      <main className="flex-1 flex items-center justify-center px-10 md:px-20 py-12">
        <div
          className="w-full max-w-5xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0)"
              : direction === "next"
              ? "translateY(20px)"
              : "translateY(-20px)",
            transition:
              "opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {slide.isCover ? (
            <div className="flex flex-col items-center text-center gap-8">
              <div className="w-16 h-px bg-[#1A1714]" />
              <h1
                className="text-6xl md:text-8xl font-light text-[#1A1714] leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                {slide.title}
              </h1>
              <p className="text-lg text-[#888480] font-light max-w-lg">
                {slide.subtitle}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-xs tracking-[0.25em] uppercase text-[#B0ACA5]">
                  Листайте далее
                </span>
                <Icon name="ArrowRight" size={14} className="text-[#888480]" />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
              {/* Left: section label */}
              <div className="flex flex-col gap-4 pt-2">
                <span className="text-xs tracking-[0.25em] uppercase text-[#888480]">
                  {slide.section}
                </span>
                <div className="w-8 h-px bg-[#C8C4BB]" />
                <h2
                  className="text-4xl md:text-5xl font-light text-[#1A1714] leading-tight"
                  style={{ fontFamily: "'Cormorant', serif" }}
                >
                  {slide.title}
                </h2>
                <p className="text-sm text-[#888480] mt-1">{slide.subtitle}</p>
              </div>

              {/* Right: content list */}
              <div className="flex flex-col gap-6">
                {slide.content?.map((item, i) => (
                  <div
                    key={i}
                    className="border-t border-[#E0DDD6] pt-5 pb-2"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible
                        ? "translateY(0)"
                        : "translateY(16px)",
                      transition: `opacity 0.5s ${0.1 + i * 0.12}s ease, transform 0.5s ${0.1 + i * 0.12}s ease`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="text-xs text-[#C8C4BB] mt-1 shrink-0 w-5"
                        style={{ fontFamily: "'Cormorant', serif" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col gap-2">
                        <h3
                          className="text-lg font-medium text-[#1A1714]"
                          style={{ fontFamily: "'Cormorant', serif" }}
                        >
                          {item.heading}
                        </h3>
                        <p className="text-sm text-[#6B6862] leading-relaxed font-light">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom nav */}
      <footer className="flex items-center justify-between px-10 py-6 border-t border-[#E0DDD6]">
        <span className="text-xs tracking-[0.15em] uppercase text-[#C8C4BB]">
          {slide.section}
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="w-10 h-10 rounded-full border border-[#E0DDD6] flex items-center justify-center text-[#888480] hover:bg-[#1A1714] hover:text-[#F7F5F0] hover:border-[#1A1714] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Icon name="ArrowLeft" size={16} />
          </button>
          <button
            onClick={goNext}
            disabled={current === slides.length - 1}
            className="w-10 h-10 rounded-full border border-[#E0DDD6] flex items-center justify-center text-[#888480] hover:bg-[#1A1714] hover:text-[#F7F5F0] hover:border-[#1A1714] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}