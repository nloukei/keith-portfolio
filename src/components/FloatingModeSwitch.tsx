import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function isPersonalPath(path: string) {
  const p = (path || "/").split("?")[0].replace(/\/+$/, "") || "/";
  return p === "/personal" || p.startsWith("/personal/");
}

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
      className="fixed bottom-0 left-1/2 z-[100] -translate-x-1/2 pointer-events-auto flex items-end gap-1"
    >
      {/* Work tab */}
      <motion.div
        animate={{ y: personal ? 4 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        <a
          href="/"
          className="flex items-center gap-1.5 no-underline transition-colors duration-200"
          style={{
            fontFamily: "Caveat, cursive",
            fontSize: "20px",
            padding: "10px 24px 12px",
            background: personal ? "rgba(247,243,234,0.85)" : "#F7F3EA",
            border: "2px solid #2c2b27",
            borderBottom: "none",
            borderRadius: "12px 12px 0 0",
            color: personal ? "rgba(44,43,39,0.45)" : "#D71921",
            boxShadow: personal
              ? "1px -2px 0 rgba(44,43,39,0.06)"
              : "3px -4px 0 rgba(44,43,39,0.12), inset 0 -2px 0 rgba(247,243,234,1)",
            fontWeight: personal ? 400 : 600,
          }}
        >
          ✦ Work
        </a>
      </motion.div>

      {/* Personal tab */}
      <motion.div
        animate={{ y: personal ? 0 : 4 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        <a
          href="/personal/"
          className="flex items-center gap-1.5 no-underline transition-colors duration-200"
          style={{
            fontFamily: "Caveat, cursive",
            fontSize: "20px",
            padding: "10px 24px 12px",
            background: personal ? "#F7F3EA" : "rgba(247,243,234,0.85)",
            border: "2px solid #2c2b27",
            borderBottom: "none",
            borderRadius: "12px 12px 0 0",
            color: personal ? "#D71921" : "rgba(44,43,39,0.45)",
            boxShadow: personal
              ? "3px -4px 0 rgba(44,43,39,0.12), inset 0 -2px 0 rgba(247,243,234,1)"
              : "1px -2px 0 rgba(44,43,39,0.06)",
            fontWeight: personal ? 600 : 400,
          }}
        >
          ♡ Personal
        </a>
      </motion.div>
    </nav>
  );
}
