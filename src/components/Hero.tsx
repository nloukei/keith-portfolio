import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  imageSrc: string;
  imageSrc2: string;
}

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/nloukei",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/keith-einlou-pogoy-b5b7b939a/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:keinlou115@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const stagger = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } },
  hidden: {},
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

// Dot positions [col, row] forming a downward-pointing arrow shape.
// col=0 is the center; negative cols go left, positive go right.
const ARROW_STEP = 14; // px between dot centers
const ARROW_DOT  = 5;  // dot diameter px
const arrowDots: [number, number][] = [
  // vertical stem
  [0, 0], [0, 1], [0, 2], [0, 3],
  // arrowhead — two diagonal wings converging at the tip
  [-2, 4], [-1, 5],
  [ 2, 4], [ 1, 5],
  // tip
  [0, 6],
];

const introText =
  "Hi! I'm Keith. Thanks for checking out my portfolio. Explore my latest builds. Take a scroll";

export default function Hero({ imageSrc, imageSrc2 }: HeroProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setFlipped((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  const introTokens = useMemo(() => {
    // Split into words + punctuation so we can render each token in its own box.
    // - Words: letters with optional apostrophe parts (e.g. "I'm", "you're")
    // - Punctuation: . , ! ?
    return introText.match(/[A-Za-z]+(?:'[A-Za-z]+)?|[0-9]+|[.,!?;:]/g) ?? [];
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden md:flex-row md:gap-16 md:items-center md:px-8">
      {/* KEITH watermark */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-[48%] -translate-y-1/2 text-[28vw] font-black text-black tracking-[0.12em] select-none pointer-events-none uppercase leading-none whitespace-nowrap"
      >
        KEITH
      </motion.h1>

      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden"
        style={{ perspective: 800 }}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full"
        >
          <img
            src={imageSrc}
            alt="Keith Einlou Pogoy"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ backfaceVisibility: "hidden" }}
          />
          <img
            src={imageSrc2}
            alt="Keith Einlou Pogoy"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          />
        </motion.div>
      </motion.div>

      {/* Name + role + socials */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-6 flex w-full flex-col items-start gap-4 px-5 md:mt-0 md:w-[520px] md:px-0"
      >
        {/* Name */}
        <motion.div variants={fadeUp} className="w-full">
          <h2 className="text-left">
            <div className="flex flex-wrap gap-x-1.5 gap-y-2">
              {introTokens.map((token, i) => {
                const isPunct = /^[.,!?;:]$/.test(token);
                const tokenClean = token.replace(/[.,!?;:]/g, "").toLowerCase();
                const accentTokens = new Set(["keith", "scroll"]);
                const isAccent = accentTokens.has(tokenClean);

                return (
                  <motion.span
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${token}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.018,
                      ease: "easeOut" as const,
                    }}
                    className={`relative inline-flex items-center justify-center font-mono leading-none whitespace-nowrap text-[16px] md:text-[18px] lg:text-[20px] ${
                      isPunct ? "px-1 py-0.5 text-black/70" : "px-2 py-1 text-black/90"
                    } ${isAccent ? "text-[#D71921]" : ""}`}
                  >
                    {/* No full “box” background; only small Nothing-like red corner ticks */}
                    {!isPunct && (
                      <>
                        <span
                          className={`pointer-events-none absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${
                            isAccent ? "border-[#D71921]/80" : "border-[#D71921]/35"
                          }`}
                        />
                        <span
                          className={`pointer-events-none absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${
                            isAccent ? "border-[#D71921]/65" : "border-[#D71921]/25"
                          }`}
                        />
                      </>
                    )}

                    {/* Subtle underline trace to replace the boxed look */}
                    <span
                      className={`pointer-events-none absolute left-1.5 right-1.5 bottom-0 h-px ${
                        isPunct
                          ? "bg-black/0"
                          : isAccent
                            ? "bg-[#D71921]/70"
                            : "bg-black/[0.10]"
                      }`}
                    />
                    {token}
                  </motion.span>
                );
              })}
            </div>
          </h2>
          <div className="flex items-center justify-start gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-[#D71921]" />
            <p className="font-mono text-sm text-black/50 tracking-wide">
              Full-Stack Developer from the Philippines · BSIT 4th Year
            </p>
          </div>
        </motion.div>

        {/* Status badge */}
        <motion.div
          variants={fadeUp}
          className="relative flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/70 backdrop-blur px-4 py-1.5 overflow-hidden"
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border border-[#D71921]/40"
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-black/50">
            Open to Opportunities
          </span>
        </motion.div>

        {/* Social links */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              title={s.label}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white/70 backdrop-blur px-4 py-2 text-black/60 hover:text-black hover:border-[#D71921]/25 hover:shadow-[0_8px_24px_rgba(215,25,33,0.08)] transition-colors duration-200"
            >
              {s.icon}
              <span className="font-mono text-[11px] tracking-[0.15em] uppercase">
                {s.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mt-0">
          <motion.a
            href="#overview"
            whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(215,25,33,0.20)" }}
            transition={{ duration: 0.2 }}
            className="rounded-xl bg-black text-white px-6 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-[#D71921] transition-colors duration-300"
          >
            View Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-black/[0.08] bg-white/70 backdrop-blur px-6 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-black/60 hover:text-black hover:border-[#D71921]/30 transition-colors duration-200"
          >
            Contact
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — dot-matrix down arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/30">
          Scroll
        </span>

        {/* Dot-matrix downward arrow — each dot blinks in a wave traveling from top to tip */}
        <div
          aria-hidden="true"
          className="relative"
          style={{
            width:  4 * ARROW_STEP + ARROW_DOT,
            height: 6 * ARROW_STEP + ARROW_DOT,
          }}
        >
          {arrowDots.map(([col, row], i) => (
            <motion.span
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="absolute rounded-full bg-[#D71921]"
              style={{
                // shift col so that col=0 lands at center of the container
                left: (col + 2) * ARROW_STEP,
                top:  row * ARROW_STEP,
                width:  ARROW_DOT,
                height: ARROW_DOT,
                boxShadow: "0 0 6px rgba(215,25,33,0.5)",
              }}
              animate={{
                // glyph-matrix style: random-feeling multi-step flicker
                opacity: [0.06, 0.85, 0.06, 0.4, 0.9, 0.06],
                scale:   [0.8,  1.1,  0.8,  1.0, 1.1, 0.8],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                // wave travels top → tip, with a small per-index offset for the flicker feel
                delay: row * 0.13 + i * 0.05,
                ease: "easeInOut",
                times: [0, 0.18, 0.42, 0.55, 0.78, 1],
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
