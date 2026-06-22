import { useEffect, useState, useCallback } from "react";
import { useAutoScroll } from "../hooks/useAutoScroll";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Kitchen", href: "#menu" },
  { name: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [autoScroll, setAutoScroll] = useState(false);

  const handleAutoScrollStop = useCallback(() => {
    setAutoScroll(false);
  }, []);

  useAutoScroll(autoScroll, handleAutoScrollStop);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed
        top-6
        left-0
        right-0
        z-50
        hidden
        md:block
        transition-all
        duration-500
        ease-out
        ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-20 opacity-0"
        }
      `}
    >
      <div className="flex items-center justify-center">
        {/* Desktop Menu */}
        <div className="flex items-center gap-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="
                relative
                text-white
                text-md
                font-semibold
                tracking-wide
                transition-all
                duration-300
                hover:text-[#D4A373]
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:w-0
                after:bg-[#D4A373]
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
            >
              {item.name}
            </a>
          ))}

          {/* Auto-Scroll Toggle */}
          <div className="relative group">
            <button
              onClick={() => setAutoScroll((prev) => !prev)}
              aria-label="Toggle auto-scroll"
              className="
                relative
                w-[52px]
                h-[28px]
                rounded-full
                cursor-pointer
                border-none
                outline-none
                transition-colors
                duration-500
                ease-[cubic-bezier(0.4,0,0.2,1)]
                flex-shrink-0
              "
              style={{
                backgroundColor: autoScroll
                  ? "var(--foreground)"
                  : "rgba(255,255,255,0.15)",
              }}
            >
              {/* Thumb */}
              <span
                className="
                  absolute
                  top-[3px]
                  block
                  w-[22px]
                  h-[22px]
                  rounded-full
                  shadow-md
                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.4,0,0.2,1)]
                "
                style={{
                  left: autoScroll ? "27px" : "3px",
                  backgroundColor: autoScroll
                    ? "var(--background)"
                    : "rgba(255,255,255,0.6)",
                }}
              />
            </button>

            {/* Tooltip */}
            <span
              className="
                pointer-events-none
                absolute
                left-1/2
                -translate-x-1/2
                top-full
                mt-2
                px-3
                py-1.5
                rounded-md
                text-xs
                font-medium
                whitespace-nowrap
                opacity-0
                scale-95
                group-hover:opacity-100
                group-hover:scale-100
                transition-all
                duration-300
                ease-out
              "
              style={{
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              {autoScroll ? "Auto-scroll On" : "Auto-scroll Off"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}