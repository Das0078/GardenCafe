import { useState, useRef } from "react";
import FrameSequenceHero from "./components/FrameSequenceHero";
import SplashScreen from "./components/SplashScreen";
import SpecialtySection from "./components/SpecialtySection";
import MenuSection from "./components/MenuSection";
import TestimonialSection from "./components/testimonials/TestimonialSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const [splashComplete, setSplashComplete] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (splashComplete) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setSplashComplete(true);
        },
      });

      const centerX = window.innerWidth / 2 - 50 - 16;
      const centerY = window.innerHeight / 2 - 50 - 16;

      const isMobile = window.innerWidth < 768;
      const logoScale = isMobile ? 3.5 : 8;

      tl.set(logoRef.current, {
        x: centerX,
        y: centerY,
        scale: logoScale,
        rotation: 0,
        autoAlpha: 0,
      });

      tl.to(
        logoRef.current,
        {
          autoAlpha: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "reveal"
      );

      tl.fromTo(
        ".splash-item",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.0,
          stagger: 0.2,
          ease: "power3.out",
        },
        "reveal+=0.3"
      );

      tl.to(
        ".splash-progress",
        {
          width: "100%",
          duration: 6.5,
          ease: "power1.inOut",
        },
        "reveal+=0.5"
      );

      tl.to(
        ".splash-container",
        {
          autoAlpha: 0,
          duration: 1.0,
          ease: "power3.inOut",
        },
        "exit"
      );

      tl.to(
        logoRef.current,
        {
          x: 0,
          y: 0,
          scale: 1,
          rotation: -1,
          duration: 1.2,
          ease: "power3.inOut",
        },
        "exit"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* Navbar */}
      <Navbar />

      {/* Animated Logo */}
      <img
        ref={logoRef}
        src="/logo/GardenCafe.png"
        alt="Garden Cafe Logo"
        className="mb-10 lg:mb-0"
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          width: "120px",
          height: "auto",
          zIndex: 9999,
          pointerEvents: "none",
          rotate: "-1deg",
        }}
      />

      {/* Splash Screen */}
      {!splashComplete && <SplashScreen />}

      {/* Home */}
      <section id="home">
        <FrameSequenceHero />
      </section>

      {/* Specialty */}
      <section id="specialty">
        <SpecialtySection />
      </section>

      {/* Menu */}
      <section id="menu">
        <MenuSection />
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <TestimonialSection />
      </section>

      {/* Contact */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* Footer */}
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}

export default App;