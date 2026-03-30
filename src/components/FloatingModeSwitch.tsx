import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** True when URL is the personal area of the site (`/personal`, `/personal/...`). */
function isPersonalPath(path: string) {
  const p = (path || "/").split("?")[0].replace(/\/+$/, "") || "/";
  return p === "/personal" || p.startsWith("/personal/");
}

/**
 * Sticky floating pill: switch between the professional portfolio and the personal page.
 * Syncs with `window.location` on Astro view transitions.
 */
export default function FloatingModeSwitch({ currentPath }: { currentPath: string }) {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    sync();
    document.addEventListener("astro:page-load", sync);
    document.addEventListener("astro:after-swap", sync);
    return () => {
      document.removeEventListener("astro:page-load", sync);
      document.removeEventListener("astro:after-swap", sync);
    };
  }, []);

  const personal = isPersonalPath(path);

  return (
    <nav
      aria-label="Portfolio mode"
      className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 pointer-events-auto"
    >
      <div
        className="relative grid w-[min(92vw,320px)] grid-cols-2 rounded-full border border-white/12 bg-[#141518]/92 p-1 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        {/* Active sliding pill — glass effect */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1 bottom-1 rounded-full"
          initial={false}
          animate={{ left: personal ? "calc(50% + 2px)" : "4px" }}
          style={{
            width: "calc(50% - 6px)",
            // Layered glass: a translucent white base + subtle inner highlight + red-tinted glow
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.07) 100%)",
            backdropFilter: "blur(12px) saturate(1.6)",
            WebkitBackdropFilter: "blur(12px) saturate(1.6)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 20px rgba(215,25,33,0.12)",
          }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
        />
        <a
          href="/"
          className={`relative z-10 flex items-center justify-center rounded-full py-2.5 text-center text-[11px] font-mono uppercase tracking-[0.18em] no-underline transition-colors duration-200 ${
            !personal ? "text-[#D71921]" : "text-white/45 hover:text-white/80"
          }`}
        >
          Professional
        </a>
        <a
          href="/personal/"
          className={`relative z-10 flex items-center justify-center rounded-full py-2.5 text-center text-[11px] font-mono uppercase tracking-[0.18em] no-underline transition-colors duration-200 ${
            personal ? "text-[#D71921]" : "text-white/45 hover:text-white/80"
          }`}
        >
          Personal
        </a>
      </div>
    </nav>
  );
}
