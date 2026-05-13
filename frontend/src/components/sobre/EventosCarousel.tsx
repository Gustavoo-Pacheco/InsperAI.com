"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { mediaUrl } from "@/lib/api";
import type { Evento } from "@/lib/types";

interface EventosCarouselProps {
  eventos: Evento[];
}

const AUTO_MS = 7000;
const SLIDE_MS = 800;
const SLOT_RATIO = 0.56;
const GAP_PX = 24;

export default function EventosCarousel({ eventos }: EventosCarouselProps) {
  const count = eventos.length;

  const slides = count > 0 ? [eventos[count - 1], ...eventos, eventos[0]] : [];

  const [current, setCurrent] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [viewport, setViewport] = useState(0);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimatingRef = useRef(false);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewport(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const slotWidth = Math.round(viewport * SLOT_RATIO);
  const offset = viewport / 2 - slotWidth / 2 - current * (slotWidth + GAP_PX);

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (count < 2 || isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setAnimate(true);
      setCurrent((c) => c + dir);
    },
    [count],
  );

  const next = useCallback(() => advance(1), [advance]);
  const prev = useCallback(() => advance(-1), [advance]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (paused || count < 2) return;
    timerRef.current = setTimeout(() => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        setAnimate(true);
        setCurrent((c) => c + 1);
      }
    }, AUTO_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, count]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform") return;
      isAnimatingRef.current = false;
      if (current === slides.length - 1) {
        setAnimate(false);
        setCurrent(1);
      } else if (current === 0) {
        setAnimate(false);
        setCurrent(slides.length - 2);
      }
    },
    [current, slides.length],
  );

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  if (count === 0) return null;

  const activeRealIndex = ((current - 1) % count + count) % count;

  return (
    <section
      aria-label="Eventos"
      style={{ background: "var(--color-background)" }}
    >
      <div
        className="mx-auto max-w-6xl px-6"
        style={{
          paddingTop: "var(--spacing-xl)",
          paddingBottom: "var(--spacing-xl)",
        }}
      >
        <span
          className="font-mono uppercase"
          style={{
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "var(--color-accent)",
            display: "block",
            marginBottom: "var(--spacing-lg)",
          }}
        >
          Eventos
        </span>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <style>{`
            @media (prefers-reduced-motion: reduce) {
              .evento-track, .evento-slot { transition: none !important; }
            }
          `}</style>

          <div
            ref={viewportRef}
            className="relative overflow-hidden"
            style={{ minHeight: 380 }}
          >
            <div
              className="evento-track flex"
              onTransitionEnd={handleTransitionEnd}
              style={{
                gap: `${GAP_PX}px`,
                transform: `translate3d(${offset}px, 0, 0)`,
                transition: animate
                  ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                  : "none",
                willChange: "transform",
              }}
            >
              {slides.map((evento, i) => (
                <CarouselSlot
                  key={i}
                  evento={evento}
                  width={slotWidth}
                  active={i === current}
                />
              ))}
            </div>
          </div>

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Evento anterior"
                className="absolute left-0 top-1/2 flex -translate-x-full -translate-y-1/2 items-center justify-center bg-transparent transition hover:scale-110"
                style={{
                  color: "var(--color-accent)",
                  border: "none",
                  padding: "var(--spacing-sm)",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                <ChevronLeft size={48} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próximo evento"
                className="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-full items-center justify-center bg-transparent transition hover:scale-110"
                style={{
                  color: "var(--color-accent)",
                  border: "none",
                  padding: "var(--spacing-sm)",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                <ChevronRight size={48} strokeWidth={2.2} />
              </button>
            </>
          ) : null}

          {count > 1 ? (
            <div
              className="flex justify-center"
              style={{ gap: 8, marginTop: "var(--spacing-md)" }}
              aria-hidden
            >
              {eventos.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: i === activeRealIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 999,
                    background:
                      i === activeRealIndex
                        ? "var(--color-accent)"
                        : "var(--color-border)",
                    transition: "all 400ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CarouselSlot({
  evento,
  width,
  active,
}: {
  evento: Evento;
  width: number;
  active: boolean;
}) {
  const photo = evento.imagem ? mediaUrl(evento.imagem) : null;

  return (
    <article
      className="evento-slot group relative overflow-hidden rounded-2xl"
      style={{
        flex: `0 0 ${width}px`,
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        aspectRatio: "16 / 10",
        minHeight: 380,
        transform: active ? "scale(1)" : "scale(0.86)",
        opacity: active ? 1 : 0.55,
        transition: `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: "transform, opacity",
      }}
    >
      {photo ? (
        <Image
          src={photo}
          alt={`Foto do evento ${evento.titulo}`}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover transition-opacity duration-300 group-hover:opacity-25"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "var(--color-border)",
            color: "var(--color-muted)",
            fontSize: 14,
          }}
        >
          Sem imagem
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.0) 30%, rgba(9,9,11,0.92) 100%)",
          padding: "var(--spacing-xl)",
        }}
      >
        <h3
          className="font-bold"
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--color-foreground)",
            lineHeight: 1.25,
            marginBottom: "var(--spacing-sm)",
          }}
        >
          {evento.titulo}
        </h3>
        {evento.descricao ? (
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.55,
              color: "rgba(250,250,250,0.85)",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {evento.descricao}
          </p>
        ) : null}
      </div>
    </article>
  );
}
