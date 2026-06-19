import React, { useState, useEffect } from "react";
import ShapeGrid from "./ShapeGrid";

export default function SplashScreen() {
  const words = ["Quality", "Service", "Cleanliness", "Hospitality"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Slower interval: 1500ms per word
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="splash-container fixed inset-0 z-[9998] bg-gradient-to-br from-background to-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background ShapeGrid */}
      <div className="absolute inset-0 z-0 opacity-60">
        <ShapeGrid 
          shape="square" 
          borderColor="rgba(242, 244, 243, 0.08)" 
          hoverFillColor="rgba(242, 244, 243, 0.15)"
          direction="diagonal"
          speed={0.5}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">
        {/* Spacer to leave room for the dynamically centered logo */}
        <div className="splash-item h-[300px]" />
      
      {/* "New age food" text - Made much smaller */}
      <h2 className="splash-item text-lg md:text-2xl text-foreground font-semibold italic mb-4 opacity-70 tracking-widest drop-shadow-md">
        &quot;New age food&quot;
      </h2>
      
      {/* Dynamic text - Made slower and smoother */}
      <div className="splash-item text-xl md:text-2xl text-foreground/80 font-medium mb-16 flex items-center h-8">
        <span>We believe in</span>
        <span className="ml-2 relative min-w-[140px] font-bold text-foreground drop-shadow-sm h-full overflow-hidden block">
          {words.map((word, idx) => (
            <span
              key={word}
              className={`absolute left-0 top-0 w-full transition-all duration-1000 ease-in-out text-[#f48c06] ${
                idx === wordIndex 
                  ? "opacity-100 translate-y-0" 
                  : idx < wordIndex 
                    ? "opacity-0 -translate-y-4" // Previous words slide up
                    : "opacity-0 translate-y-4"  // Future words slide from below
              }`}
            >
              {word}
            </span>
          ))}
        </span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="splash-item w-64 md:w-80 h-1.5 bg-foreground/20 rounded-full overflow-hidden shadow-inner">
        {/* Progress Bar Fill - Animated via GSAP */}
        <div className="splash-progress h-full bg-foreground w-0 rounded-full shadow-[0_0_10px_var(--foreground)]" />
      </div>
      </div>
    </div>
  );
}
