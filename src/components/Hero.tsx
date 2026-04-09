import { useEffect, useState } from "react";
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
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/keith-einlou-pogoy-b5b7b939a/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:keinlou115@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 shrink-0">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const stagger = {
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } },
  hidden: {},
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

// Dot-matrix downward arrow shape
const ARROW_STEP = 14;
const ARROW_DOT = 5;
const arrowDots: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3],
  [-2, 4], [-1, 5],
  [2, 4], [1, 5],
  [0, 6],
];

export default function Hero({ imageSrc, imageSrc2 }: HeroProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setFlipped((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden md:flex-row md:gap-16 md:items-center px-6 md:px-12"
    >
      {/* "KEITH" watermark — big handwritten */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-[48%] -translate-y-1/2 select-none pointer-events-none leading-none whitespace-nowrap"
        style={{
          fontFamily: "Caveat, cursive",
          fontWeight: 700,
          fontSize: "28vw",
          letterSpacing: "0.06em",
          color: "#2c2b27",
        }}
      >
        KEITH
      </motion.div>

      {/* ── SVG filter for rough paper edge ───────────────────────────────── */}
      <svg style={{ display: "none", position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="rough-edge" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.032" numOctaves="4" result="noise" seed="7" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── Photo ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex-shrink-0"
        style={{ transform: "rotate(-1.8deg)" }}
      >
        {/* Rough border overlay — filtered separately so 3D flip is unaffected */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 z-10"
          style={{
            borderRadius: "62% 38% 54% 46% / 46% 52% 48% 54%",
            border: "2.5px solid #D71921",
            filter: "url(#rough-edge)",
            boxShadow: "0 0 0 1px rgba(215,25,33,0.12), 4px 6px 0 rgba(215,25,33,0.14)",
          }}
        />
        {/* Paper depth shadow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute z-0"
          style={{
            inset: "-2px",
            borderRadius: "62% 38% 54% 46% / 46% 52% 48% 54%",
            background: "rgba(215,25,33,0.07)",
            transform: "translate(6px, 8px)",
            filter: "url(#rough-edge)",
          }}
        />
        {/* Image clip container */}
        <div
          className="relative w-52 h-52 md:w-68 md:h-68 lg:w-88 lg:h-88 overflow-hidden"
          style={{
            borderRadius: "62% 38% 54% 46% / 46% 52% 48% 54%",
            perspective: 800,
            boxShadow: "0 20px 60px rgba(215,25,33,0.18), 0 8px 24px rgba(120,20,20,0.12)",
            width: "clamp(200px, 22vw, 350px)",
            height: "clamp(200px, 22vw, 350px)",
          }}
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
        </div>

        {/* Decorative doodles around photo */}
        <span aria-hidden className="absolute -top-10 -right-6 text-3xl text-[#D71921] opacity-50 pointer-events-none select-none" style={{ transform: "rotate(15deg)" }}>★</span>
        <span aria-hidden className="absolute -bottom-8 -right-10 text-xl text-[#B91C1C] opacity-40 pointer-events-none select-none" style={{ transform: "rotate(-20deg)" }}>✦</span>
        <span aria-hidden className="absolute -bottom-4 -left-10 text-2xl text-[#D71921] opacity-35 pointer-events-none select-none" style={{ transform: "rotate(10deg)" }}>♡</span>
      </motion.div>

      {/* ── Text content ──────────────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-8 flex w-full flex-col items-start gap-5 md:mt-0 md:max-w-[480px]"
      >
        {/* Name + squiggle underline */}
        <motion.div variants={fadeUp} className="relative">
          {/* Small star cluster */}
          <span aria-hidden className="absolute -top-7 -left-3 text-2xl text-[#D71921] opacity-55 pointer-events-none select-none">★</span>
          <span aria-hidden className="absolute -top-3 -left-9 text-sm text-[#B91C1C] opacity-40 pointer-events-none select-none">✦</span>

          <h2
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
            className="text-5xl md:text-6xl lg:text-7xl text-[#2c2b27] leading-tight"
          >
            Hi! I'm{" "}
            <span className="text-[#D71921]">Keith</span>.
          </h2>

          {/* Squiggle underline */}
          <svg viewBox="0 0 240 12" className="mt-1 h-3" style={{ width: "min(240px, 70%)" }} fill="none" aria-hidden>
            <path
              d="M4 6 C 25 1, 45 11, 65 6 S 105 1, 125 6 S 165 11, 185 6 S 218 1, 236 6"
              stroke="#D71921"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.65"
            />
          </svg>
        </motion.div>

        {/* Role lines */}
        <motion.div variants={fadeUp}>
          <p
            style={{ fontFamily: "Caveat, cursive" }}
            className="text-2xl md:text-3xl text-[#2c2b27]/80"
          >
            Full-Stack Developer ✦ Philippines
          </p>
          <p
            style={{ fontFamily: "Caveat, cursive" }}
            className="text-xl text-[#2c2b27]/50 mt-0.5"
          >
            BSIT 4th Year · BukSU
          </p>
        </motion.div>

        {/* Status — sticky note */}
        <motion.div variants={fadeUp}>
          <div
            className="flex items-center gap-2.5 px-5 py-3"
            style={{
              fontFamily: "Caveat, cursive",
              background: "#FFF9A0",
              border: "1.5px solid #e6d200",
              borderRadius: "3px 10px 10px 3px",
              boxShadow: "3px 3px 0 rgba(44,43,39,0.10)",
              transform: "rotate(-0.6deg)",
              display: "inline-flex",
            }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-lg text-[#2c2b27]/80">Open to Opportunities</span>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 text-[#2c2b27]/65 hover:text-[#D71921] transition-colors duration-200"
              style={{
                fontFamily: "Caveat, cursive",
                fontSize: "18px",
                padding: "7px 18px",
                border: "1.5px solid #2c2b27",
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                background: "rgba(255,255,255,0.55)",
                boxShadow: "2px 3px 0 rgba(44,43,39,0.10)",
              }}
            >
              {s.icon}
              {s.label}
            </motion.a>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mt-1">
          <motion.a
            href="#overview"
            whileHover={{ y: -2, boxShadow: "5px 7px 0 rgba(215,25,33,0.22)" }}
            className="text-white transition-all duration-200"
            style={{
              fontFamily: "Caveat, cursive",
              fontSize: "22px",
              padding: "10px 28px",
              background: "#2c2b27",
              border: "2px solid #2c2b27",
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              boxShadow: "4px 5px 0 rgba(44,43,39,0.18)",
            }}
          >
            View Work →
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            className="text-[#2c2b27]/65 hover:text-[#D71921] transition-all duration-200"
            style={{
              fontFamily: "Caveat, cursive",
              fontSize: "22px",
              padding: "10px 28px",
              border: "1.5px solid #2c2b27",
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              background: "rgba(255,255,255,0.5)",
              boxShadow: "2px 3px 0 rgba(44,43,39,0.10)",
            }}
          >
            Contact
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 z-10 flex flex-col items-center gap-2"
      >
        <span
          style={{ fontFamily: "Caveat, cursive" }}
          className="text-lg text-[#2c2b27]/35"
        >
          scroll
        </span>
        <div
          aria-hidden="true"
          className="relative"
          style={{ width: 4 * ARROW_STEP + ARROW_DOT, height: 6 * ARROW_STEP + ARROW_DOT }}
        >
          {arrowDots.map(([col, row], i) => (
            <motion.span
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="absolute rounded-full bg-[#D71921]"
              style={{
                left: (col + 2) * ARROW_STEP,
                top: row * ARROW_STEP,
                width: ARROW_DOT,
                height: ARROW_DOT,
                boxShadow: "0 0 6px rgba(215,25,33,0.45)",
              }}
              animate={{ opacity: [0.06, 0.85, 0.06, 0.4, 0.9, 0.06], scale: [0.8, 1.1, 0.8, 1.0, 1.1, 0.8] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
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
