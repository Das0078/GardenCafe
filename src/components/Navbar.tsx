import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Menu", href: "#menu" },
  { name: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

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
        left-[160px]
        right-8
        z-50
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
      <div className="flex items-center justify-end">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="
                relative
                text-white
                text-base
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
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-300
          ${isOpen ? "max-h-60 mt-4" : "max-h-0"}
        `}
      >
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}