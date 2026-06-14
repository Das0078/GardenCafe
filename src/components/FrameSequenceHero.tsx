import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 208;
const PAD = 3;

const frameSrc = (i: number) =>
  `/frames/ezgif-frame-${String(i).padStart(PAD, "0")}.jpg`;

export default function FrameSequenceHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const frameIndex = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      imgs.push(img);
    }
    images.current = imgs;

    const draw = (index: number) => {
      const img = images.current[index];
      if (!img || !img.naturalWidth) return;

      const cw = window.innerWidth;
      const ch = window.innerHeight;

      // "cover" logic: scale image so it fills the viewport, then center it
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const vpRatio = cw / ch;

      let drawW: number, drawH: number, dx: number, dy: number;
      if (imgRatio > vpRatio) {
        // image is wider than viewport → match height, crop sides
        drawH = ch;
        drawW = ch * imgRatio;
        dx = (cw - drawW) / 2;
        dy = 0;
      } else {
        // image is taller than viewport → match width, crop top/bottom
        drawW = cw;
        drawH = cw / imgRatio;
        dx = 0;
        dy = (ch - drawH) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, drawW, drawH);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(frameIndex.current);
    };
    resize();

    const spacer = document.getElementById("frames-spacer") as HTMLElement;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = spacer.offsetHeight - window.innerHeight;
          const progress = Math.min(scrollY / Math.max(maxScroll, 1), 1);
          const index = Math.round(progress * (TOTAL_FRAMES - 1));
          if (index !== frameIndex.current) {
            frameIndex.current = index;
            draw(index);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ objectFit: "cover" }}
      />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
          CupShake
        </h1>
        <p className="mt-4 max-w-md text-base text-white/80 sm:text-lg md:text-xl">
          Scroll to animate the background frame by frame
        </p>
      </div>
      <div id="frames-spacer" className="relative" style={{ height: "500vh" }} />
    </section>
  );
}
