import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const SECTION_IDS = [
  "home",
  "specialty",
  "menu",
  "testimonials",
  "contact",
  "footer",
];

const PAUSE_DURATION = 5; // seconds to stay at each section
const SCROLL_DURATION = 7.5; // seconds for each scroll animation

export function useAutoScroll(enabled: boolean, onStop: () => void) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isActiveRef = useRef(false);

  const stopScroll = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    isActiveRef.current = false;
  }, []);

  const startScroll = useCallback(() => {
    stopScroll();
    isActiveRef.current = true;

    const tl = gsap.timeline({
      repeat: -1, // infinite loop
      onRepeat: () => {
        // Safety check: if we were stopped externally, kill the timeline
        if (!isActiveRef.current) {
          tl.kill();
        }
      },
    });

    // Build forward scroll sequence: section by section
    for (let i = 0; i < SECTION_IDS.length; i++) {
      const sectionEl = document.getElementById(SECTION_IDS[i]);
      if (!sectionEl) continue;

      // Scroll to this section
      tl.to(window, {
        scrollTo: { y: sectionEl, autoKill: false },
        duration: i === 0 ? 0.01 : SCROLL_DURATION, // instant for first (we're already at top)
        ease: "power2.inOut",
      });

      // Pause at this section
      tl.to({}, { duration: PAUSE_DURATION });
    }

    // Scroll back to top
    tl.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: SCROLL_DURATION * 1.2,
      ease: "power2.inOut",
    });

    // Pause at top before repeating
    tl.to({}, { duration: PAUSE_DURATION });

    timelineRef.current = tl;
  }, [stopScroll]);

  // Start / stop based on `enabled`
  useEffect(() => {
    if (enabled) {
      startScroll();
    } else {
      stopScroll();
    }
    return () => stopScroll();
  }, [enabled, startScroll, stopScroll]);

  // Stop on mouse movement
  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = () => {
      if (isActiveRef.current) {
        stopScroll();
        onStop();
      }
    };

    // 5-second grace period: user can move mouse freely for the first 5s
    const timerId = window.setTimeout(() => {
      window.addEventListener("mousemove", handleMouseMove, { once: true });
    }, 5000);

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enabled, stopScroll, onStop]);
}
