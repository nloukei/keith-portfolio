import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#overview" },
  { label: "Albums", href: "#albums" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

function getActiveSectionId(): string {
  const y = window.scrollY + window.innerHeight * 0.35;
  let current = navItems[0].href.slice(1);
  for (const { href } of navItems) {
    const el = document.querySelector(href);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= y) current = href.slice(1);
  }
  return current;
}

export default function SideNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setActive(getActiveSectionId());
      ticking = false;
    };
    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-5">
      {navItems.map(({ label, href }) => {
        const isActive = active === href.slice(1);
        return (
          <motion.a
            key={href}
            href={href}
            initial="idle"
            whileHover="hovered"
            animate={isActive ? "active" : "idle"}
            className="flex items-center gap-2.5 no-underline group"
          >
            {/* Pencil bullet — grows & colors on active */}
            <motion.span
              variants={{
                idle: { scale: 0.7, backgroundColor: "rgba(44,43,39,0.25)" },
                hovered: { scale: 1.1, backgroundColor: "rgba(44,43,39,0.55)" },
                active: { scale: 1.3, backgroundColor: "#D71921" },
              }}
              transition={{ duration: 0.22 }}
              className="block w-2 h-2 rounded-full shrink-0"
              style={{ boxShadow: isActive ? "0 0 0 3px rgba(215,25,33,0.18)" : "none" }}
            />

            {/* Handwritten label */}
            <motion.span
              variants={{
                idle: { x: 0, color: "rgba(44,43,39,0.30)", fontSize: "16px" },
                hovered: { x: 5, color: "rgba(44,43,39,0.70)", fontSize: "17px" },
                active: { x: 5, color: "#D71921", fontSize: "18px" },
              }}
              transition={{ duration: 0.22 }}
              style={{ fontFamily: "Caveat, cursive", fontWeight: isActive ? 600 : 400 }}
              className="whitespace-nowrap"
            >
              {label}
              {isActive && (
                <svg
                  viewBox="0 0 60 8"
                  className="block mt-0.5 h-1.5"
                  style={{ width: "100%" }}
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 4 C 10 1, 20 7, 30 4 S 50 1, 58 4"
                    stroke="#D71921"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              )}
            </motion.span>
          </motion.a>
        );
      })}
    </nav>
  );
}
