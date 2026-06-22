import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import hero1 from "../assets/Hero/hero1.mp4";
import hero2 from "../assets/Hero/hero2.mp4";
import chocolateImg from "../assets/Hero/Img1.png";
import berryImg from "../assets/Hero/Img2.png";
import coffeeImg from "../assets/Hero/coffee.png";
import Button from "./Button";

const items = [
  { 
    title: "Desi South Indian Menu", 
    desc: "Crispy dosas, fluffy idlis, and golden vadas served with authentic chutneys and sambar. A taste of South India crafted fresh, just the way you remember it.",
    img: chocolateImg 
  },
  { 
    title: "Spicy Evening Snacks", 
    desc: "From fiery vada pav and loaded sandwiches to cheesy pizzas and crispy fries. Perfect bites to fuel your evenings with bold, street-style flavors.",
    img: berryImg 
  },
  { 
    title: "Sweet Touch of Home", 
    desc: "Sip on chilled cold coffee, bite into fresh-baked pastries, and crumble through buttery cookies. Every treat here feels like a warm hug from home.",
    img: coffeeImg 
  },
];

export default function FrameSequenceHero() {
  const [activeVideo, setActiveVideo] = useState<0 | 1>(0);
  const video0Ref = useRef<HTMLVideoElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // Explicitly hide all wrapper h1s and images at the start.
    tl.set(titlesRef.current, { autoAlpha: 0 })
      .set(imagesRef.current, { autoAlpha: 0, y: -150 });

    items.forEach((_, i) => {
      const titleEl = titlesRef.current[i];
      if (!titleEl) return;
      const chars = titleEl.querySelectorAll(".char");
      const desc = titleEl.querySelector(".desc");
      const btn = titleEl.querySelector(".action-btn");

      // 1. Initial State: Title hidden, characters moved, desc moved, Image moved
      tl.set(titleEl, { autoAlpha: 0 }, "start" + i)
        .set(chars, { x: -80, y: 30, autoAlpha: 0 }, "start" + i)
        .set(desc, { y: 20, autoAlpha: 0 }, "start" + i)
        .set(btn, { y: 20, autoAlpha: 0 }, "start" + i)
        .set(imagesRef.current[i], { y: -150, autoAlpha: 0 }, "start" + i);

      // 2. Animate IN (staggered sync)
      tl.set(titleEl, { autoAlpha: 1 }, "in" + i) // Reveal wrapper
        .to(chars, { x: 0, y: 0, autoAlpha: 1, duration: 0.8, ease: "back.out(1.2)", stagger: 0.03 }, "in" + i)
        .to(desc, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }, "in" + i + "+=0.3") // desc enters slightly after title
        .to(btn, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }, "in" + i + "+=0.4") // btn enters slightly after desc
        .to(imagesRef.current[i], { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }, "in" + i);

      // 3. Display duration
      tl.to({}, { duration: 1.8 });

      // 4. Animate OUT (staggered sync)
      tl.to(chars, { x: 80, y: -20, autoAlpha: 0, duration: 0.5, ease: "power3.in", stagger: 0.02 }, "out" + i)
        .to(desc, { y: -20, autoAlpha: 0, duration: 0.5, ease: "power3.in" }, "out" + i + "+=0.1")
        .to(btn, { y: -20, autoAlpha: 0, duration: 0.5, ease: "power3.in" }, "out" + i + "+=0.2")
        .to(imagesRef.current[i], { y: 150, autoAlpha: 0, duration: 0.8, ease: "power3.in" }, "out" + i)
        .set(titleEl, { autoAlpha: 0 }); // Hide wrapper after out
    });
  }, { scope: containerRef });

  useEffect(() => {
    // Set slightly slow playback speed
    if (video0Ref.current) video0Ref.current.playbackRate = 0.6;
    if (video1Ref.current) video1Ref.current.playbackRate = 0.6;
  }, []);

  const handleVideoEnded = () => {
    setActiveVideo((prev) => (prev === 0 ? 1 : 0));
  };

  useEffect(() => {
    const playVideo = async () => {
      try {
        if (activeVideo === 0 && video0Ref.current) {
          video0Ref.current.currentTime = 0;
          await video0Ref.current.play();
        } else if (activeVideo === 1 && video1Ref.current) {
          video1Ref.current.currentTime = 0;
          await video1Ref.current.play();
        }
      } catch (err) {
        console.error("Video play error:", err);
      }
    };
    playVideo();
  }, [activeVideo]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Backgrounds */}
      <video
        ref={video0Ref}
        src={hero1}
        muted
        playsInline
        autoPlay
        onEnded={handleVideoEnded}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          activeVideo === 0 ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={video1Ref}
        src={hero2}
        muted
        playsInline
        onEnded={handleVideoEnded}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          activeVideo === 1 ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay of background color */}
      <div className="absolute inset-0 bg-background opacity-90 mix-blend-multiply pointer-events-none" />

      {/* 60 / 40 Two-column layout */}
      <div ref={containerRef} className="relative mt-5 md:mt-0 z-10 flex flex-col md:flex-row h-full w-full">
        {/* Left column — 60% */}
        <div className="relative w-full md:w-[60%] h-1/2 md:h-full flex flex-col justify-center overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => { titlesRef.current[i] = el; }}
              className="absolute left-6 md:left-20 flex flex-col justify-start invisible max-w-2xl h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] -translate-y-1/2 top-1/2"
            >
              <div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7.8xl font-bold tracking-tight text-foreground drop-shadow-lg leading-tight">
                  {item.title.split(" ").map((word, wIdx, arr) => (
                    <span key={wIdx} className="inline-block whitespace-nowrap">
                      {word.split("").map((char, cIdx) => (
                        <span key={cIdx} className="inline-block char">
                          {char}
                        </span>
                      ))}
                      {wIdx !== arr.length - 1 && <span className="inline-block char">&nbsp;</span>}
                    </span>
                  ))}
                </h1>
                <p className="desc max-w-[40vw] mt-6 text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed drop-shadow-md">
                  {item.desc}
                </p>
              </div>
              <div className="action-btn mt-auto flex items-start">
                <Button onClick={() => console.log(`Order ${item.title}`)}>
                  Get Now &rarr;
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Right column — 40% */}
        <div className="relative w-full md:w-[40%] h-1/2 md:h-full flex items-center justify-center overflow-hidden">
          {items.map((item, i) => (
            <img
              key={i}
              ref={(el) => { imagesRef.current[i] = el; }}
              src={item.img}
              alt={item.title}
              className="absolute h-[70%] max-h-[600px] object-contain invisible drop-shadow-2xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
