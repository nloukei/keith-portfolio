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
  // Reference line: fraction down the viewport. Last section whose top is at or
  // above this line wins. Works for very tall blocks (#albums) where
  // IntersectionObserver + threshold never fires (visible area / total height < 30%).
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
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
      {navItems.map(({ label, href }) => {
        const isActive = active === href.slice(1);
        return (
          <motion.a
            key={href}
            href={href}
            initial="idle"
            whileHover="hovered"
            animate={isActive ? "active" : "idle"}
            className="flex items-center gap-3 no-underline"
          >
            <motion.span
              variants={{
                idle: { width: 0, opacity: 0 },
                hovered: { width: 16, opacity: 1 },
                active: { width: 16, opacity: 1 },
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="block h-px bg-[#D71921]"
            />
            <motion.span
              variants={{
                idle: { x: 0, color: "rgba(0,0,0,0.25)" },
                hovered: { x: 6, color: "rgba(0,0,0,0.8)" },
                active: { x: 6, color: "#D71921" },
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="font-mono text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
            >
              {label}
            </motion.span>
          </motion.a>
        );
      })}
    </nav>
  );
}
