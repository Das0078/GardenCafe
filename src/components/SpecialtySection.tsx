import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionTitle from "./SectionTitle";
import { CardCarousel, type CarouselImage } from "@/components/ui/card-carousel";

gsap.registerPlugin(ScrollTrigger);

const specialtyImages: CarouselImage[] = [
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=750&fit=crop",
    alt: "Artisan latte with latte art",
  },
  {
    src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&h=750&fit=crop",
    alt: "Gourmet pastry assortment",
  },
  {
    src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=750&fit=crop",
    alt: "Freshly baked chocolate cake",
  },
  {
    src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&h=750&fit=crop",
    alt: "Fresh brewed coffee with beans",
  },
  {
    src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&h=750&fit=crop",
    alt: "Berry smoothie bowl",
  },
  {
    src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=750&fit=crop",
    alt: "Gourmet burger with fries",
  },
];

export default function SpecialtySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = carouselWrapperRef.current;
    if (!wrapper) return;

    gsap.fromTo(
      wrapper,
      {
        y: 60,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          end: "top 45%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{
        backgroundColor: "var(--foreground)",
        color: "var(--background)",
      }}
    >
      {/* Subtle decorative background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--background) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top curved separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 md:h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            style={{ fill: "var(--background)" }}
            opacity=".8"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            style={{ fill: "var(--background)" }}
            opacity=".5"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            style={{ fill: "var(--background)" }}
            opacity=".3"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 md:gap-14">
        {/* Section Title */}
        <SectionTitle
          title="Our Kitchen's Specialty"
          subtitle="We have a recipe for every family"
        />

        {/* Carousel */}
        <div ref={carouselWrapperRef} className="w-full px-4 md:px-8">
          <CardCarousel
            images={specialtyImages}
            autoplayDelay={2000}
            showPagination={true}
            showNavigation={true}
          />
        </div>
      </div>

      {/* Bottom curved separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-12 md:h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            style={{ fill: "var(--background)" }}
            opacity=".8"
          />
        </svg>
      </div>
    </section>
  );
}
