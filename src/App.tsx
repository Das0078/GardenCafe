import { useState, useRef } from "react";
import FrameSequenceHero from "./components/FrameSequenceHero";
import SplashScreen from "./components/SplashScreen";
import SpecialtySection from "./components/SpecialtySection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const [splashComplete, setSplashComplete] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (splashComplete) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setSplashComplete(true);
      }
    });

    // Phase 1: Center the logo and scale it up instantly
    // (window width / 2) - 50px (half logo width) - 16px (left offset)
    const centerX = window.innerWidth / 2 - 50 - 16;
    const centerY = window.innerHeight / 2 - 50 - 16; 

    tl.set(logoRef.current, {
      x: centerX,
      y: centerY,
      scale: 5.5,
      rotation: 0,
      autoAlpha: 0,
    });

    // Reveal sequence
    tl.to(logoRef.current, {
      autoAlpha: 1,
      duration: 1.2,
      ease: "power2.out"
    }, "reveal");

    tl.fromTo(".splash-item",
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.0, stagger: 0.2, ease: "power3.out" },
      "reveal+=0.3"
    );

    // Phase 1: Loading Animation (progress bar fills over 6.5s)
    tl.to(".splash-progress", {
      width: "100%",
      duration: 6.5,
      ease: "power1.inOut"
    }, "reveal+=0.5");

    // Phase 2: Exit Transition
    // Fade out splash background
    tl.to(".splash-container", {
      autoAlpha: 0,
      duration: 1.0,
      ease: "power3.inOut"
    }, "exit");

    // Shrink and move logo back to top-left
    tl.to(logoRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: -1,
      duration: 1.2,
      ease: "power3.inOut"
    }, "exit");

  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <img
        ref={logoRef}
        src="/logo/GardenCafe.png"
        alt="CupShake Logo"
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          width: "100px",
          height: "auto",
          zIndex: 9999,
          pointerEvents: "none",
          rotate: "-1deg"
        }}
      />
      {!splashComplete && <SplashScreen />}
      <FrameSequenceHero />
      {/* Speciallity */}
      <SpecialtySection />

      // Menu
    </div>
  );
}

export default App;
