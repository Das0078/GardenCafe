import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = titleRef.current;
    if (!el) return;

    const heading = el.querySelector(".section-heading");
    const sub = el.querySelector(".section-subtitle");
    const decorLeft = el.querySelector(".decor-left");
    const decorRight = el.querySelector(".decor-right");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    // Decorative lines slide in from the sides
    tl.fromTo(
      [decorLeft, decorRight],
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.6, ease: "power3.out" },
      0
    );

    // Heading fades up
    tl.fromTo(
      heading,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      0.1
    );

    // Subtitle fades in
    if (sub) {
      tl.fromTo(
        sub,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.35
      );
    }
  }, { scope: titleRef });

  return (
    <div ref={titleRef} className="flex flex-col items-center gap-4 px-4">
      {/* Title row with decorative lines */}
      <div className="flex items-center gap-3 md:gap-5 w-full max-w-2xl">
        <span
          className="decor-left flex-1 h-[2px] rounded-full origin-right"
          style={{ background: "linear-gradient(to right, transparent, var(--background))" }}
        />
        <h2
          className="section-heading text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight whitespace-nowrap px-4 py-2 rounded-full"
          style={{
            color: "var(--background)",
          }}
        >
          {title}
        </h2>
        <span
          className="decor-right flex-1 h-[2px] rounded-full origin-left"
          style={{ background: "linear-gradient(to left, transparent, var(--background))" }}
        />
      </div>

      {/* Optional subtitle */}
      {subtitle && (
        <p className="section-subtitle text-center text-base md:text-lg opacity-70 max-w-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
